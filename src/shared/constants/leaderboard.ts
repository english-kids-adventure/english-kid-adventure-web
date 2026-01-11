import { Trophy, Medal, Award } from 'lucide-react';
import type { ElementType } from 'react';

export const PODIUM_ICON_MAP: Record<string, ElementType> = {
  '1': Trophy,
  '2': Medal,
  '3': Award,
};
