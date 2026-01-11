import type React from 'react';

export const WEEKLY_TASK_ICON_MAP: Record<string, React.ReactNode> = {
  W1: (
    <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full font-bold text-yellow-600">
      1
    </div>
  ),
  W2: (
    <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full font-bold text-gray-600">
      2
    </div>
  ),
  W3: (
    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full font-bold text-orange-600">
      3
    </div>
  ),
};
