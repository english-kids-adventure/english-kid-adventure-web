interface CircularProgressCalc {
  percentage: number
  radius: number
  circumference: number
  strokeDashoffset: number
}

export const calculateCircularProgress = (
  current: number,
  target: number,
  radius = 45,
): CircularProgressCalc => {
  const percentage = Math.min((current / target) * 100, 100);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return {
    percentage,
    radius,
    circumference,
    strokeDashoffset,
  };
};
