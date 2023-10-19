// Inspired by react-hot-toaster library
import * as React from 'react';

import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

const TOASTER_LIMIT = 1;
const TOASTER_REMOVE_DELAY = 1000000;

type ToastererToaster = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOASTER: 'ADD_TOASTER',
  UPDATE_TOASTER: 'UPDATE_TOASTER',
  DISMISS_TOASTER: 'DISMISS_TOASTER',
  REMOVE_TOASTER: 'REMOVE_TOASTER',
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType['ADD_TOASTER'];
      toaster: ToastererToaster;
    }
  | {
      type: ActionType['UPDATE_TOASTER'];
      toaster: Partial<ToastererToaster>;
    }
  | {
      type: ActionType['DISMISS_TOASTER'];
      toasterId?: ToastererToaster['id'];
    }
  | {
      type: ActionType['REMOVE_TOASTER'];
      toasterId?: ToastererToaster['id'];
    };

interface State {
  toasters: ToastererToaster[];
}

const toasterTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toasterId: string) => {
  if (toasterTimeouts.has(toasterId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toasterTimeouts.delete(toasterId);
    dispatch({
      type: 'REMOVE_TOASTER',
      toasterId: toasterId,
    });
  }, TOASTER_REMOVE_DELAY);

  toasterTimeouts.set(toasterId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOASTER':
      return {
        ...state,
        toasters: [action.toaster, ...state.toasters].slice(0, TOASTER_LIMIT),
      };

    case 'UPDATE_TOASTER':
      return {
        ...state,
        toasters: state.toasters.map((t) =>
          t.id === action.toaster.id ? { ...t, ...action.toaster } : t
        ),
      };

    case 'DISMISS_TOASTER': {
      const { toasterId } = action;

      // ! Side effects ! - This could be extracted into a dismissToaster() action,
      // but I'll keep it here for simplicity
      !toasterId
        ? state.toasters.forEach((toaster) => {
            addToRemoveQueue(toaster.id);
          })
        : addToRemoveQueue(toasterId);

      return {
        ...state,
        toasters: state.toasters.map((t) =>
          t.id === toasterId || toasterId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case 'REMOVE_TOASTER':
      if (action.toasterId === undefined) {
        return {
          ...state,
          toasters: [],
        };
      }
      return {
        ...state,
        toasters: state.toasters.filter((t) => t.id !== action.toasterId),
      };
  }
};

const listeners = new Set<(state: State) => void>();

let memoryState: State = { toasters: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toaster = Omit<ToastererToaster, 'id'>;

function toaster({ duration = 3000, ...props }: Toaster) {
  const id = genId();

  const update = (props: ToastererToaster) =>
    dispatch({
      type: 'UPDATE_TOASTER',
      toaster: { ...props, duration, id },
    });
  const dismiss = () => dispatch({ type: 'DISMISS_TOASTER', toasterId: id });

  dispatch({
    type: 'ADD_TOASTER',
    toaster: {
      ...props,
      duration,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToaster() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    ...state,
    toaster,
    dismiss: (toasterId?: string) =>
      dispatch({ type: 'DISMISS_TOASTER', toasterId }),
  };
}

export { toaster, useToaster };
