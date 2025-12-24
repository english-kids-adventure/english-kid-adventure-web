import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  success: 'bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600',
  warning: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600',
  danger: 'bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-[1.2em] py-[0.4em] text-sm rounded-full',
  md: 'px-[1.2em] py-[0.5em] text-sm rounded-lg',
  lg: 'px-[1.2em] py-[0.6em] text-sm rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  onClick,
  className,
  type = 'button',
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold cursor-pointer',
        'transition-all duration-200',
        'active:scale-95',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && icon}
      <span className="whitespace-nowrap">{children}</span>
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};

export default Button;
