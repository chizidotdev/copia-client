import { getError } from '@/api';
import { signup } from '@/api/user';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from '@remix-run/react';
import { useMutation } from '@tanstack/react-query';
import { type ChangeEventHandler, useState } from 'react';

export const useRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: signup,
    onError: (err: any) => {
      const error = getError(err);
      toast({
        description: error.message,
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
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const setFirstName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({ ...data, firstName: e.target.value }));
  };

  const setLastName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({ ...data, lastName: e.target.value }));
  };

  const setEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({ ...data, email: e.target.value }));
  };

  const setPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData((data) => ({ ...data, password: e.target.value }));
  };

  return {
    data,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
  };
};
