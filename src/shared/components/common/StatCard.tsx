import React from 'react';
import clsx from 'clsx';

interface StatCardProps {
  icon: React.ReactNode;
  value: React.ReactNode;
  bgClass?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  bgClass = 'from-gray-400 to-gray-500',
  onClick,
}) => {
  const isClickable = Boolean(onClick);

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-3',
        'px-[1.2em] py-[0.4em]',
        'rounded-full text-white font-semibold',
        'bg-gradient-to-r',
        bgClass,
        'transition-all duration-200',
        isClickable &&
          'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-95',
      )}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
    >
      <div className="text-xl leading-none">{icon}</div>
      <div className="text-sm whitespace-nowrap">{value}</div>
    </div>
  );
};
