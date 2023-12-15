import { AppLogo } from '@/components/app-logo';
import { cn } from '@/lib/utils';
import { Link } from '@remix-run/react';

export function MainNav({ className }: { className?: string }) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      <AppLogo />
      <Link
        to='/dashboard'
        className='text-sm font-medium transition-colors hover:text-primary'
      >
        Overview
      </Link>
      <Link
        to='/dashboard'
        className='hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block'
      >
        Customers
      </Link>
      <Link
        to='/products'
        className='hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block'
      >
        Products
      </Link>
      <Link
        to='/dashboard'
        className='hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block'
      >
        Settings
      </Link>
    </nav>
  );
}
