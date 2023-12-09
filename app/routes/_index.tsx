import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Copia' },
    { name: 'description', content: 'Welcome to Copia!' },
  ];
};

export default function Index() {
  return (
    <div style={{ lineHeight: '1.8' }}>
      <h1>Welcome to Copia</h1>
      <ul>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}
