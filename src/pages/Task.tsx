import { Trophy, ListChecks } from 'lucide-react';
import { Heading, Loading } from '@shared/components/common';
import { useTask } from '@features/task/hooks/useTask';
import { TaskDailyCard } from '@features/task/components/TaskDailyCard';
import { TaskWeeklyCard } from '@features/task/components/TaskWeeklyCard';

const Task = () => {
  const {
    dailyTasks,
    weeklyTasks,
    handleClaimDaily,
    handleClaimWeekly,
    isLoading,
    isError,
  } = useTask();

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <div>Failed to load tasks</div>;
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-6 h-6 text-primary" />
            <Heading level={4} color="primary">
              Daily Tasks
            </Heading>
          </div>

          <div className="space-y-3">
            {dailyTasks.map((task) => (
              <TaskDailyCard
                key={task.id}
                task={task}
                onClaim={() => handleClaimDaily(task)}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-primary" />
            <Heading level={4} color="primary">
              Weekly Tasks
            </Heading>
          </div>

          <div className="space-y-3">
            {weeklyTasks.map((task) => (
              <TaskWeeklyCard
                key={task.id}
                task={task}
                onClaim={() => handleClaimWeekly(task)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Task;
