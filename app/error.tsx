import { Alert, AlertDescription } from '@/components/ui/alert';
import { FaXmark } from 'react-icons/fa6/index.js';
import { AppLogo, Button } from './components';
import { useNavigate } from '@remix-run/react';

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className='mx-5'>
      <div className='mx-auto my-10 w-fit'>
        <AppLogo />
      </div>

      <div className='mx-auto flex h-[70vh] max-w-sm flex-col justify-center px-5'>
        <Alert variant='destructive'>
          <FaXmark className='h-4 w-4' />
          <AlertDescription>
            An error occurred while loading the page.
          </AlertDescription>
        </Alert>

        <div className='mt-5 flex justify-center'>
          <Button onClick={() => navigate('/')}>Return to home</Button>
        </div>
      </div>
    </div>
  );
};
