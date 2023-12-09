import { getError } from '@/api';
import { signIn } from '@/api/user';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useSignIn = () => {
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
      window.location.href = '/dashboard';
    },
  });
};
