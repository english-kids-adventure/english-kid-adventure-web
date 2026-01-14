import type { ReactNode } from 'react';
import { PlayerProvider } from '@store/player/PlayerProvider';

type ProviderProps = { children: ReactNode }

const providers = [
  PlayerProvider,
];

export const AppProviders = ({ children }: ProviderProps) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
};

