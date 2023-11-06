import * as React from 'react';

export function useStateForm<State extends Record<string, unknown>>(
  initialState: State
) {
  const [state, setState] = React.useState(() => initialState);

  const update = React.useCallback(
    <K extends keyof State>(name: K, value: State[K]) => {
      setState((fields) => ({ ...fields, [name]: value }));
    },
    []
  );

  return [state, update] as const;
}
