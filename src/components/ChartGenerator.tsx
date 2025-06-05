import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ExcelData } from '@/pages/Index';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter as ScatterPlot, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import Plot from 'react-plotly.js';

interface ChartGeneratorProps {
  data: ExcelData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const chartTypes = [
  { value: 'bar', label: 'Bar Chart', icon: BarChart3, is3D: false },
  { value: 'line', label: 'Line Chart', icon: TrendingUp, is3D: false },
  { value: 'pie', label: 'Pie Chart', icon: TrendingUp, is3D: false },
  { value: 'scatter', label: 'Scatter Plot', icon: TrendingUp, is3D: false },
  { value: 'area', label: 'Area Chart', icon: TrendingUp, is3D: false },
  { value: 'bar3d', label: '3D Bar Chart', icon: BarChart3, is3D: true },
  { value: 'scatter3d', label: '3D Scatter Plot', icon: TrendingUp, is3D: true },
  { value: 'surface3d', label: '3D Surface', icon: TrendingUp, is3D: true },
];

export const ChartGenerator: React.FC<ChartGeneratorProps> = ({ data }) => {
  const [chartType, setChartType] = useState<string>('bar');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const [zAxis, setZAxis] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);

  const numericColumns = data.headers.filter(header => {
    return data.data.some(row => {
      const value = row[header];
      return !isNaN(Number(value)) && value !== '' && value !== null;
    });
  });

  const selectedChartType = chartTypes.find(type => type.value === chartType);
  const is3DChart = selectedChartType?.is3D || false;

  const prepareChartData = () => {
    if (!xAxis || !yAxis) return [];

    return data.data
      .filter(row => row[xAxis] && row[yAxis] && (!is3DChart || !zAxis || row[zAxis]))
      .map(row => ({
        [xAxis]: row[xAxis],
        [yAxis]: isNaN(Number(row[yAxis])) ? 0 : Number(row[yAxis]),
        ...(is3DChart && zAxis && { [zAxis]: isNaN(Number(row[zAxis])) ? 0 : Number(row[zAxis]) })
      }));
  };

  const chartData = prepareChartData();

