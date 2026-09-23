/**
 * Defines the root application layout, shared navigation, and page shell.
 */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Nav from '@/components/Nav';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Chess App',
  description: 'Play chess with AI opponent',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactNode> {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-screen">
      <body className="h-full p-2">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header>
            <Nav />
          </header>
          <main>
            <div className="flex flex-col items-center justify-center h-full pt-4">
              {children}
            </div>
          </main>
          <footer></footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
