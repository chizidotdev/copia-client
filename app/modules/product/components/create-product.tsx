import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateProduct } from '@/modules/product/useCreateProduct';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

const formFields = [
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  { label: 'Price', name: 'price' },
  { label: 'Quantity', name: 'quantityInStock' },
] as const;

export function CreateProduct() {
  const [open, setOpen] = useState(false);
  const { mutate } = useCreateProduct();
  const { register, handleSubmit, reset } = useForm<CreateProductRequest>();

  const onSubmit: SubmitHandler<CreateProductRequest> = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('quantityInStock', data.quantityInStock.toString());
    !!data.image.length && formData.append('image', data.image[0]);

    mutate(
      { data: formData },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add a new product to your inventory.
          </DialogDescription>
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
            <div className='grid items-center gap-2 sm:grid-cols-4 sm:gap-4'>
              <Label htmlFor='image' className='sm:text-right'>
                Image
              </Label>
              <Input
                id='image'
                type='file'
                className='col-span-3'
                {...register('image')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
