
import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, LineChart, PieChart, Zap, Plus, Eye } from 'lucide-react';

const Charts = () => {
  const chartTemplates = [
    {
      name: "Bar Chart",
      description: "Compare categories with numerical values",
      icon: BarChart3,
      color: "from-blue-500 to-indigo-500",
      usage: "156 times used"
    },
    {
      name: "Line Chart", 
      description: "Show trends over time",
      icon: LineChart,
      color: "from-green-500 to-teal-500",
      usage: "89 times used"
    },
    {
      name: "Pie Chart",
      description: "Display data proportions",
      icon: PieChart,
      color: "from-purple-500 to-pink-500",
      usage: "67 times used"
    },
    {
      name: "Scatter Plot",
      description: "Explore correlations",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      usage: "34 times used"
    }
  ];

  const recentCharts = [
    { name: "Q4 Sales Performance", type: "Bar Chart", created: "2 hours ago", views: 23 },
    { name: "Website Traffic Trends", type: "Line Chart", created: "1 day ago", views: 45 },
    { name: "Market Share Analysis", type: "Pie Chart", created: "3 days ago", views: 67 },
    { name: "Customer Satisfaction", type: "Scatter Plot", created: "1 week ago", views: 89 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Chart Gallery
          </h1>
          <p className="text-slate-600">Explore chart types and manage your visualizations.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Chart Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chartTemplates.map((template, index) => {
              const IconComponent = template.icon;
              return (
                <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${template.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-800">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                    <p className="text-xs text-slate-500">{template.usage}</p>
                    <button className={`mt-4 w-full py-2 px-4 bg-gradient-to-r ${template.color} text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2`}>
                      <Plus className="h-4 w-4" />
                      <span>Create</span>
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Recent Charts</h2>
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentCharts.map((chart, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">{chart.name}</h3>
                        <p className="text-sm text-slate-500">{chart.type} • {chart.created}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">{chart.views}</span>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Charts;
