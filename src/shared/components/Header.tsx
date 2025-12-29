import { StatCard } from '@shared/components/common/StatCard';
import { Star, Flame, Sparkles } from 'lucide-react';
import { Text } from '@shared/components/common/Text';
import Button from '@shared/components/common/Button';
import { Heading } from '@shared/components/common/Heading';

const Header = () => {
  return (
    <header className="flex justify-end sm:justify-between bg-white px-6 py-4 shadow-sm z-10">
      <Heading level={3} className="hidden sm:block" color='primary'>Welcome back Sa !!</Heading>
      <div className="flex justify-end items-center gap-4 font-bold">
        <div className="hidden sm:flex gap-4">
          <StatCard
            icon={<Star size={18} className="text-white" />}
            value={50}
            bgClass="from-yellow-400 to-yellow-500"
          />
          <StatCard
            icon={<Sparkles size={18} className="text-white" />}
            value={`${500} XP`}
            bgClass="from-green-400 to-green-500"
          />
        </div>
        <Button
          variant="danger"
          size="sm"
          icon={<Flame size={18} className="text-white" />}
          onClick={() => alert('Streak extended!')}>
          <Text as="span" variant="body" color="default">{`${5} Days`}</Text>
        </Button>
      </div>
    </header>
  );
};

export default Header;
