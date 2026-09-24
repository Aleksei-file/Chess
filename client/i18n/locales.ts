/**
 * Shared locale metadata for the next-intl setup (request config + actions).
 */
export const locales = ['en', 'pt', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeCookieName = 'NEXT_LOCALE';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
