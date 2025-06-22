
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            DataViz Pro
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user && <UserProfile />}
        </div>
      </div>
    </header>
  );
};

export default Header;
