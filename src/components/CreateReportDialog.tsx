
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, FileText, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface CreateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateReportDialog = ({ open, onOpenChange }: CreateReportDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    period: '',
    dataSource: '',
    includeCharts: true,
    includeMetrics: true
  });
  const [selectedDate, setSelectedDate] = useState<Date>();

  const reportTypes = [
    { value: 'analytics', label: 'Analytics Report', icon: BarChart3 },
    { value: 'performance', label: 'Performance Report', icon: TrendingUp },
    { value: 'custom', label: 'Custom Report', icon: FileText },
    { value: 'summary', label: 'Summary Report', icon: PieChart }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in the required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate report creation
    const newReport = {
      id: `report-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      period: formData.period,
      status: 'Draft',
      createdAt: new Date().toISOString(),
      scheduledDate: selectedDate?.toISOString()
    };

    console.log('Creating report:', newReport);
    
    toast({
      title: "Report Created Successfully",
      description: `${formData.title} has been created and saved as draft.`,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      type: '',
      period: '',
      dataSource: '',
      includeCharts: true,
      includeMetrics: true
    });
    setSelectedDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Create New Report</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Report Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter report title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Report Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this report will contain..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Time Period</Label>
              <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataSource">Data Source</Label>
            <Select value={formData.dataSource} onValueChange={(value) => setFormData({ ...formData, dataSource: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select data source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="analytics">Analytics Dashboard</SelectItem>
                <SelectItem value="sales">Sales Database</SelectItem>
                <SelectItem value="marketing">Marketing Metrics</SelectItem>
                <SelectItem value="finance">Financial Data</SelectItem>
                <SelectItem value="custom">Custom Dataset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Report Options</Label>
            <div className="flex flex-col space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.includeCharts}
                  onChange={(e) => setFormData({ ...formData, includeCharts: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Include charts and visualizations</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.includeMetrics}
                  onChange={(e) => setFormData({ ...formData, includeMetrics: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Include key metrics summary</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500">
              Create Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
