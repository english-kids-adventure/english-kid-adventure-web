import React from 'react';
import clsx from 'clsx';

export type CardVariant = 'default' | 'elevated' | 'bordered';
export type CardPadding = 'sm' | 'md' | 'lg';

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white',
  elevated: 'bg-white shadow-lg',
  bordered: 'bg-white shadow-sm border border-border',
};

const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className,
  onClick,
}: CardProps) => {
  const isClickable = Boolean(onClick);

  return (
    <div
      className={clsx(
        variantStyles[variant],
        paddingStyles[padding],
        'rounded-2xl',
        isClickable && 'cursor-pointer hover:shadow-md transition-shadow',
        className,
      )}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
