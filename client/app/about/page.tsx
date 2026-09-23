/**
 * Defines the informational About page for the chess application.
 */
import type { JSX } from 'react';
import { getTranslations } from 'next-intl/server';

export default async function AboutPage(): Promise<JSX.Element> {
  const t = await getTranslations();
  return <div>{t('about.title')}</div>;
}
