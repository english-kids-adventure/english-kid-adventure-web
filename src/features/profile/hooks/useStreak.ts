import { useState, useEffect, useRef, useMemo } from 'react';
import { useProfile } from '@/features/profile/hooks/useProfile';
import type { DayData } from '@/features/profile/types';
import { UI_LABELS } from '@/shared/constants';

export const useStreak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useProfile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const days = useMemo((): DayData[] => {
    const labels = Object.values(UI_LABELS.PROFILE.WEEK_DAYS);
    const currentDayIndex = new Date().getDay();

    const completedDays = user?.completed_days ?? [];

    return labels.map((label, index) => {
      const isCompleted = completedDays.includes(index);

      return {
        label,
        active: isCompleted,
        fire: isCompleted,
        current: index === currentDayIndex,
        status:
          index > currentDayIndex
            ? 'future'
            : isCompleted
              ? 'active'
              : 'missed',
      };
    });
  }, [user]);

  return {
    isOpen,
    popoverRef,
    isLoading,
    toggle: () => setIsOpen((p) => !p),
    streakData: {
      currentStreak: user?.current_streak ?? 0,
      longestStreak: user?.longest_streak ?? 0,
      days,
    },
  };
};
