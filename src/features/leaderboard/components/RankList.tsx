export const RankList = () => {
  const players = [
    { rank: 1, name: 'Super Kid', xp: 5000, icon: '🥇' },
    { rank: 2, name: 'Little Na', xp: 4200, icon: '🥈' },
    { rank: 3, name: 'Happy Cat', xp: 3800, icon: '🥉' },
  ];

  return (
    <div className='bg-white rounded-3xl p-6 shadow-sm border-4 border-yellow-200'>
      {players.map((p) => (
        <div
          key={p.rank}
          className='flex items-center justify-between p-4 border-b last:border-0 font-bold'
        >
          <span className='text-2xl'>{p.icon}</span>
          <span className='flex-1 ml-4 text-slate-700'>{p.name}</span>
          <span className='text-blue-500 font-black'>{p.xp} XP</span>
        </div>
      ))}
    </div>
  );
};
