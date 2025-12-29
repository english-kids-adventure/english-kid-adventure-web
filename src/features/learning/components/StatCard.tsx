import React from 'react';
import Text from '@shared/components/common/Text';

interface StatCardProps {
  icon: React.ReactElement
  value: number
  label: string
}

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 flex flex-col items-center justify-center gap-2 transition-colors">
      <div className="text-subtitle scale-125 text-default">
        {React.cloneElement(icon)}
      </div>
      <Text variant="subtitle" color="default">
        {value}
      </Text>
      <Text variant="subtitle" color="default">
        {label}
      </Text>
    </div>
  );
}
