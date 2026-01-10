import { Trophy, Play, Star, LogIn } from 'lucide-react';
import React from 'react';

export const DAILY_TASK_ICON_MAP: Record<string, React.ReactNode> = {
  D1: <LogIn className="text-blue-500" />,
  D2: <Play className="text-purple-500" />,
  D4: <Star className="text-yellow-500" />,
  D8: <Trophy className="text-green-500" />,
};
