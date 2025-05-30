
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExcelData } from '@/pages/Index';
import { FileText, Calendar, Hash, Eye } from 'lucide-react';

interface UploadHistoryProps {
  history: ExcelData[];
  onSelectData: (data: ExcelData) => void;
}

export const UploadHistory: React.FC<UploadHistoryProps> = ({ history, onSelectData }) => {
  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No uploads yet</h3>
          <p className="text-gray-500">Upload your first Excel file to see it here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Upload History</h2>
        <Badge variant="secondary">{history.length} files</Badge>
      </div>
      
      <div className="grid gap-4">
        {history.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">{item.fileName}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{item.uploadDate.toLocaleDateString()}</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Hash className="h-3 w-3" />
                      <span>{item.data.length} rows</span>
                    </Badge>
                    <Badge variant="outline">
                      {item.headers.length} columns
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Columns: </span>
                    {item.headers.slice(0, 3).join(', ')}
                    {item.headers.length > 3 && ` +${item.headers.length - 3} more`}
                  </div>
                </div>
                
                <Button onClick={() => onSelectData(item)} className="ml-4">
                  <Eye className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
