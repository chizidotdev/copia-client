import { Alert, AlertDescription } from '@/components';
import { Button } from '@/components/ui/button';
import { useVerifyEmail } from '@/modules/user/useVerifyEmail';
import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6/index.js';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  return json({ code });
}

export default function Page() {
  const { code } = useLoaderData<typeof loader>();
  const { mutate, isError, isSuccess } = useVerifyEmail();

  useEffect(() => {
    if (code) mutate({ code });
  }, [code, mutate]);

  let body = <VerifyEmailLoading />;

  if (!code) {
    body = <InvalidLinkError />;
  }

  if (isError) {
    body = <VerifyEmailError />;
  }

  if (isSuccess) {
    body = <VerifyEmailSuccess />;
  }

  return (
    <>
      {body}

      <div className='mt-5 flex justify-center'>
        <Button onClick={() => (window.location.href = '/')}>
          Return to home
        </Button>
      </div>
    </>
  );
}

const VerifyEmailLoading = () => {
  return (
    <Alert>
      <AlertDescription>
        Please wait while we verify your email address.
      </AlertDescription>
    </Alert>
  );
};

const VerifyEmailError = () => {
  return (
    <Alert variant='destructive'>
      <FaXmark className='h-4 w-4' />
      <AlertDescription>
        There was an error verifying your email address, please try again. If
        the problem persists, please contact support.
      </AlertDescription>
    </Alert>
  );
};

const VerifyEmailSuccess = () => {
  return (
    <Alert variant='success'>
      <FaCheck className='h-4 w-4' />
      <AlertDescription>Your email address has been verified.</AlertDescription>
    </Alert>
  );
};

const InvalidLinkError = () => {
  return (
    <Alert variant='destructive'>
      <FaXmark className='h-4 w-4' />
      <AlertDescription>This link is invalid or has expired.</AlertDescription>
    </Alert>
  );
};
