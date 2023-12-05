import { changePassword, resetPassword } from '@/api/user';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from '@remix-run/react';
import { useMutation } from '@tanstack/react-query';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: resetPassword,
    onError: (err: any) => {
      toast({
        description: err.response.data,
        variant: 'destructive',
        duration: 3000,
      });
    },
    onSuccess: () => {
      toast({ description: 'Reset password email sent.', variant: 'success' });
      navigate('/dashboard');
    },
  });
};

export const useChangePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: changePassword,
    onError: (err: any) => {
      toast({
        description: err.response.data,
        variant: 'destructive',
        duration: 3000,
      });
    },
    onSuccess: () => {
      toast({ description: 'Password changed successfully.', variant: 'success' });
      navigate('/dashboard');
    },
  });
};
