import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const Header = () => {
  const { user, logout } = useAuthStore();
  return (
    <header className="bg-white border-b-4 border-yellow-400 p-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-orange-500 italic">ADVENTURE KIDS 🚀</Link>
        <div className="flex items-center gap-4 font-bold">
          <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-600">🔥 {user?.current_streak || 0}</div>
          <div className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-600">⭐ {user?.total_stars || 0}</div>
          <div className="bg-green-100 px-3 py-1 rounded-full text-green-600">✨ {user?.total_xp || 0} XP</div>
          <button onClick={logout} className="text-sm text-slate-400 hover:text-red-500">Logout</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
