
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Share2, Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { toast } from '@/hooks/use-toast';
import { CreateReportDialog } from '@/components/CreateReportDialog';
import { ScheduleReportDialog } from '@/components/ScheduleReportDialog';
import { TemplateLibraryDialog } from '@/components/TemplateLibraryDialog';

const Reports = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);

  const reports = [
    {
      id: "monthly-analytics",
      title: "Monthly Analytics Report",
      description: "Comprehensive analysis of data trends and insights",
      date: "December 2024",
      status: "Published",
      downloads: 247,
      type: "Monthly"
    },
    {
      id: "q4-performance",
      title: "Q4 Performance Summary",
      description: "Quarterly performance metrics and KPI analysis",
      date: "Q4 2024",
      status: "Draft",
      downloads: 89,
      type: "Quarterly"
    },
    {
      id: "customer-behavior",
      title: "Customer Behavior Analysis",
      description: "Deep dive into customer interaction patterns",
      date: "November 2024",
      status: "Published",
      downloads: 156,
      type: "Custom"
    },
    {
      id: "sales-performance",
      title: "Sales Performance Review",
      description: "Analysis of sales metrics and revenue trends",
      date: "October 2024",
      status: "Published",
      downloads: 198,
      type: "Monthly"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  const downloadReportAsPDF = async (report: typeof reports[0]) => {
    try {
      // Create a temporary div with report content for PDF generation
      const reportElement = document.createElement('div');
      reportElement.style.width = '800px';
      reportElement.style.padding = '40px';
      reportElement.style.backgroundColor = 'white';
      reportElement.style.fontFamily = 'Arial, sans-serif';
      
      reportElement.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #6366f1; font-size: 28px; margin-bottom: 10px;">${report.title}</h1>
          <p style="color: #64748b; font-size: 16px;">${report.description}</p>
          <p style="color: #64748b; font-size: 14px; margin-top: 10px;">Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #334155; font-size: 20px; margin-bottom: 15px;">Report Details</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <strong>Report Type:</strong> ${report.type}<br>
              <strong>Period:</strong> ${report.date}<br>
              <strong>Status:</strong> ${report.status}
            </div>
            <div>
              <strong>Downloads:</strong> ${report.downloads}<br>
              <strong>Generated:</strong> ${new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #334155; font-size: 20px; margin-bottom: 15px;">Executive Summary</h2>
          <p style="line-height: 1.6; color: #475569;">
            This report provides comprehensive insights into the performance metrics and key indicators 
            for the specified period. The analysis includes detailed breakdowns of various data points, 
            trends, and actionable recommendations for future strategic decisions.
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #334155; font-size: 20px; margin-bottom: 15px;">Key Metrics</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
              <strong>Performance Score:</strong> 94.2%
            </div>
            <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
              <strong>Growth Rate:</strong> +12.5%
            </div>
            <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
              <strong>Efficiency:</strong> 87.3%
            </div>
            <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
              <strong>Satisfaction:</strong> 4.8/5.0
            </div>
          </div>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px;">
          Generated by Analytics Platform | ${new Date().toLocaleDateString()}
        </div>
      `;
      
      // Temporarily add to DOM for rendering
      document.body.appendChild(reportElement);
      
      // Generate canvas from HTML
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      // Remove temporary element
      document.body.removeChild(reportElement);
      
      // Create PDF-like image download
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${report.title.replace(/\s+/g, '_')}_Report.png`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Complete",
        description: `${report.title} has been downloaded successfully.`,
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Reports
          </h1>
          <p className="text-slate-600">Generate and manage your analytics reports.</p>
        </div>

        <div className="mb-8">
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setCreateDialogOpen(true)}
                  className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col items-center space-y-3"
                >
                  <FileText className="h-8 w-8" />
                  <span className="font-medium">Create New Report</span>
                </button>
                <button 
                  onClick={() => setScheduleDialogOpen(true)}
                  className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col items-center space-y-3"
                >
                  <Calendar className="h-8 w-8" />
                  <span className="font-medium">Schedule Report</span>
                </button>
                <button 
                  onClick={() => setTemplateDialogOpen(true)}
                  className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col items-center space-y-3"
                >
                  <BarChart3 className="h-8 w-8" />
                  <span className="font-medium">Template Library</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">All Reports</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-slate-800 mb-1">
                          {report.title}
                        </CardTitle>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{report.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{report.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{report.downloads} downloads</span>
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      onClick={() => downloadReportAsPDF(report)}
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </button>
                    <button className="py-2 px-4 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-2">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CreateReportDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
      <ScheduleReportDialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen} />
      <TemplateLibraryDialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen} />
    </div>
  );
};

export default Reports;
