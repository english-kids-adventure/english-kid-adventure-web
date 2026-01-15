import { Text } from '@shared/components/common';
import React from 'react';
import clsx from 'clsx';

export type MetricColor = 'primary' | 'success' | 'danger' | 'warning';
export type MetricSize = 'sm' | 'md' | 'lg';

const colorStyles: Record<MetricColor, string> = {
  primary: 'text-blue-600',
  success: 'text-green-600',
  danger: 'text-red-600',
  warning: 'text-yellow-600',
};

const sizeStyles: Record<MetricSize, { value: string; label: string }> = {
  sm: { value: 'text-2xl', label: 'text-xs' },
  md: { value: 'text-3xl', label: 'text-sm' },
  lg: { value: 'text-4xl', label: 'text-base' },
};

interface MetricProps {
  value: React.ReactNode;
  label: string;
  color?: MetricColor;
  size?: MetricSize;
  className?: string;
}

export const Metric = ({
  value,
  label,
  color = 'primary',
  size = 'md',
  className,
}: MetricProps) => {
  return (
    <div className={clsx('text-center', className)}>
      <div className={clsx('font-bold', colorStyles[color], sizeStyles[size].value)}>
        {value}
      </div>
      <Text
        variant="caption"
        color="muted"
        className={clsx('mt-2', sizeStyles[size].label)}
      >
        {label}
      </Text>
    </div>
  );
};

export default Metric;
