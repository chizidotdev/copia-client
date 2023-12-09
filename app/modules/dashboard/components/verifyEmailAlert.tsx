import { Alert, AlertDescription, Button } from '@/components';
import { useSendVerificationEmail } from '@/modules/user/useVerifyEmail';
import { useGlobals } from '@/store';
import { GrCircleAlert } from 'react-icons/gr/index.js';

export function VerifyEmailAlert() {
  const { user } = useGlobals();
  const { mutate } = useSendVerificationEmail();

  if (!user || user.emailVerified) return null;

  const handleVerifyEmail = async () => {
    mutate({ email: user.email });
  };

  return (
    <div className='m-5 mb-0'>
      <Alert>
        <GrCircleAlert className='h-4 w-4' />
        <AlertDescription>
          Your email address is not verified. Click&nbsp;
          <Button variant='link' onClick={handleVerifyEmail}>
            here
          </Button>
          &nbsp;to verify your email address.
        </AlertDescription>
      </Alert>
    </div>
  );
}
