import { signup } from '@/api/user';
import { useStateForm, useToast } from '@/hooks';
import { useNavigate } from '@remix-run/react';
import { useMutation } from '@tanstack/react-query';

type ReactInputEventHandler = React.ChangeEventHandler<HTMLInputElement>;

export const useRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: signup,
    onError: (err: any) => {
      toast({
        description: err.response.data,
        variant: 'destructive',
        duration: 3000,
      });
    },
    onSuccess: () => {
      toast({ description: 'Signup successful.', variant: 'success' });
      navigate('/u/login');
    },
  });
};

export const useRegisterData = () => {
  const [data, update] = useStateForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const setFirstName: ReactInputEventHandler = (e) => {
    update('firstName', e.target.value);
  };

  const setLastName: ReactInputEventHandler = (e) => {
    update('lastName', e.target.value);
  };

  const setEmail: ReactInputEventHandler = (e) => {
    update('email', e.target.value);
  };

  const setPassword: ReactInputEventHandler = (e) => {
    update('password', e.target.value);
  };

  return {
    data,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
  };
};
