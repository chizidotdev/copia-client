import { Link } from '@remix-run/react';

export function AppLogo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="copia Logo" width={40} />
    </Link>
  );
}
