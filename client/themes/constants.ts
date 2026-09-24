/**
 * Shared theme metadata: the supported theme list, the default theme, and
 * the cookie name used to persist the user's choice.
 */

export const themes = ['light', 'dark', 'sepia'] as const;

export type Theme = (typeof themes)[number];

export const defaultTheme: Theme = themes[0];

export const themeCookieName = 'MAIN_THEME';

export const isTheme = (value: string): value is Theme =>
   (themes as readonly string[]).includes(value);
