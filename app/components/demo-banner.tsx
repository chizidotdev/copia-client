import { Alert, AlertDescription } from '~/components/ui/alert';
import { GrCircleAlert } from 'react-icons/gr/index.js';

export function DemoBanner() {
  return (
    <div className="m-5 mb-0">
      <Alert>
        <GrCircleAlert className="h-4 w-4" />
        <AlertDescription>
          This is a demo dashboard. Add your data to see it in action.
        </AlertDescription>
      </Alert>
    </div>
  );
}
