/**
 * Defines the root application layout, shared navigation, and page shell.
 */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { getTheme } from '@/themes/actions';
import Nav from '@/components/Nav';
import { StartGameProvider } from '@/components/startGame/StartGameContext';
import { ScrollArea } from '@/components/ui/ScrollArea';
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
  const theme = await getTheme();

  return (
    <html lang={locale} data-theme={theme} className="h-screen">
      <body className="h-screen flex flex-col p-2 overflow-hidden">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StartGameProvider>
            <header>
              <Nav />
            </header>
            <ScrollArea className="flex-1 min-h-0">
              <main className="flex-1 flex flex-col items-center justify-center pt-4">
                {children}
              </main>
            </ScrollArea>
            <footer></footer>
          </StartGameProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
