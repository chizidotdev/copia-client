import { DashboardPage } from '~/modules/dashboard';
import type { MetaFunction } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { requireUserSession } from '~/session';

export const meta: MetaFunction = () => {
  return [{ title: 'Dashboard - Copia' }, { name: 'description', content: 'Copia user dashboard' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await requireUserSession(request);
}

export default function Page() {
  return <DashboardPage />;
}
