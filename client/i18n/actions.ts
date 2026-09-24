/**
 * Server action for persisting the user's locale choice to a cookie so the
 * next request (and RSC re-render triggered by router.refresh()) picks it up.
 */
'use server';

import { cookies } from 'next/headers';
import { localeCookieName, type Locale } from './locales';

export async function setUserLocale(locale: Locale): Promise<void> {
  (await cookies()).set(localeCookieName, locale);
}
