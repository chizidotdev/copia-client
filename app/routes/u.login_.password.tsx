import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { signIn } from '~/api/user';
import { Input } from '~/components/ui/input';
import { Link, useNavigate } from '@remix-run/react';
import { Label } from '~/components/ui/label';
import { useAuthLayout } from '~/routes/u';
import { useLayoutEffect } from 'react';
import { useToast } from '~/components/ui/use-toast';

export default function Page() {
  const { email, password, setPassword } = useAuthLayout();
  const navigate = useNavigate();
  const { toast } = useToast();

  useLayoutEffect(() => {
    if (!email) navigate('/u/login');
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await signIn('email', { email, password });
    if (response?.status === 200) {
      toast({
        description: 'Login successful.',
      });
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className="text-center">
        <Text variant="h2">Enter your password</Text>
      </div>

      <form className="flex flex-col gap-4 mt-5" onSubmit={onSubmit}>
        <Label>Email address</Label>
        <div className="relative">
          <Input
            type="email"
            placeholder="Email address"
            autoComplete="off"
            value={email}
            readOnly
          />
          <div className="absolute top-0 bottom-0 right-3 flex items-center text-sm">
            <Link to="/u/login">EDIT</Link>
          </div>
        </div>

        <Label>Password</Label>
        <Input
          autoFocus
          type="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={setPassword}
        />
        <div>
          <Button fullWidth type="submit">
            Continue
          </Button>
        </div>
      </form>
      <div className="text-center mt-5">
        Don't have an account? &nbsp;<Link to="/auth/register">Sign up</Link>
      </div>
    </>
  );
}
