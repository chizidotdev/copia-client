import { getError } from '@/api';
import { verifyEmail } from '@/api/user';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useVerifyEmail = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: verifyEmail,
    onError: (err: any) => {
      const error = getError(err);
      toast({
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
    },
    onSuccess: () => {
      toast({ description: 'Email verified!', variant: 'success' });
    },
  });
};
