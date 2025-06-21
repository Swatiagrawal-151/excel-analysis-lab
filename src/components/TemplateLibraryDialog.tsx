
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, BarChart3, TrendingUp, Users, DollarSign, Eye, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TemplateLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TemplateLibraryDialog = ({ open, onOpenChange }: TemplateLibraryDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'Sales Performance Dashboard',
      description: 'Comprehensive sales metrics with revenue tracking, conversion rates, and team performance.',
      category: 'sales',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      features: ['Revenue Analysis', 'Conversion Tracking', 'Team Metrics'],
      downloads: 1247
    },
    {
      id: 2,
      name: 'Marketing Analytics Report',
      description: 'Track campaign performance, ROI, and customer acquisition metrics.',
      category: 'marketing',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      features: ['Campaign ROI', 'Lead Generation', 'Customer Acquisition'],
      downloads: 892
    },
    {
      id: 3,
      name: 'Financial Summary Template',
      description: 'Monthly financial overview with profit/loss, expenses, and budget analysis.',
      category: 'finance',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      features: ['P&L Statement', 'Budget Analysis', 'Expense Tracking'],
      downloads: 1534
    },
    {
      id: 4,
      name: 'Customer Behavior Analysis',
      description: 'Deep dive into user engagement, retention, and satisfaction metrics.',
      category: 'analytics',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      features: ['User Engagement', 'Retention Analysis', 'Satisfaction Scores'],
      downloads: 674
    },
    {
      id: 5,
      name: 'Website Traffic Report',
      description: 'Monitor website performance, visitor analytics, and conversion funnels.',
      category: 'analytics',
      icon: Eye,
      color: 'from-indigo-500 to-purple-500',
      features: ['Traffic Analysis', 'Conversion Funnels', 'User Journey'],
      downloads: 1089
    },
    {
      id: 6,
      name: 'Executive Summary Template',
      description: 'High-level overview template for C-suite presentations and board meetings.',
      category: 'executive',
      icon: FileText,
      color: 'from-gray-500 to-slate-500',
      features: ['KPI Overview', 'Strategic Metrics', 'Executive Insights'],
      downloads: 756
    }
  ];

  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'executive', label: 'Executive' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: typeof templates[0]) => {
    toast({
      title: "Template Selected",
      description: `${template.name} template has been loaded and ready for customization.`,
    });
    
    console.log('Using template:', template);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <span>Template Library</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="text-xs"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card key={template.id} className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${template.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-slate-900">
                            {template.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {template.category}
                            </Badge>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Download className="h-3 w-3" />
                              <span>{template.downloads}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4 text-sm">
                      {template.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-2">Key Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleUseTemplate(template)}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm"
                        >
                          Use Template
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
