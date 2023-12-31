import { Toaster } from '@/components/ui/toaster';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { useDehydratedState } from 'use-dehydrated-state';
import styles from './globals.css';
import { interceptors } from './api/interceptors';
import { Error } from './error';
import { GlobalContextProvider } from './store/GlobalContext';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'use-credentials',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap',
  },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  interceptors();

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='shortcut icon' href='/logo.svg' type='image/x-icon' />
        <Meta />
        <Links />
      </head>
      <body>
        <Providers>
          <Outlet />
        </Providers>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <link rel='shortcut icon' href='/logo.svg' type='image/x-icon' />
        <Meta />
        <Links />
      </head>
      <body>
        <Error />
        <Scripts />
      </body>
    </html>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );
  const dehydratedState = useDehydratedState();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
