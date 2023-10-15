import { cn } from '~/lib/utils';
import { Link } from '@remix-run/react';
import { AppLogo } from '~/components/app-logo';

export function MainNav({ className }: { className?: string }) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      <AppLogo />
      <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
        Overview
      </Link>
      <Link
        to="/dashboard"
        className="hidden sm:block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        to="/dashboard"
        className="hidden sm:block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        to="/dashboard"
        className="hidden sm:block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
