import React from 'react';
import clsx from 'clsx';
import { Text } from '@shared/components/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconPosition = 'prefix' | 'suffix';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  unstyled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-btn-primary text-white bg-btn-primary-hover',
  secondary: 'bg-btn-secondary text-gray-700 bg-btn-secondary-hover',
  success: 'bg-btn-success text-white bg-btn-success-hover',
  warning: 'bg-btn-warning text-white bg-btn-warning-hover',
  danger: 'bg-btn-danger text-white bg-btn-danger-hover',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-1.5 text-sm rounded-full',
  md: 'px-5 py-2 text-sm rounded-lg',
  lg: 'px-5 py-2.5 text-sm rounded-xl',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  unstyled = false,
  iconPosition = 'prefix',
  fullWidth = false,
  disabled = false,
  onClick,
  className,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold cursor-pointer',
        'transition-all duration-200',
        'active:scale-95',
        !unstyled && variantStyles[variant],
        !unstyled && sizeStyles[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
    >
      {icon && iconPosition === 'prefix' && icon}
      {unstyled ? (
        children
      ) : (
        <Text className="whitespace-nowrap">{children}</Text>
      )}
      {icon && iconPosition === 'suffix' && icon}
    </button>
  );
};

export default Button;
