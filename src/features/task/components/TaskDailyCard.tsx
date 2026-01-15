import { CircleCheck } from 'lucide-react';
import { Heading, Text, Button, Card } from '@shared/components/common';
import CircularProgress from '@shared/components/icon/CircularProgress';
import type { TaskUI } from '@features/task/types/task';

interface TaskDailyProps {
  task: TaskUI
  onClaim: () => void
}

export const TaskDailyCard = ({ task, onClaim }: TaskDailyProps) => {
  const isCompleted = task.isCompleted;
  const isClaimed = task.isClaimed;
  return (
    <Card variant="bordered" padding="sm">
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <div className="w-10 h-10 flex items-center justify-center">
            {task.icon}
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <Heading level={6} color="muted">
            {task.name}
          </Heading>

          <Text truncate maxWidth="100%" variant="caption" color="muted">
            {task.description}
          </Text>

          <div className="flex items-center gap-1 mt-1">
            <Text
              variant="caption"
              color="primary"
              className="bg-blue-50 px-2 py-0.5 rounded"
            >
              +{task.rewardXp} XP
            </Text>
          </div>
        </div>

        {isClaimed ? (
          <CircleCheck className="w-8 h-8 text-green-500 shrink-0" />
        ) : isCompleted ? (
          <Button onClick={onClaim} variant="primary" size="md">
            Claim
          </Button>
        ) : (
          <CircularProgress
            current={task.currentCount}
            target={task.targetCount}
          />
        )}
      </div>
    </Card>
  );
};
