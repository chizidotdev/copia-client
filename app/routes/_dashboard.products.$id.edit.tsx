import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useGetProduct } from '@/modules/product/useGetProducts';
import { Alert } from '@/components';
import { EditProductForm } from '@/modules/product/components/edit-product';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id });
};

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useLoaderData<typeof loader>();
  const productId = id ?? '';
  const { data, isError, error } = useGetProduct(productId);

  let body = <>Please wait...</>;

  if (isError) {
    const errorMsg = `Error fetching product. ${(error as any)?.response?.data
      ?.message}`;

    body = (
      <>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit product details</DialogDescription>
        </DialogHeader>

        <Alert variant='destructive'>{errorMsg}</Alert>
      </>
    );
  }

  if (data) {
    body = <EditProductForm product={data.data} />;
  }

  return (
    <Dialog open onOpenChange={() => navigate('..')}>
      <DialogContent className='sm:max-w-[425px]'>{body}</DialogContent>
    </Dialog>
  );
}
