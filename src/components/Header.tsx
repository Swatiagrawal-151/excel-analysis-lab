
import React from 'react';
import { BarChart3, Database, TrendingUp, Figma } from 'lucide-react';
import { Navigation } from './Navigation';

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl shadow-lg">
              <Figma className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                DataViz Pro
              </h1>
              <p className="text-sm text-slate-500 font-medium">Figma-Inspired Analytics Platform</p>
            </div>
          </div>
          
          <Navigation />
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl">
              <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Data Analysis</span>
            </div>
            <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl">
              <div className="p-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Visualization</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
