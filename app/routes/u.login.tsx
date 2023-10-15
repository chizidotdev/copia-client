import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { signIn } from '~/api/user';
import { FcGoogle } from 'react-icons/fc/index.js';
import { Input } from '~/components/ui/input';
import { Link, useNavigate } from '@remix-run/react';
import { Label } from '~/components/ui/label';
import { useAuthLayout } from '~/routes/u';

export default function Page() {
  const navigate = useNavigate();
  const { setEmail, email } = useAuthLayout();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate('/u/login/password');
  };

  return (
    <>
      <div className="text-center">
        <Text variant="h2">Welcome back</Text>
      </div>

      <form className="flex flex-col gap-4 mt-5" onSubmit={onSubmit}>
        <Label>Email address</Label>
        <Input
          autoFocus
          type="email"
          placeholder="Email address"
          autoComplete="off"
          onChange={setEmail}
          value={email}
        />

        <div>
          <Button fullWidth type="submit">
            Sign in with Email
          </Button>
        </div>
      </form>
      <div className="text-center mt-5">
        Don't have an account? &nbsp;<Link to="/u/register">Sign up</Link>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <div className="mx-auto w-full">
        <Button fullWidth icon={<FcGoogle />} variant="outline" onClick={() => signIn('google')}>
          Continue with Google
        </Button>
      </div>
    </>
  );
}
