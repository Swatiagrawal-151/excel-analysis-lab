
import React from 'react';
import { Header } from '@/components/Header';
import Index from './Index';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Data Analytics
          </h1>
          <p className="text-slate-600">Upload your data and create beautiful visualizations with AI assistance.</p>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg p-6">
          <Index />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
