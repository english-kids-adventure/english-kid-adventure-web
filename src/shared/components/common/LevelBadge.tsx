import clsx from 'clsx';

interface LevelBadgeProps {
  text: string;
  textSize?: string;
  bgColor?: string;
  textColor?: string;
}

export function LevelBadge({
  text,
  textSize = 'text-sm',
  bgColor = 'bg-green-200',
  textColor = 'text-green-600',
}: LevelBadgeProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center',
        'rounded-full',
        'px-[1.2em] py-[0.2em]',
        textSize,
        bgColor,
        textColor,
        'font-semibold',
      )}
    >
      {text}
    </div>
  );
}
