import { Alert, AlertDescription } from '~/components/ui/alert';
import { useToast } from '~/components/ui/use-toast';
import { useEffect } from 'react';
import { FiCheck } from 'react-icons/fi/index.js';

export default function Page() {
  const { toast } = useToast();

  useEffect(() => {
    toast({ description: 'Login successful!' });
    setTimeout(() => {
      window.close();
    }, 3000);
  }, [toast]);

  return (
    <Alert>
      <FiCheck className="h-4 w-4" />
      <AlertDescription>
        You have successfully logged in. You'll be redirected to the dashboard in a few seconds.
      </AlertDescription>
    </Alert>
  );
}
