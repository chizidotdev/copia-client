import { getError } from '@/api';
import { editProduct, updateQuantity } from '@/api/product';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: editProduct,
    onError: (err: any) => {
      const error = getError(err);
      toast({
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      toast({
        variant: 'success',
        description: 'Product updated successfully',
        duration: 3000,
      });
    },
  });
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateQuantity,
    onError: (err: any) => {
      const error = getError(err);
      toast({
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      toast({
        variant: 'success',
        description: 'Product Quantity updated successfully',
        duration: 3000,
      });
    },
  });
};
