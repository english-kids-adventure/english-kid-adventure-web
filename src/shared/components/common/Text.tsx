import React, { type JSX } from 'react';
import clsx from 'clsx';

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'small';

type TextColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';

interface TextProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  variant?: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  title: 'text-xl font-bold',
  subtitle: 'text-lg font-semibold',
  body: 'text-sm',
  caption: 'text-xs',
  small: 'text-[11px]',
};

const colorStyles: Record<TextColor, string> = {
  default: 'text-white',
  muted: 'text-gray-700',
  primary: 'text-blue-700',
  success: 'text-green-700',
  warning: 'text-yellow-700',
  danger: 'text-red-700',
};

export const Text: React.FC<TextProps> = ({
  as: Component = 'span',
  children,
  variant = 'body',
  color = 'default',
  align = 'left',
  truncate = false,
  className,
}) => {
  return (
    <Component
      className={clsx(
        variantStyles[variant],
        colorStyles[color],
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        truncate && 'truncate inline-block',
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default Text;
