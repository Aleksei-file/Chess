/**
 * Defines the landing page for the chess application: a hero logo, a
 * rotating set of marketing taglines, and the primary call to action.
 */
import type { JSX } from 'react';
import { getTranslations } from 'next-intl/server';
import StartGameButton from '@/components/startGame/StartGameButton';
import { TaglineCarousel } from '@/components/ui/TaglineCarousel';
import styles from './Main.module.scss';

export default async function Home(): Promise<JSX.Element> {
  const t = await getTranslations();
  const taglines = t.raw('main.taglines') as string[];

  return (
    <div className="flex-1 flex flex-col items-center justify-between w-full gap-8 py-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div aria-hidden="true" className={styles.Welcome} />
        <TaglineCarousel taglines={taglines} />
      </div>
      <StartGameButton
        title={t('main.start_game')}
        className={styles.StartButton}
      />
    </div>
  );
}
