import clsx from 'clsx';

interface LevelBadgeProps {
  text: string;
  textSize?: string;
  bgColor?: string;
  textColor?: string;
}

export const LevelBadge = ({
  text,
  textSize = 'text-sm',
  bgColor = 'bg-green-200',
  textColor = 'text-green-600',
}: LevelBadgeProps) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center',
        'rounded-full',
        'px-5 py-1.25',
        textSize,
        bgColor,
        textColor,
        'font-semibold',
      )}
    >
      {text}
    </div>
  );
};
