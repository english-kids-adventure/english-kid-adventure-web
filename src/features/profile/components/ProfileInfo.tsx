import { Avatar, Card } from '@shared/components/common';

export const ProfileInfo = () => (
  <Card variant="default" padding="lg" className="text-center border-4 border-pink-100">
    <Avatar
      src="https://api.dicebear.com/7.x/adventurer/svg?seed=Lucky"
      alt="Avatar"
      size="xl"
      border
      borderColor="border-pink-50"
      className="mx-auto mb-4"
    />
    <h2 className="text-3xl font-black text-slate-800">Bé Na</h2>
    <p className="text-slate-400 font-bold">Thành viên từ: 2025</p>
  </Card>
);
