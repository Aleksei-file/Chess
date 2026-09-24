/**
 * Server actions for reading and persisting the user's theme choice via a
 * cookie, mirroring the locale cookie flow in i18n/actions.ts.
 */
'use server'

import { cookies } from 'next/headers'
import { defaultTheme, themeCookieName, isTheme, type Theme } from './constants';

export async function setTheme(theme: Theme): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(themeCookieName, theme, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}

export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get(themeCookieName)?.value;
  return cookieTheme && isTheme(cookieTheme) ? cookieTheme : defaultTheme;
}
