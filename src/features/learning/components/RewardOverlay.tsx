import { Check } from 'lucide-react';
import { Button, Text } from '@shared/components/common';

interface RewardOverlayProps {
  onClaim: () => void;
  xpReward: number;
}

export function RewardOverlay({ onClaim, xpReward }: RewardOverlayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-md z-50 transition-all duration-500">

      <Button
        unstyled
        onClick={onClaim}
        size='sm'
        className="flex flex-col items-center"
      >
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.4)] animate-bounce border-4 border-white/50">
          <Check size={38} className="text-white drop-shadow-lg" />
        </div>

        <div className="bg-white/20 backdrop-blur-xl px-4 py-3 rounded-3xl border border-white/30 shadow-2xl transform transition-transform group-hover:scale-110">
          <div className="flex flex-col items-center gap-1">
            <Text variant="subtitle">
              Claim {xpReward} XP
            </Text>
          </div>
        </div>
      </Button>
    </div>
  );
}
