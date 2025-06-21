
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, PieChart, FileText, TrendingUp, Zap, Shield, Users, Globe, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Welcome = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Transform your Excel data into powerful insights with our comprehensive analytics suite.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: PieChart,
      title: "Interactive Charts",
      description: "Create stunning visualizations with 12+ chart types including bar, line, pie, and scatter plots.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "Smart Reports",
      description: "Generate automated reports with scheduling and template library for consistent formatting.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: TrendingUp,
      title: "Real-time Insights",
      description: "Monitor your data trends in real-time with live dashboards and performance metrics.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    "Upload and analyze Excel files instantly",
    "Create professional charts in minutes",
    "Schedule automated report generation",
    "Share insights with your team",
    "Export in multiple formats",
    "Secure cloud-based processing"
  ];

  const stats = [
    { number: "500K+", label: "Files Processed" },
    { number: "50K+", label: "Charts Created" },
    { number: "10K+", label: "Reports Generated" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center space-x-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl shadow-lg animate-pulse">
                  <BarChart3 className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  DataViz Pro
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
                Transform your Excel data into stunning visualizations and actionable insights with our 
                <span className="text-purple-600 font-semibold"> Figma-inspired analytics platform</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/charts">
                <Button variant="outline" size="lg" className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Explore Charts
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Powerful Features</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to turn your Excel data into compelling stories and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">Why Choose DataViz Pro?</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-slate-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
                    <PieChart className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Data?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating amazing visualizations with DataViz Pro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group">
                Start Free Today
                <Star className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">DataViz Pro</span>
          </div>
          <p className="text-slate-400">© 2024 DataViz Pro. Transforming data into insights.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
