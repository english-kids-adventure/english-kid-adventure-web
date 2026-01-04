import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useProfile } from '@/features/profile/hooks/useProfile';
import type{ DayData } from '@/features/profile/types';
import { UI_LABELS } from '@/shared/constants';

export const useStreak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useProfile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const days = useMemo((): DayData[] => {
    const labels = Object.values(UI_LABELS.PROFILE.WEEK_DAYS);
    const today = new Date();
    const currentDayIndex = today.getDay();

    const completedDays = user?.completed_days ?? [];
    return labels.map((label, index) => {
      const isCompleted = completedDays.includes(index);

      return {
        label,
        active: isCompleted,
        fire: isCompleted,
        current: index === currentDayIndex,
        status: index > currentDayIndex ? 'future' : (isCompleted ? 'active' : 'missed'),
      };
    });
  }, [user]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    popoverRef,
    isLoading,
    days,
    toggle,
    streakData: {
      currentStreak: user?.current_streak ?? 0,
      longestStreak: user?.longest_streak ?? 0,
      days,
    },
    xp: user?.total_xp ?? 0,
    stars: user?.total_stars ?? 0,
    name: user?.name ?? '',
  };
};
