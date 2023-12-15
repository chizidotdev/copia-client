import { AppLogo } from '@/components/app-logo';
import { cn } from '@/lib/utils';
import { NavLink } from '@remix-run/react';

export function MainNav({ className }: { className?: string }) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      <AppLogo />

      {links.map(({ href, label }) => (
        <NavLink
          key={`${href}${label}`}
          to={href}
          className={({ isActive }) =>
            cn(
              'text-sm font-medium transition-colors hover:text-primary',
              !isActive && 'text-muted-foreground'
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/products', label: 'Products' },
  // { href: '/dashboard', label: 'Customers' },
  // { href: '/dashboard', label: 'Settings' },
];
