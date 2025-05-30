
import React from 'react';
import { BarChart3, Database, TrendingUp } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DataViz Pro</h1>
              <p className="text-sm text-gray-500">Excel Analytics Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Database className="h-5 w-5" />
              <span className="text-sm font-medium">Data Analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Visualization</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
