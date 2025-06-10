
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExcelData } from '@/pages/Index';
import { Bot, Lightbulb, TrendingUp, BarChart3, PieChart, Scatter, Activity } from 'lucide-react';

interface ChartRecommendationBotProps {
  data: ExcelData;
  onRecommendationSelect: (chartType: string, xAxis: string, yAxis: string, zAxis?: string) => void;
}

interface Recommendation {
  chartType: string;
  title: string;
  description: string;
  xAxis: string;
  yAxis: string;
  zAxis?: string;
  confidence: number;
  reasoning: string;
  icon: React.ComponentType<any>;
}

export const ChartRecommendationBot: React.FC<ChartRecommendationBotProps> = ({ 
  data, 
  onRecommendationSelect 
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeData = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a delay
    setTimeout(() => {
      const numericColumns = data.headers.filter(header => {
        return data.data.some(row => {
          const value = row[header];
          return !isNaN(Number(value)) && value !== '' && value !== null;
        });
      });

      const categoricalColumns = data.headers.filter(header => 
        !numericColumns.includes(header)
      );

      const newRecommendations: Recommendation[] = [];

      // Bar Chart Recommendation
      if (categoricalColumns.length > 0 && numericColumns.length > 0) {
        newRecommendations.push({
          chartType: 'bar',
          title: 'Bar Chart',
          description: 'Compare categories with numerical values',
          xAxis: categoricalColumns[0],
          yAxis: numericColumns[0],
          confidence: 95,
          reasoning: 'Perfect for comparing discrete categories with numerical values',
          icon: BarChart3
        });
      }

      // Line Chart Recommendation
      if (numericColumns.length >= 2) {
        const timeColumn = data.headers.find(h => 
          h.toLowerCase().includes('date') || 
          h.toLowerCase().includes('time') || 
          h.toLowerCase().includes('year')
        );
        
        newRecommendations.push({
          chartType: 'line',
          title: 'Line Chart',
          description: 'Show trends over time or continuous data',
          xAxis: timeColumn || numericColumns[0],
          yAxis: numericColumns[timeColumn ? 0 : 1],
          confidence: timeColumn ? 90 : 75,
          reasoning: timeColumn 
            ? 'Time-based data detected - ideal for trend analysis'
            : 'Good for showing relationships between continuous variables',
          icon: TrendingUp
        });
      }

      // Pie Chart Recommendation
      if (categoricalColumns.length > 0 && numericColumns.length > 0) {
        const uniqueCategories = new Set(data.data.map(row => row[categoricalColumns[0]])).size;
        if (uniqueCategories <= 10) {
          newRecommendations.push({
            chartType: 'pie',
            title: 'Pie Chart',
            description: 'Show composition and proportions',
            xAxis: categoricalColumns[0],
            yAxis: numericColumns[0],
            confidence: 80,
            reasoning: `${uniqueCategories} categories detected - perfect for showing proportions`,
            icon: PieChart
          });
        }
      }

      // Scatter Plot Recommendation
      if (numericColumns.length >= 2) {
        newRecommendations.push({
          chartType: 'scatter',
          title: 'Scatter Plot',
          description: 'Explore correlations between variables',
          xAxis: numericColumns[0],
          yAxis: numericColumns[1],
          confidence: 85,
          reasoning: 'Multiple numeric variables - great for correlation analysis',
          icon: Scatter
        });
      }

      // 3D Recommendations
      if (numericColumns.length >= 3) {
        newRecommendations.push({
          chartType: 'scatter3d',
          title: '3D Scatter Plot',
          description: 'Visualize three-dimensional relationships',
          xAxis: numericColumns[0],
          yAxis: numericColumns[1],
          zAxis: numericColumns[2],
          confidence: 70,
          reasoning: 'Three or more numeric variables - explore complex relationships in 3D',
          icon: Activity
        });
      }

      // Sort by confidence
      newRecommendations.sort((a, b) => b.confidence - a.confidence);
      
      setRecommendations(newRecommendations);
      setIsAnalyzing(false);
    }, 1500);
  };

  useEffect(() => {
    if (data.headers.length > 0) {
      analyzeData();
    }
  }, [data]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 80) return 'bg-blue-100 text-blue-800';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Chart Recommendations
            </span>
            <p className="text-sm text-slate-500 font-normal mt-1">
              Smart suggestions based on your data structure
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8 space-x-3">
            <div className="animate-spin p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-slate-700 font-medium">Analyzing your data...</p>
              <p className="text-sm text-slate-500">Finding the best chart recommendations</p>
            </div>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-8">
            <div className="p-4 bg-slate-100 rounded-xl w-fit mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-600">Upload data to get AI-powered chart recommendations</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-700">
                Found {recommendations.length} recommended visualizations
              </span>
            </div>
            
            {recommendations.map((rec, index) => {
              const IconComponent = rec.icon;
              return (
                <div
                  key={index}
                  className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-200">
                        <IconComponent className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{rec.title}</h3>
                        <p className="text-sm text-slate-600">{rec.description}</p>
                      </div>
                    </div>
                    <Badge className={`${getConfidenceColor(rec.confidence)} border-0`}>
                      {rec.confidence}% match
                    </Badge>
                  </div>
                  
                  <div className="mb-3 text-sm text-slate-600 bg-slate-50/50 p-3 rounded-lg">
                    <strong>Why this works:</strong> {rec.reasoning}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 text-xs">
                      <Badge variant="outline">X: {rec.xAxis}</Badge>
                      <Badge variant="outline">Y: {rec.yAxis}</Badge>
                      {rec.zAxis && <Badge variant="outline">Z: {rec.zAxis}</Badge>}
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => onRecommendationSelect(
                        rec.chartType, 
                        rec.xAxis, 
                        rec.yAxis, 
                        rec.zAxis
                      )}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                    >
                      Apply Chart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
