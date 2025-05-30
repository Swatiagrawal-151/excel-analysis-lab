
import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DataPreview } from '@/components/DataPreview';
import { ChartGenerator } from '@/components/ChartGenerator';
import { UploadHistory } from '@/components/UploadHistory';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Excel Data Analytics Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your Excel files, analyze data with interactive charts, and generate downloadable visualizations
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upload" className="text-sm font-medium">
              Upload & Analyze
            </TabsTrigger>
            <TabsTrigger value="charts" className="text-sm font-medium">
              Generate Charts
            </TabsTrigger>
            <TabsTrigger value="history" className="text-sm font-medium">
              Upload History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <FileUpload onFileUploaded={handleFileUploaded} />
            {currentData && <DataPreview data={currentData} />}
          </TabsContent>

          <TabsContent value="charts">
            {currentData ? (
              <ChartGenerator data={currentData} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Please upload an Excel file first to generate charts</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <UploadHistory 
              history={uploadHistory} 
              onSelectData={handleSelectFromHistory}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
