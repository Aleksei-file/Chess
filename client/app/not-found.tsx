/**
 * 404 page
 */
import type { JSX } from 'react';
import { getTranslations } from 'next-intl/server';

export default async function NotFoundPage(): Promise<JSX.Element> {
  const t = await getTranslations();
  return <div>{t('notFound')}</div>;
}
