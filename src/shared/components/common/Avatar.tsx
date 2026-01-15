import clsx from 'clsx';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

const borderStyles: Record<AvatarSize, string> = {
  sm: 'border-2',
  md: 'border-4',
  lg: 'border-6',
  xl: 'border-8',
};

interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  border?: boolean;
  borderColor?: string;
  className?: string;
}

export const Avatar = ({
  src,
  alt,
  size = 'md',
  border = false,
  borderColor = 'border-pink-50',
  className,
}: AvatarProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={clsx(
        'rounded-full object-cover',
        size === 'sm' && 'w-8 h-8',
        size === 'md' && 'w-16 h-16',
        size === 'lg' && 'w-24 h-24',
        size === 'xl' && 'w-32 h-32',
        border && borderStyles[size],
        border && borderColor,
        'shadow-md',
        className,
      )}
    />
  );
};

export default Avatar;
