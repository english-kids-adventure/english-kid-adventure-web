import { StatCard } from '@/shared/components/common/StatCard';
import { Flame, Sparkles, Star } from 'lucide-react';
import { Text } from '@/shared/components/common/Text';
import Button from '@/shared/components/common/Button';
import { useStreak, Streak } from '@/features/profile';
import { Loading } from '@/shared/components/common/Loading';

const Header = () => {
  const {
    isOpen, popoverRef, days, toggle,
    currentStreak, longestStreak, xp, stars, name, isLoading,
  } = useStreak();

  if (isLoading) return <Loading />;

  return (
    <header className="flex justify-end sm:justify-between bg-white px-6 py-4 shadow-sm z-10">
      <Text className="hidden sm:inline-block" color='primary' variant="subtitle">Welcome back {name} !</Text>
      <div className="flex justify-end items-center gap-4 font-bold">
        <div className="hidden sm:flex gap-4">
          <StatCard
            icon={<Star size={18} className="text-white" />}
            value={stars}
            bgClass="from-yellow-400 to-yellow-500"
          />
          <StatCard
            icon={<Sparkles size={18} className="text-white" />}
            value={`${xp} XP`}
            bgClass="from-green-400 to-green-500"
          />
        </div>
        <div className="relative" ref={popoverRef}>
          <Button
            variant="danger"
            size="sm"
            icon={<Flame size={18} className="text-white" />}
            onClick={toggle}
          >
            <Text as="span" variant="body" color="default">{`${currentStreak} Days`}</Text>
          </Button>

          {isOpen && (
            <div className="absolute right-0 mt-3 z-[100]">
              <Streak days={days} currentStreak={currentStreak} longestStreak={longestStreak} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
