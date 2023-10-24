import { DashboardPage } from '@/modules/dashboard';
import { requireUserSession } from '@/session';
import type { MetaFunction } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/order';

export const meta: MetaFunction = () => {
  return [
    { title: 'Dashboard - Copia' },
    { name: 'description', content: 'Copia user dashboard' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await requireUserSession(request);
}

export default function Page() {
  const { data } = useQuery({ queryKey: ['orders'], queryFn: getOrders });
  console.log(data)

  return <DashboardPage />;
}
