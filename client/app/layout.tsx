/**
 * Defines the root application layout, shared navigation, and page shell.
 */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SettingsButton from '@/components/SettingsButton';
import MenuButton from '@/components/MenuButton';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Chess App',
  description: 'Play chess with AI opponent',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <html lang="en" className="h-screen">
      <body className="h-full p-2">
        <header>
          <nav
            aria-label="{'Basic navigation'}"
            className="flex justify-between"
          >
            <MenuButton
              aria-label="{'Open menu'}"
              aria-expanded={false}
              aria-controls="main-menu"
            ></MenuButton>

            <span>{'Chess'}</span>

            <SettingsButton
              aria-label="{'Settings'}"
              aria-expanded={false}
              aria-controls="settings"
            ></SettingsButton>
          </nav>
        </header>
        <main>
          <div className="flex flex-col items-center justify-center h-full pt-4">
            {children}
          </div>
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
