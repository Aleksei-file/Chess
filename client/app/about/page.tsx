/**
 * Defines the informational About page for the chess application.
 * Introduces the product, the Stockfish-powered opponent, and the author's motivation.
 */
import type { JSX } from 'react';
import { getTranslations } from 'next-intl/server';
import styles from './About.module.scss';

export default async function AboutPage(): Promise<JSX.Element> {
  const t = await getTranslations('about');

  return (
    <div className={styles.Page}>
      <h1 className={styles.Title}>{t('title')}</h1>
      <p className={styles.Intro}>{t('intro')}</p>

      <section className={styles.Section}>
        <h2 className={styles.SectionTitle}>{t('opponent.title')}</h2>
        <p className={styles.SectionText}>{t('opponent.text')}</p>
      </section>

      <section className={styles.Section}>
        <h2 className={styles.SectionTitle}>{t('stockfish.title')}</h2>
        <p className={styles.SectionText}>{t('stockfish.text')}</p>
      </section>

      <section className={styles.Section}>
        <h2 className={styles.SectionTitle}>{t('story.title')}</h2>
        <p className={styles.SectionText}>{t('story.text1')}</p>
        <p className={styles.SectionText}>{t('story.text2')}</p>
        <p className={styles.Signature}>{t('signature')}</p>
      </section>
    </div>
  );
}
