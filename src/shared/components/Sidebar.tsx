import {
  Home,
  Trophy,
  Target,
  User,
  LogOut,
} from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import logo from '@assets/images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text } from '@shared/components/common';
import { ROUTES } from '@shared/constants/routes';
import { useAuthStore } from '@store/useAuthStore';

const menuItems = [
  { label: 'Home', icon: Home, path: ROUTES.HOME },
  { label: 'Leader board', icon: Trophy, path: ROUTES.LEADERBOARD },
  { label: 'Task', icon: Target, path: ROUTES.TASK },
  { label: 'Profile', icon: User, path: ROUTES.PROFILE },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });

  };
  return (
    <aside className="h-screen bg-white shadow-sm flex flex-col text-sm px-2 sm:px-6 w-auto sm:min-w-[220px] sm:max-w-[280px]">
      <Link to={ROUTES.HOME} className="flex justify-center">
        <img src={logo} alt="Logo" className="w-10 sm:max-w-[100px] sm:w-full" />
      </Link>

      <nav className="flex-1 px-2 sm:px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <div
              className={clsx(
                'flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer',
                'justify-center sm:justify-start',
                'font-medium transition',
                isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-500 hover:text-blue-500 hover:bg-blue-400/15',
              )}
              key={item.label}
              onClick={() => navigate(item.path)}
            >
              <Icon size={20} />
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="px-2 sm:px-4 py-4 border-t border-gray-200">
        <button
          className={clsx(
            'w-full',
            'px-3 py-2',
            'rounded-xl',
            'flex items-center gap-3',
            'justify-center sm:justify-start',
            'text-red-500 font-medium',
            'transition',
            'hover:bg-red-500/15',
            'cursor-pointer',
          )}
          onClick={handleLogout}
        >
          <LogOut size={20} color="var(--text-danger)" />
          <span className="hidden sm:inline">
            <Text variant="body" color="danger">Log Out</Text>
          </span>
        </button>
      </div>
    </aside>
  );
};
