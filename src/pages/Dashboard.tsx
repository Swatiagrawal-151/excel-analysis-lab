
import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Database } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Total Data Sets",
      value: "24",
      change: "+12% from last month",
      icon: Database,
      color: "text-blue-600"
    },
    {
      title: "Active Charts",
      value: "156",
      change: "+8% from last month", 
      icon: BarChart3,
      color: "text-green-600"
    },
    {
      title: "Insights Generated",
      value: "89",
      change: "+23% from last month",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2 new this month",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600">Welcome back! Here's your analytics overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r from-slate-100 to-slate-200`}>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                  <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sales data uploaded</p>
                    <p className="text-xs text-slate-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Bar chart created</p>
                    <p className="text-xs text-slate-500">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">AI recommendation applied</p>
                    <p className="text-xs text-slate-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                  Upload Data
                </button>
                <button className="p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                  Create Chart
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                  AI Analysis
                </button>
                <button className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                  Export Report
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
