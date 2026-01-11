import { CircleCheck, Star } from 'lucide-react';
import clsx from 'clsx';
import { Heading, Text, Button } from '@shared/components/common';
import type { TaskUI } from '@features/task/types/task';

interface TaskWeeklyProps {
  task: TaskUI
  onClaim: () => void
}

export const TaskWeeklyCard = ({ task, onClaim }: TaskWeeklyProps) => {
  const isCompleted = task.isCompleted;
  const isClaimed = task.isClaimed;
  return (
    <div
      className={clsx(
        'rounded-lg p-4 border transition-all',
        isCompleted
          ? 'bg-yellow-50 border-yellow-200 shadow-sm'
          : 'bg-card border-border shadow-sm',
      )}
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0">{task.icon}</div>

        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <Heading level={6} color={isCompleted ? 'warning' : 'muted'}>
            {task.name}
          </Heading>

          <Text as="p" color={isCompleted ? 'warning' : 'muted'}>
            {task.description}
          </Text>

          <div className="flex items-center gap-1 mt-1">
            <Text
              variant="caption"
              color="warning"
              className={clsx(
                'px-2 py-0.5 rounded flex items-center gap-1',
                isCompleted
                  ? 'text-yellow-700 bg-yellow-100'
                  : 'text-yellow-600 bg-yellow-50',
              )}
            >
              <Star size={16} /> +{task.rewardStars} Stars
            </Text>
          </div>
        </div>

        {isClaimed ? (
          <div className="flex flex-col items-center gap-2 shrink-0">
            <CircleCheck className="w-8 h-8 text-green-500" />
          </div>
        ) : isCompleted ? (
          <Button onClick={onClaim} variant="warning" size="md">
              Claim
          </Button>
        ) : null}
      </div>
    </div>
  );
};
