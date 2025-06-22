
import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DataPreview } from '@/components/DataPreview';
import { ChartGenerator } from '@/components/ChartGenerator';
import { UploadHistory } from '@/components/UploadHistory';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Figma, BarChart3, Upload, History } from 'lucide-react';

export interface ExcelData {
  fileName: string;
  headers: string[];
  data: any[];
  uploadDate: Date;
  id: string;
}

const Index = () => {
  const [currentData, setCurrentData] = useState<ExcelData | null>(null);
  const [uploadHistory, setUploadHistory] = useState<ExcelData[]>([]);

  const handleFileUploaded = (data: ExcelData) => {
    setCurrentData(data);
    setUploadHistory(prev => [data, ...prev]);
  };

  const handleSelectFromHistory = (data: ExcelData) => {
    setCurrentData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Header />
      
      {/* Hero Section with Figma-inspired design */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-3xl" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-15 blur-3xl animate-pulse" />
        
        <main className="relative container mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-2xl">
                <Figma className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              Excel Data Analytics
              <br />
              <span className="text-4xl">Platform</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your Excel data into stunning visualizations with our Figma-inspired analytics platform. 
              Upload, analyze, and create beautiful charts with ease.
            </p>
          </div>

          {/* Figma-style floating cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Upload & Process</h3>
                <p className="text-slate-600">Drag and drop your Excel files for instant processing</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Generate Charts</h3>
                <p className="text-slate-600">Create stunning 2D and 3D visualizations</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <History className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Track History</h3>
                <p className="text-slate-600">Access your previous uploads and analyses</p>
              </CardContent>
            </Card>
          </div>

          {/* Main tabs with Figma-inspired design */}
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl">
            <CardContent className="p-8">
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100/50 p-2 rounded-2xl">
                  <TabsTrigger 
                    value="upload" 
                    className="text-sm font-medium rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-200"
                  >
                    Upload & Analyze
                  </TabsTrigger>
                  <TabsTrigger 
                    value="charts" 
                    className="text-sm font-medium rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-200"
                  >
                    Generate Charts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="text-sm font-medium rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-200"
                  >
                    Upload History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-8">
                  <FileUpload onFileUploaded={handleFileUploaded} />
                  {currentData && (
                    <div className="animate-fade-in">
                      <DataPreview data={currentData} />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="charts">
                  {currentData ? (
                    <div className="animate-fade-in">
                      <ChartGenerator data={currentData} />
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="p-6 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl w-fit mx-auto mb-6">
                        <BarChart3 className="h-16 w-16 text-slate-400 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-700 mb-2">No Data Available</h3>
                      <p className="text-slate-500">Please upload an Excel file first to generate beautiful charts</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <div className="animate-fade-in">
                    <UploadHistory 
                      history={uploadHistory} 
                      onSelectData={handleSelectFromHistory}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Index;
