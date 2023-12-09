import { getError } from '@/api';
import { signIn } from '@/api/user';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from '@remix-run/react';
import { useMutation } from '@tanstack/react-query';

export const useSignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: signIn,
    onError: (err: any) => {
      const error = getError(err);
      toast({
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
    },
    onSuccess: () => {
      toast({ description: 'Login successful.', variant: 'success' });
      navigate('/dashboard');
    },
  });
};
