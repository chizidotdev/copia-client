import { getError } from '@/api';
import { sendVerificationEmail, verifyEmail } from '@/api/user';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useSendVerificationEmail = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: sendVerificationEmail,
    onError: (err: any) => {
      const error = getError(err);
      toast({
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
    },
    onSuccess: (data) => {
      toast({ description: data.message, variant: 'success' });
    },
  });
};

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
    onSuccess: (data) => {
      toast({ description: data.message, variant: 'success' });
    },
  });
};
