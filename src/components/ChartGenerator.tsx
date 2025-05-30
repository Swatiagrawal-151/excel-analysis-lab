
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ExcelData } from '@/pages/Index';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, BarChart3, LineChart as LineIcon, PieChart as PieIcon, Scatter as ScatterIcon, Area as AreaIcon } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ChartGeneratorProps {
  data: ExcelData;
}

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

const chartTypes = [
  { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
  { value: 'line', label: 'Line Chart', icon: LineIcon },
  { value: 'area', label: 'Area Chart', icon: AreaIcon },
  { value: 'pie', label: 'Pie Chart', icon: PieIcon },
  { value: 'scatter', label: 'Scatter Plot', icon: ScatterIcon },
];

export const ChartGenerator: React.FC<ChartGeneratorProps> = ({ data }) => {
  const [chartType, setChartType] = useState('bar');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  const numericColumns = data.headers.filter(header => {
    return data.data.some(row => !isNaN(Number(row[header])) && row[header] !== '');
  });

  const allColumns = data.headers;

  const generateChartData = () => {
    if (!xAxis || !yAxis) return [];
    
    return data.data
      .filter(row => row[xAxis] && row[yAxis])
      .map(row => ({
        [xAxis]: row[xAxis],
        [yAxis]: Number(row[yAxis]) || 0,
        name: row[xAxis],
        value: Number(row[yAxis]) || 0
      }))
      .slice(0, 20); // Limit to 20 items for better visualization
  };

  const chartData = generateChartData();

  const downloadChart = async () => {
    const chartElement = document.getElementById('chart-container');
    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      const link = document.createElement('a');
      link.download = `${data.fileName}_${chartType}_chart.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Please select X and Y axes to generate a chart
        </div>
      );
    }

    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yAxis} fill="#3B82F6" />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yAxis} stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey={yAxis} stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      case 'scatter':
        return (
          <ScatterChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Scatter dataKey={yAxis} fill="#3B82F6" />
          </ScatterChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Chart Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chart-type">Chart Type</Label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  {chartTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="x-axis">X-Axis</Label>
              <Select value={xAxis} onValueChange={setXAxis}>
                <SelectTrigger>
                  <SelectValue placeholder="Select X-axis column" />
                </SelectTrigger>
                <SelectContent>
                  {allColumns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="y-axis">Y-Axis</Label>
              <Select value={yAxis} onValueChange={setYAxis}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Y-axis column" />
                </SelectTrigger>
                <SelectContent>
                  {numericColumns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Generated Chart</CardTitle>
            <Button onClick={downloadChart} disabled={chartData.length === 0} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Chart</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div id="chart-container" className="w-full h-96 bg-white p-4 rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
