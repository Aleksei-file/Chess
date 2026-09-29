/**
 * Owns the open/closed state of the start-game confirmation popup and renders
 * it once for the whole app. Any client component can request a game start via
 * `useStartGame()` without knowing where or how the popup is rendered.
 */
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type JSX,
  type ReactNode,
} from 'react';
import StartGamePopup from '@/components/startGame/StartGamePopup';

interface IStartGameContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

const StartGameContext = createContext<IStartGameContext | null>(null);

function StartGameProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback((): void => setOpen(true), []);
  const close = useCallback((): void => setOpen(false), []);
  const value = useMemo(
    (): IStartGameContext => ({ isOpen, open, close, setOpen }),
    [isOpen, open, close]
  );

  return (
    <StartGameContext.Provider value={value}>
      {children}
      <StartGamePopup />
    </StartGameContext.Provider>
  );
}

/** Returns the start-game controls; must be used under StartGameProvider. */
function useStartGame(): IStartGameContext {
  const context = useContext(StartGameContext);
  if (!context) {
    throw new Error('useStartGame must be used within a StartGameProvider');
  }
  return context;
}

export { StartGameProvider, useStartGame };
