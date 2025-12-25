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
  primary: 'bg-btn-primary text-white bg-btn-primary:hover',
  secondary: 'bg-btn-secondary text-gray-700 bg-btn-secondary:hover',
  success: 'bg-btn-success text-white bg-btn-success:hover',
  warning: 'bg-btn-warning text-white bg-btn-warning:hover',
  danger: 'bg-btn-danger text-white bg-btn-danger:hover',
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
