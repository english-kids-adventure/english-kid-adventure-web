import { useState, useEffect, useRef } from 'react';
import { useProfile } from '@/features/profile/hooks/useProfile';
import type{ DayData } from '@/features/profile/types';

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

  const generateWeekDays = (): DayData[] => {
    const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const currentDayIndex = today.getDay();

    return labels.map((label, index) => ({
      label,
      active: index <= currentDayIndex,
      fire: index <= currentDayIndex,
      current: index === currentDayIndex,
    }));
  };

  return {
    isOpen,
    popoverRef,
    isLoading,
    days: generateWeekDays(),
    toggle: () => setIsOpen((prev) => !prev),
    currentStreak: user?.current_streak ?? 0,
    longestStreak: user?.longest_streak ?? 0,
    xp: user?.total_xp ?? 0,
    stars: user?.total_stars ?? 0,
    name: user?.name ?? '',
  };
};
