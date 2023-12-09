import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/use-toast';
import { useChangePassword } from '@/modules/user/useResetPassword';
import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    // If there is no code, we can't reset the password
    // so we redirect to the reset password page
    throw redirect('/u/reset-password');
  }

  return json({ code });
}

export default function Page() {
  const { code } = useLoaderData<typeof loader>();
  const { toast } = useToast();
  const { data, setPassword, setConfirmPassword } = useChangePasswordData();
  const { mutate, isPending } = useChangePassword();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const passwordsMatch = data.password === data.confirmPassword;
    if (!passwordsMatch) {
      toast({ description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    mutate({ password: data.password, code });
  };

  return (
    <>
      <div className='text-center'>
        <Text variant='h2'>Set a new password</Text>
        <Text variant='p' className='text-sm text-gray-500'>
          Enter your new password for your account.
        </Text>
      </div>

      <form noValidate className='mt-5 flex flex-col gap-4' onSubmit={onSubmit}>
        <Label>Password</Label>
        <Input
          autoFocus
          type='password'
          placeholder='Password'
          autoComplete='off'
          value={data.password}
          onChange={setPassword}
        />

        <Label>Confirm Password</Label>
        <Input
          autoFocus
          type='password'
          placeholder='Confirm Password'
          autoComplete='off'
          value={data.confirmPassword}
          onChange={setConfirmPassword}
        />

        <div>
          <Button fullWidth type='submit' disabled={isPending}>
            Change Password
          </Button>
        </div>
      </form>
      <div className='mt-5 text-center'>
        <Link to='/u/login'>Return to login</Link>
      </div>
    </>
  );
}

export const useChangePasswordData = () => {
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  });

  const setPassword = (e: any) => {
    setData((data) => ({ ...data, password: e.target.value }));
  };

  const setConfirmPassword = (e: any) => {
    setData((data) => ({ ...data, confirmPassword: e.target.value }));
  };

  return { data, setPassword, setConfirmPassword };
};
