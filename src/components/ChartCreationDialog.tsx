
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BarChart3, LineChart, PieChart, Zap, TrendingUp, Target, Activity, Map, Calendar, Users, Palette, Download, Save, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChartCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTemplate: {
    name: string;
    icon: any;
    color: string;
    description: string;
  } | null;
}

export const ChartCreationDialog = ({ open, onOpenChange, selectedTemplate }: ChartCreationDialogProps) => {
  const [chartName, setChartName] = useState('');
  const [chartDescription, setChartDescription] = useState('');
  const [colorScheme, setColorScheme] = useState('default');
  const [chartSize, setChartSize] = useState('medium');
  const [animationType, setAnimationType] = useState('smooth');
  const [dataSource, setDataSource] = useState('');

  const colorSchemes = [
    { value: 'default', label: 'Default Blue', colors: ['#0088FE', '#00C49F', '#FFBB28'] },
    { value: 'purple', label: 'Purple Gradient', colors: ['#8884D8', '#82CA9D', '#FFC658'] },
    { value: 'green', label: 'Green Nature', colors: ['#00C49F', '#FFBB28', '#FF8042'] },
    { value: 'sunset', label: 'Sunset Orange', colors: ['#FF8042', '#FFBB28', '#00C49F'] },
    { value: 'ocean', label: 'Ocean Blue', colors: ['#0088FE', '#8884D8', '#82CA9D'] },
    { value: 'corporate', label: 'Corporate Gray', colors: ['#8E8E93', '#6D6D70', '#48484A'] }
  ];

  const chartSizes = [
    { value: 'small', label: 'Small (400x300)', width: 400, height: 300 },
    { value: 'medium', label: 'Medium (600x400)', width: 600, height: 400 },
    { value: 'large', label: 'Large (800x500)', width: 800, height: 500 },
    { value: 'xlarge', label: 'Extra Large (1000x600)', width: 1000, height: 600 }
  ];

  const animationTypes = [
    { value: 'smooth', label: 'Smooth Transition' },
    { value: 'bounce', label: 'Bounce Effect' },
    { value: 'fade', label: 'Fade In' },
    { value: 'scale', label: 'Scale Up' },
    { value: 'none', label: 'No Animation' }
  ];

  const sampleDataSources = [
    'Sales Data 2024.xlsx',
    'Marketing Analytics.csv',
    'Customer Survey Results.xlsx',
    'Financial Reports Q4.csv',
    'Website Traffic Data.xlsx'
  ];

  const handleCreateChart = () => {
    if (!chartName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a chart name.",
        variant: "destructive"
      });
      return;
    }

    const selectedSize = chartSizes.find(size => size.value === chartSize);
    const selectedColors = colorSchemes.find(scheme => scheme.value === colorScheme);

    toast({
      title: "Chart Created Successfully!",
      description: `${selectedTemplate?.name} "${chartName}" has been created with ${selectedColors?.label} color scheme.`,
    });

    console.log('Creating chart with settings:', {
      name: chartName,
      description: chartDescription,
      template: selectedTemplate?.name,
      colorScheme: selectedColors,
      size: selectedSize,
      animation: animationType,
      dataSource
    });

    // Reset form
    setChartName('');
    setChartDescription('');
    setColorScheme('default');
    setChartSize('medium');
    setAnimationType('smooth');
    setDataSource('');
    
    onOpenChange(false);
  };

  const handlePreview = () => {
    toast({
      title: "Preview Mode",
      description: "Chart preview would open in a new window with your current settings.",
    });
  };

  if (!selectedTemplate) return null;

  const IconComponent = selectedTemplate.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedTemplate.color}`}>
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            <span>Create {selectedTemplate.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Chart Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="chartName">Chart Name *</Label>
                  <Input
                    id="chartName"
                    value={chartName}
                    onChange={(e) => setChartName(e.target.value)}
                    placeholder="Enter chart name..."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="chartDescription">Description</Label>
                  <Textarea
                    id="chartDescription"
                    value={chartDescription}
                    onChange={(e) => setChartDescription(e.target.value)}
                    placeholder="Describe what this chart will show..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="dataSource">Data Source</Label>
                  <Select value={dataSource} onValueChange={setDataSource}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select data source..." />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleDataSources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Styling Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {colorSchemes.map((scheme) => (
                      <div
                        key={scheme.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          colorScheme === scheme.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setColorScheme(scheme.value)}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {scheme.colors.map((color, index) => (
                              <div
                                key={index}
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{scheme.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="chartSize">Chart Size</Label>
                  <Select value={chartSize} onValueChange={setChartSize}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chartSizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="animationType">Animation</Label>
                  <Select value={animationType} onValueChange={setAnimationType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {animationTypes.map((animation) => (
                        <SelectItem key={animation.value} value={animation.value}>
                          {animation.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview & Template Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Template Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedTemplate.color}`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedTemplate.name}</h3>
                    <p className="text-gray-600">{selectedTemplate.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Badge variant="outline">Professional Template</Badge>
                  <Badge variant="outline">Customizable</Badge>
                  <Badge variant="outline">Export Ready</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chart Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${selectedTemplate.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    {chartName || 'Your Chart'} preview will appear here
                  </p>
                  <div className="flex space-x-2 justify-center">
                    {colorSchemes.find(s => s.value === colorScheme)?.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleCreateChart} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Save className="h-4 w-4 mr-2" />
              Create Chart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