  const downloadChart = async () => {
    setIsDownloading(true);
    try {
      const chartElement = document.getElementById('chart-container');
      if (chartElement) {
        const canvas = await html2canvas(chartElement);
        const link = document.createElement('a');
        link.download = `${data.fileName}_${chartType}_chart.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error('Error downloading chart:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const render3DChart = () => {
    if (!xAxis || !yAxis || chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>Select X, Y{is3DChart && zAxis ? ', and Z' : ''} axes to generate 3D chart</p>
        </div>
      );
    }

    const plotData = chartData.map(item => ({
      x: item[xAxis],
      y: item[yAxis],
      z: zAxis ? item[zAxis] : 0
    }));

    switch (chartType) {
      case 'bar3d':
        return (
          <Plot
            data={[
              {
                type: 'scatter3d',
                mode: 'markers',
                x: plotData.map(d => d.x),
                y: plotData.map(d => d.y),
                z: plotData.map(d => d.z),
                marker: {
              size: 12,
              color: plotData.map(d => d.z),
              colorscale: 'Viridis',
              showscale: true
            },
            name: '3D Bar Chart'
          }
        ]}
        layout={{
          width: 800,
          height: 600,
          scene: {
            xaxis: { title: xAxis },
            yaxis: { title: yAxis },
            zaxis: { title: zAxis || 'Z' }
          },
          title: '3D Bar Chart'
        }}
      />
    );

  case 'scatter3d':
    return (
      <Plot
        data={[
          {
            type: 'scatter3d',
            mode: 'markers',
            x: plotData.map(d => d.x),
            y: plotData.map(d => d.y),
            z: plotData.map(d => d.z),
            marker: {
              size: 5,
              color: plotData.map(d => d.z),
              colorscale: 'Rainbow',
              showscale: true
            },
            name: '3D Scatter'
          }
        ]}
        layout={{
          width: 800,
          height: 600,
          scene: {
            xaxis: { title: xAxis },
            yaxis: { title: yAxis },
            zaxis: { title: zAxis || 'Z' }
          },
          title: '3D Scatter Plot'
        }}
      />
    );

  case 'surface3d':
    // For surface plot, we need to prepare data differently
    const uniqueX = [...new Set(plotData.map(d => d.x))].sort();
    const uniqueY = [...new Set(plotData.map(d => d.y))].sort();
    const zMatrix = uniqueY.map(y => 
      uniqueX.map(x => {
        const point = plotData.find(d => d.x === x && d.y === y);
        return point ? point.z : 0;
      })
    );

    return (
      <Plot
        data={[
          {
            type: 'surface',
            x: uniqueX,
            y: uniqueY,
            z: zMatrix,
            colorscale: 'Viridis',
            showscale: true
          }
        ]}
        layout={{
          width: 800,
          height: 600,
          scene: {
            xaxis: { title: xAxis },
            yaxis: { title: yAxis },
            zaxis: { title: zAxis || 'Z' }
          },
          title: '3D Surface Plot'
        }}
      />
    );

  default:
    return null;
  };
};

const renderChart = () => {
  if (is3DChart) {
    return render3DChart();
  }

  if (!xAxis || !yAxis || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Select X and Y axes to generate chart</p>
      </div>
    );
  }

  const commonProps = {
    width: 800,
    height: 400,
    data: chartData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  switch (chartType) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yAxis} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yAxis} stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );

    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData.slice(0, 10)}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={yAxis}
              nameKey={xAxis}
            >
              {chartData.slice(0, 10).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );

    case 'scatter':
      return (
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart {...commonProps}>
            <CartesianGrid />
            <XAxis type="number" dataKey={xAxis} name={xAxis} />
            <YAxis type="number" dataKey={yAxis} name={yAxis} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <ScatterPlot data={chartData} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      );

    case 'area':
      return (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={yAxis} stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
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
          <span>Chart Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
            <Select value={chartType} onValueChange={(value) => {
              setChartType(value);
              // Reset Z axis when switching between 2D and 3D
              if (!chartTypes.find(t => t.value === value)?.is3D) {
                setZAxis('');
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                {chartTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{type.label}</span>
                        {type.is3D && <Badge variant="secondary" className="text-xs">3D</Badge>}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">X-Axis</label>
            <Select value={xAxis} onValueChange={setXAxis}>
              <SelectTrigger>
                <SelectValue placeholder="Select X-axis column" />
              </SelectTrigger>
              <SelectContent>
                {data.headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Y-Axis</label>
            <Select value={yAxis} onValueChange={setYAxis}>
              <SelectTrigger>
                <SelectValue placeholder="Select Y-axis column" />
              </SelectTrigger>
              <SelectContent>
                {numericColumns.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {is3DChart && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Z-Axis</label>
              <Select value={zAxis} onValueChange={setZAxis}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Z-axis column" />
                </SelectTrigger>
                <SelectContent>
                  {numericColumns.map((header) => (
                    <SelectItem key={header} value={header}>
                      {header}
                    </SelectItem>
                  ))}
                </SelectContent>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {numericColumns.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              No numeric columns detected. Make sure your Excel file contains numeric data for Y-axis values.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {xAxis && <Badge variant="outline">X: {xAxis}</Badge>}
            {yAxis && <Badge variant="outline">Y: {yAxis}</Badge>}
            {is3DChart && zAxis && <Badge variant="outline">Z: {zAxis}</Badge>}
            {chartData.length > 0 && (
              <Badge variant="secondary">{chartData.length} data points</Badge>
            )}
          </div>
          
          {chartData.length > 0 && (
            <Button onClick={downloadChart} disabled={isDownloading}>
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download Chart'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="p-6">
        <div id="chart-container" className="w-full">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  </div>
);
};
