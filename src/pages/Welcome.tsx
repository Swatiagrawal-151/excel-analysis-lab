
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Upload, TrendingUp, FileText, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              DataViz Pro
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-3xl" />
        
        <main className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              Transform Your Data Into
              <br />
              <span className="text-5xl">Beautiful Insights</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Upload Excel files, create stunning visualizations, and generate comprehensive reports 
              with our AI-powered analytics platform. Perfect for teams and individuals.
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-3">
                  Start Analyzing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Platform Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Smart Upload</h3>
                <p className="text-slate-600">Drag and drop Excel files for instant processing and analysis</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Advanced Charts</h3>
                <p className="text-slate-600">Create stunning 2D and 3D visualizations with AI recommendations</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">AI Analytics</h3>
                <p className="text-slate-600">Get intelligent insights and trend analysis automatically</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Smart Reports</h3>
                <p className="text-slate-600">Generate and export professional reports automatically</p>
              </CardContent>
            </Card>
          </div>

          {/* Platform Access */}
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-slate-800 mb-4">
                Ready to Get Started?
              </CardTitle>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Join thousands of users who trust DataViz Pro for their data analysis needs. 
                Sign up with your preferred method and start creating beautiful visualizations today.
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-fit mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Multiple Login Options</h4>
                  <p className="text-slate-600 text-sm">Google, GitHub, LinkedIn, or email</p>
                </div>
                
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full w-fit mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Secure & Private</h4>
                  <p className="text-slate-600 text-sm">Your data is encrypted and protected</p>
                </div>
                
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-fit mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Instant Access</h4>
                  <p className="text-slate-600 text-sm">Start analyzing immediately after signup</p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-12 py-4 text-lg">
                    Access Platform Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Welcome;
