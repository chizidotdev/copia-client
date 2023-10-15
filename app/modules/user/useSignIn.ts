import { useNavigate } from '@remix-run/react';
import { useToast } from '~/components/ui/use-toast';
import { useMutation } from 'react-query';
import { signIn } from '~/api/user';

export const useSignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: signIn,
    onError: (err: any) => {
      toast({ description: err.response.data, variant: 'destructive', duration: 3000 });
    },
    onSuccess: () => {
      toast({ description: 'Login successful.', variant: 'success' });
      navigate('/dashboard');
    },
  });
};
