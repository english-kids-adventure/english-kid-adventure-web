import { calculateCircularProgress } from '@shared/utils/circularProgress';

interface CircularProgressProps {
  current: number
  target: number
}

const CircularProgress = ({
  current,
  target,
}: CircularProgressProps) => {
  const {
    radius,
    circumference,
    strokeDashoffset,
  } = calculateCircularProgress(current, target);

  return (
    <div className="relative w-12 h-12">
      <svg
        className="w-12 h-12 -rotate-90"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-300"
        />

        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-green-500 transition-all duration-300"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
        {current}/{target}
      </div>
    </div>
  );
};

export default CircularProgress;
