
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as XLSX from 'xlsx';
import { ExcelData } from '@/pages/Index';

interface FileUploadProps {
  onFileUploaded: (data: ExcelData) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processExcelFile = useCallback((file: File) => {
    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (jsonData.length === 0) {
          throw new Error('The Excel file appears to be empty');
        }

        const headers = jsonData[0] as string[];
        const rows = jsonData.slice(1).filter((row: any) => Array.isArray(row) && row.length > 0);

        const processedData: ExcelData = {
          fileName: file.name,
          headers: headers.filter(header => header !== undefined && header !== ''),
          data: rows.map((row: any) => {
            const rowObject: any = {};
            headers.forEach((header, index) => {
              if (header) {
                rowObject[header] = row[index] || '';
              }
            });
            return rowObject;
          }),
          uploadDate: new Date(),
          id: Date.now().toString()
        };

        onFileUploaded(processedData);
      } catch (err) {
        setError(`Error processing file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  }, [onFileUploaded]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      processExcelFile(file);
    }
  }, [processExcelFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  });

  return (
    <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
      <CardContent className="p-8">
        <div {...getRootProps()} className="text-center cursor-pointer">
          <input {...getInputProps()} />
          
          <div className="mb-4">
            {isLoading ? (
              <div className="animate-spin mx-auto h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
            ) : (
              <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
            )}
          </div>
          
          <div className="space-y-2">
            {isDragActive ? (
              <p className="text-lg font-medium text-blue-600">Drop your Excel file here...</p>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-700">
                  Drag & drop your Excel file here
                </p>
                <p className="text-gray-500">or click to browse</p>
              </>
            )}
            
            <div className="flex justify-center mt-4">
              <Button variant="outline" disabled={isLoading}>
                <Upload className="mr-2 h-4 w-4" />
                {isLoading ? 'Processing...' : 'Upload Excel File'}
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mt-2">
              Supports .xlsx and .xls files up to 10MB
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
