/**
 * Defines the landing page for the chess application.
 */
import type { JSX } from 'react';
import { getTranslations } from 'next-intl/server';

export default async function Home(): Promise<JSX.Element> {
  const t = await getTranslations();
  return <div>{t('main.welcome')}</div>;
}
