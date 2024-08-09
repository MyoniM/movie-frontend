'use client';

import './globals.css';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';

import { Provider } from 'react-redux';

import { store } from '@/state/store';
import { fetchUser } from '@/utils/auth';

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>Movies</title>
        </head>
        
        <body className={inter.className}>
          <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
          </Provider>
        </body>
      </html>
    </>
  );
}
