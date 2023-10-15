import { DashboardPage } from '~/modules/dashboard';
import type { MetaFunction } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { requireUserSession } from '~/session';
import { getUser } from '~/api/user';
import { useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [{ title: 'Dashboard - Copia' }, { name: 'description', content: 'Copia user dashboard' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await requireUserSession(request);
}

export default function Page() {
  // useEffect(() => {
  //   (async () => {
  //     const user = await getUser();
  //     console.log(user)
  //   })()
  // }, []);
  return <DashboardPage />;
}
