import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6/index.js';

export default function Page() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 3000);
  }, []);

  return (
    <Alert variant='destructive'>
      <FaXmark className='h-4 w-4' />
      <AlertDescription>
        There was an error logging in with Google. Please try again.
      </AlertDescription>
    </Alert>
  );
}
