
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Download, Share2, Edit, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChartViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chart: {
    name: string;
    type: string;
    created: string;
    views: number;
  } | null;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// Sample data for demo purposes
const sampleData = [
  { name: 'Jan', value: 4000, sales: 2400 },
  { name: 'Feb', value: 3000, sales: 1398 },
  { name: 'Mar', value: 2000, sales: 9800 },
  { name: 'Apr', value: 2780, sales: 3908 },
  { name: 'May', value: 1890, sales: 4800 },
  { name: 'Jun', value: 2390, sales: 3800 },
];

export const ChartViewDialog = ({ open, onOpenChange, chart }: ChartViewDialogProps) => {
  if (!chart) return null;

  const getChartIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bar chart':
        return BarChart3;
      case 'line chart':
        return LineChartIcon;
      case 'pie chart':
        return PieChartIcon;
      default:
        return BarChart3;
    }
  };

  const renderChart = () => {
    switch (chart.type.toLowerCase()) {
      case 'bar chart':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line chart':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie chart':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={sampleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {sampleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'scatter plot':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `${chart.name} is being downloaded as PNG.`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Copied",
      description: "Chart share link has been copied to clipboard.",
    });
  };

  const handleEdit = () => {
    toast({
      title: "Edit Mode",
      description: "Opening chart editor...",
    });
    onOpenChange(false);
  };

  const IconComponent = getChartIcon(chart.type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl">{chart.name}</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{chart.type}</Badge>
                  <Badge variant="secondary">Created {chart.created}</Badge>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{chart.views} views</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="bg-white rounded-lg">
                {renderChart()}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Chart Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span>{chart.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>{chart.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span>{chart.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant="secondary" className="text-xs">Published</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Data Source</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Source:</span>
                    <span>Excel File</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Records:</span>
                    <span>{sampleData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span>Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Load Time:</span>
                    <span>1.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span>245 KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span>SVG</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
