import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateQuantity } from '@/modules/product/useEditProduct';
import { DropdownMenuItem } from '@/components';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';

export function UpdateQuantity({ item }: { item: Product }) {
  const navigate = useNavigate();

  return (
    <DropdownMenuItem
      onClick={() => navigate(`/products/${item.id}/update-quantity`)}
    >
      Update Quantity
    </DropdownMenuItem>
  );
}

export const UpdateQuantityForm = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { mutate } = useUpdateQuantity();
  const [newQuantity, setNewQuantity] = useState(0);

  const onClose = () => {
    navigate('..');
  };

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    mutate(
      { data: { newQuantity }, id: product.id },
      { onSuccess: () => onClose() }
    );
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (Number(e.target.value) > 1000000000) return;

    const re = /^-?[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setNewQuantity(Number(e.target.value));
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update Quantity</DialogTitle>
        <DialogDescription>
          Input the quantity of items added or removed from {product.name}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={onSubmit}>
        <div className='grid items-center gap-2 py-4 sm:grid-cols-4 sm:gap-4'>
          <Label htmlFor='quantity' className='sm:text-right'>
            Quantity
          </Label>
          <Input
            autoFocus
            id='quantity'
            className='col-span-3'
            type='number'
            inputMode='numeric'
            value={newQuantity}
            onChange={onChange}
          />
        </div>
        <DialogFooter>
          <Button type='submit'>Update</Button>
        </DialogFooter>
      </form>
    </>
  );
};
