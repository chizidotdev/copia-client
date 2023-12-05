import { signInWithGoogle } from '@/api/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/use-toast';
import { useAuthLayout } from '@/routes/u';
import { Link, useNavigate } from '@remix-run/react';
import { FcGoogle } from 'react-icons/fc/index.js';

export default function Page() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setEmail, email } = useAuthLayout();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const emailIsValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    if (!emailIsValid) {
      toast({ description: 'Invalid email', variant: 'destructive' });
      return;
    }
    navigate('/u/login/password');
  };

  return (
    <>
      <div className='text-center'>
        <Text variant='h2'>Welcome back</Text>
      </div>

      <form noValidate className='mt-5 flex flex-col gap-4' onSubmit={onSubmit}>
        <Label>Email address</Label>
        <Input
          autoFocus
          type='email'
          placeholder='Email address'
          autoComplete='off'
          onChange={setEmail}
          value={email}
        />

        <div>
          <Button fullWidth type='submit'>
            Sign in with Email
          </Button>
        </div>
      </form>
      <div className='mt-5 text-center'>
        Don't have an account? &nbsp;<Link to='/u/register'>Sign up</Link>
      </div>
      <div className='mt-1 text-center'>
        <Link to='/u/reset-password'>Forgot password?</Link>
      </div>

      <div className='relative my-6'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or</span>
        </div>
      </div>

      <div className='mx-auto w-full'>
        <Button
          fullWidth
          icon={<FcGoogle />}
          variant='outline'
          onClick={() => signInWithGoogle()}
        >
          Continue with Google
        </Button>
      </div>
    </>
  );
}
