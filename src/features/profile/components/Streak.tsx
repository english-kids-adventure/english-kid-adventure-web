import { Triangle, Flame } from 'lucide-react';
import clsx from 'clsx';
import { Text } from '@/shared/components/common/Text';
import type { DayData } from '@/features/profile/types';

interface StreakProps {
  days: DayData[];
  currentStreak: number;
  longestStreak: number;
}

export function Streak({ days, currentStreak, longestStreak }: StreakProps) {
  return (
    <div className="relative w-[340px] p-6 rounded-[24px] shadow-md bg-white border border-gray-100 animate-in fade-in zoom-in duration-200">
      <div className="absolute -top-2 right-10 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100" />

      <div className="relative flex flex-col items-center space-y-6">
        <div className="flex w-full gap-3">
          <div className="flex-1 flex flex-col items-start justify-center p-4 rounded-2xl bg-slate-50/50">
            <Text as="h2" variant="subtitle" className="font-bold !text-black leading-none">
              {currentStreak}
            </Text>
            <Text variant="small" className="uppercase font-bold !text-black/50 mt-1.5 tracking-tight">
              Current Day
            </Text>
          </div>

          <div className="flex-1 flex flex-col items-start justify-center p-4 rounded-2xl bg-slate-50/50">
            <Text as="h2" variant="subtitle" className="font-bold !text-black leading-none">
              {longestStreak}
            </Text>
            <Text variant="small" className="uppercase font-bold !text-black/50 mt-1.5 tracking-tight">
              Best Streak
            </Text>
          </div>
        </div>

        <div className="w-full pt-2">
          <div className="flex justify-between items-end px-1">
            {days.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2 relative">
                {day.current && (
                  <Triangle className="w-3 h-3 text-[#ff5252] fill-[#ff5252] absolute -top-4 rotate-180" />
                )}

                <div
                  className={clsx(
                    'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300',
                    day.current && !day.active
                      ? 'border-2 border-dashed border-[#ff5252]'
                      : day.active
                        ? 'bg-[#ff5252] text-white'
                        : 'border-2 border-gray-200',
                  )}
                >
                  {(day.fire || day.active) ? (
                    <Flame size={18} className="text-white fill-current" />
                  ) : null}
                </div>

                <Text
                  variant="small"
                  className={clsx(
                    'font-bold',
                    day.active || day.current ? '!text-slate-800' : '!text-gray-400',
                  )}
                >
                  {day.label.slice(0, 3)}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
