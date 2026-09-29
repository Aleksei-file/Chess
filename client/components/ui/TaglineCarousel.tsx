/**
 * Rotates through a set of short marketing taglines on the landing page,
 * advancing to the next one on a fixed interval.
 */
'use client';

import { useEffect, useState, type JSX } from 'react';
import styles from './TaglineCarousel.module.scss';

interface ITaglineCarousel {
  taglines: string[];
  interval?: number;
}

const DEFAULT_ROTATION_INTERVAL_MS = 4000;

const TaglineCarousel = (props: ITaglineCarousel): JSX.Element => {
  const { taglines, interval } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect((): (() => void) => {
    const intervalId = setInterval((): void => {
      setActiveIndex(
        (previousIndex: number): number => (previousIndex + 1) % taglines.length
      );
    }, interval || DEFAULT_ROTATION_INTERVAL_MS);
    return (): void => clearInterval(intervalId);
  }, [taglines.length, interval]);

  return (
    <p className={styles.Tagline} aria-live="polite">
      <span key={activeIndex} className={styles.TaglineText}>
        {taglines[activeIndex]}
      </span>
    </p>
  );
};

export { TaglineCarousel, type ITaglineCarousel };
