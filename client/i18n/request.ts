/**
 * Resolves the request locale on the server: saved cookie first, then the
 * browser's Accept-Language header, falling back to the default locale.
 * This keeps the first server-rendered HTML and the client in sync, so
 * there is no post-hydration flash of the wrong language.
 */
import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import en from '@/locales/en/translation.json';
import pt from '@/locales/pt/translation.json';
import ru from '@/locales/ru/translation.json';
import { defaultLocale, isLocale, localeCookieName, type Locale } from './locales';

const messagesByLocale: Record<Locale, typeof en> = { en, pt, ru };

async function resolveLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(localeCookieName)?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const preferredLanguage = (await headers())
    .get('accept-language')
    ?.split(',')[0]
    ?.split('-')[0];
  if (preferredLanguage && isLocale(preferredLanguage)) {
    return preferredLanguage;
  }

  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await resolveLocale();
  return { locale, messages: messagesByLocale[locale] };
});
