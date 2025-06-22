
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, PieChart, FileText } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/charts', label: 'Charts', icon: PieChart },
    { path: '/reports', label: 'Reports', icon: FileText }
  ];

  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-purple-100 text-purple-600 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-purple-600'
            }`}
          >
            <IconComponent className="h-4 w-4" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
