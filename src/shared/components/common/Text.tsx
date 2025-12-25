import React from 'react';
import clsx from 'clsx';

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'small';
type TextColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';

interface TextProps {
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  className?: string;
  maxWidth?: string;
}

const variantStyles: Record<TextVariant, string> = {
  title: 'text-title',
  subtitle: 'text-subtitle',
  body: 'text-body',
  caption: 'text-caption',
  small: 'text-small',
};

const colorStyles: Record<TextColor, string> = {
  default: 'text-default',
  muted: 'text-muted',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

export const Text: React.FC<TextProps> = ({
  as: Component = 'span',
  children,
  variant = 'body',
  color = 'default',
  align = 'left',
  truncate = false,
  className,
  maxWidth,
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
      style={maxWidth ? { maxWidth } : undefined}
    >
      {children}
    </Component>
  );
};

export default Text;
