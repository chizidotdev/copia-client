import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/use-toast';
import { useResetPassword } from '@/modules/user/useResetPassword';
import { Link } from '@remix-run/react';
import { useState } from 'react';

export default function Page() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const { mutate, isPending } = useResetPassword();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const emailIsValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    if (!emailIsValid) {
      toast({ description: 'Invalid email', variant: 'destructive' });
      return;
    }
    mutate({ email });
  };

  return (
    <>
      <div className='text-center'>
        <Text variant='h2'>Forgot password?</Text>
        <Text variant='p' className='text-sm text-gray-500'>
          All good. Enter your account's email address and we'll send you a link
          to reset your password.
        </Text>
      </div>

      <form noValidate className='mt-5 flex flex-col gap-4' onSubmit={onSubmit}>
        <Label>Email address</Label>
        <Input
          autoFocus
          type='email'
          placeholder='Email address'
          autoComplete='off'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div>
          <Button fullWidth type='submit' disabled={isPending}>
            Send reset link
          </Button>
        </div>
      </form>
      <div className='mt-5 text-center'>
        <Link to='/u/login'>Return to login</Link>
      </div>
    </>
  );
}
