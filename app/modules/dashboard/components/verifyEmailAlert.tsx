import { Alert, AlertDescription, Button } from '@/components';
import { useSendVerificationEmail } from '@/modules/user/useVerifyEmail';
import { useGlobals } from '@/store';
import { useEffect, useState } from 'react';
import { GrCircleAlert } from 'react-icons/gr/index.js';

// TODO: Countdown to resend email persisting across page refreshes
// Might need to use localStorage for this or SSE

export function VerifyEmailAlert() {
  const { user } = useGlobals();
  const { mutate, isSuccess } = useSendVerificationEmail();
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (isSuccess) setEmailSent(true);
  }, [isSuccess]);

  if (!user || user.emailVerified) return null;

  const handleVerifyEmail = async () => {
    mutate({ email: user.email });
  };

  const body = (
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
  );

  return (
    <div className='m-5 mb-0'>
      {emailSent ? (
        <Alert variant='success'>
          <AlertDescription>
            Verification email sent. Please check your inbox.
          </AlertDescription>
        </Alert>
      ) : (
        body
      )}
    </div>
  );
}
