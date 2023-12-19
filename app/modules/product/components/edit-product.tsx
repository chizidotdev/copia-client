import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useEditProduct } from '@/modules/product/useEditProduct';
import { DropdownMenuItem } from '@/components';
import { useNavigate } from '@remix-run/react';

export function EditProduct({ item }: { item: Product }) {
  const navigate = useNavigate();

  return (
    <DropdownMenuItem onClick={() => navigate(`/products/${item.id}`)}>
      Edit
    </DropdownMenuItem>
  );
}

export const EditProductForm = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { mutate } = useEditProduct();
  const { register, handleSubmit } = useForm<CreateProductRequest>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      quantityInStock: product.quantityInStock,
    },
  });

  const onClose = () => {
    navigate('..');
  };

  const onSubmit: SubmitHandler<CreateProductRequest> = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('quantityInStock', data.quantityInStock.toString());

    mutate({ data: formData, id: product.id }, { onSuccess: () => onClose() });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogDescription>Edit {product.name}</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4 py-4'>
          {formFields.map(({ name, label }) => (
            <div
              key={name}
              className='grid items-center gap-2 sm:grid-cols-4 sm:gap-4'
            >
              <Label htmlFor={name} className='sm:text-right'>
                {label}
              </Label>
              <Input id={name} className='col-span-3' {...register(name)} />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </form>
    </>
  );
};

const formFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  { label: 'Price', name: 'price' },
  { label: 'Quantity', name: 'quantityInStock' },
] as const;
