import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@shared/constants/routes';

interface BackButtonProps {
  size?: number;
  fallback?: string;
}

export function BackButton({ size = 24, fallback = ROUTES.HOME }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => (window.history.length > 1 ? navigate(-1) : navigate(fallback))}
      className="
        inline-flex items-center gap-2
        text-sm font-medium text-gray-600
        hover:text-gray-700
        transition
      "
      aria-label="Go back"
    >
      <ArrowLeft size={size} />
    </button>
  );
}

