
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExcelData } from '@/pages/Index';
import { FileText, Calendar, Hash } from 'lucide-react';

interface DataPreviewProps {
  data: ExcelData;
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
  const previewRows = data.data.slice(0, 5);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Data Preview</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{data.uploadDate.toLocaleDateString()}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Hash className="h-3 w-3" />
              <span>{data.data.length} rows</span>
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600">{data.fileName}</p>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Available Columns:</h4>
          <div className="flex flex-wrap gap-2">
            {data.headers.map((header, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {header}
              </Badge>
            ))}
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                {data.headers.map((header, index) => (
                  <TableHead key={index} className="font-medium text-gray-700">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {data.headers.map((header, colIndex) => (
                    <TableCell key={colIndex} className="text-sm">
                      {row[header] || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {data.data.length > 5 && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Showing first 5 rows of {data.data.length} total rows
          </p>
        )}
      </CardContent>
    </Card>
  );
};
