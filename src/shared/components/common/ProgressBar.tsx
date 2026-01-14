import clsx from 'clsx';

export type ProgressBarVariant = 'primary' | 'success' | 'danger' | 'warning';
export type ProgressBarSize = 'sm' | 'md';

export interface ProgressColors {
  bg: string;
  text: string;
}

export const PROGRESS_STYLES: Record<number, ProgressColors> = {
  0: { bg: 'bg-btn-secondary', text: 'text-muted' },
  1: { bg: 'bg-btn-danger', text: 'text-danger' },
  50: { bg: 'bg-btn-primary', text: 'text-primary' },
  80: { bg: 'bg-btn-success', text: 'text-success' },
};

export const getProgressStyle = (progressPercent: number): ProgressColors => {
  if (progressPercent === 0) return PROGRESS_STYLES[0];
  if (progressPercent >= 1 && progressPercent <= 49) return PROGRESS_STYLES[1];
  if (progressPercent >= 50 && progressPercent <= 79) return PROGRESS_STYLES[50];
  if (progressPercent >= 80 && progressPercent <= 100) return PROGRESS_STYLES[80];
  return PROGRESS_STYLES[0];
};

export const variantStyles: Record<ProgressBarVariant, string> = {
  primary: 'bg-btn-primary',
  success: 'bg-btn-success',
  danger: 'bg-btn-danger',
  warning: 'bg-btn-warning',
};

export const sizeStyles: Record<ProgressBarSize, string> = {
  sm: 'h-2',
  md: 'h-3',
};

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  className?: string;
};

export const ProgressBar = ({
  value,
  max = 100,
  variant = 'primary',
  size = 'sm',
  className,
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={clsx('w-full bg-gray-200 rounded-full overflow-hidden', sizeStyles[size], className)}>
      <div
        className={clsx('h-full transition-all duration-300 rounded-full', variantStyles[variant])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
