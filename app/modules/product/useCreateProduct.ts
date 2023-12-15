import { getError } from '@/api';
import { createProduct } from '@/api/product';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

export const useCreateProduct = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: createProduct,
    onError: (err: any) => {
      const error = getError(err);
      toast({
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        description: 'Product added successfully',
        duration: 3000,
      });
    },
  });
};
