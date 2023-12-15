import { DemoBanner } from '@/components/demo-banner';
import { MainNav, Search, UserNav } from '@/modules/dashboard/components';
import { VerifyEmailAlert } from '@/modules/dashboard/components/verifyEmailAlert';
import { Outlet } from '@remix-run/react';

import { requireUserSession } from '@/session';
import type { LoaderFunctionArgs } from '@remix-run/router';

export async function loader({ request }: LoaderFunctionArgs) {
  return await requireUserSession(request);
}

export default function Page() {
  return (
    <div className='flex flex-col'>
      <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
          <MainNav className='ml-3 mr-6' />
          <div className='ml-auto flex items-center space-x-4'>
            <Search />
            <UserNav />
          </div>
        </div>
      </div>

      <VerifyEmailAlert />
      <DemoBanner />

      <div className='p-5 pt-6'>
        <Outlet />
      </div>
    </div>
  );
}
