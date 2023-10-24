import { signInWithGoogle } from '@/api/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/use-toast';
import { Link } from '@remix-run/react';
import { FcGoogle } from 'react-icons/fc/index.js';
import { useRegister, useRegisterData } from '@/modules/user/useRegister';

export default function Page() {
  const { data, setFirstName, setLastName, setPassword, setEmail } =
    useRegisterData();
  const { mutate, isPending } = useRegister();
  const { toast } = useToast();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const emailIsValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email);
    if (!emailIsValid) {
      toast({ description: 'Invalid email', duration: 1000 });
      return;
    }
    mutate(data);
  };

  return (
    <>
      <div className='text-center'>
        <Text variant='h2'>Create an account</Text>
      </div>

      <form className='mt-5 flex flex-col gap-4' onSubmit={onSubmit}>
        <Label>First Name</Label>
        <Input
          autoFocus
          placeholder='First Name'
          autoComplete='off'
          onChange={setFirstName}
          value={data.firstName}
        />

        <Label>Last Name</Label>
        <Input
          placeholder='Last Name'
          autoComplete='off'
          onChange={setLastName}
          value={data.lastName}
        />

        <Label>Email address</Label>
        <Input
          type='email'
          placeholder='Email address'
          autoComplete='off'
          onChange={setEmail}
          value={data.email}
        />

        <Label>Password</Label>
        <Input
          type='password'
          placeholder='Password'
          autoComplete='off'
          value={data.password}
          onChange={setPassword}
        />
        <div>
          <Button fullWidth type='submit' disabled={isPending}>
            Continue
          </Button>
        </div>
      </form>
      <div className='mt-5 text-center'>
        Already have an account? &nbsp;<Link to='/u/login'>Login</Link>
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
