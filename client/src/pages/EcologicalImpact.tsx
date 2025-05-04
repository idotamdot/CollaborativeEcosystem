import React, { useState } from 'react';
import { 
  Leaf, 
  Wind, 
  Droplets, 
  Sun, 
  Truck, 
  Recycle, 
  BarChart3, 
  LineChart, 
  PieChart,
  Lightbulb,
  Flame,
  Factory,
  Trees,
  Download,
  Calendar,
  Upload,
  HelpCircle,
  AlertCircle,
  Info,
  Check,
  X,
  PlusCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, addDays, subMonths } from 'date-fns';

interface EcoMetric {
  id: string;
  name: string;
  category: 'carbon' | 'water' | 'waste' | 'energy' | 'biodiversity' | 'materials';
  value: number;
  unit: string;
  target: number;
  previousValue: number;
  improvement: number;
  icon: React.ReactNode;
}

interface Project {
  id: string;
  name: string;
  metrics: EcoMetric[];
  ecoScore: number;
  lastUpdated: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'carbon' | 'water' | 'waste' | 'energy' | 'biodiversity' | 'materials';
  difficulty: 'easy' | 'moderate' | 'challenging';
  estimatedSavings: string;
  implemented: boolean;
}

interface GoalData {
  id: string;
  title: string;
  description: string;
  category: 'carbon' | 'water' | 'waste' | 'energy' | 'biodiversity' | 'materials';
  targetDate: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  progress: number;
}

interface Report {
  id: string;
  title: string;
  date: string;
  summary: string;
  score: number;
  downloadUrl: string;
}

// Mock data for the ecological metrics
const ecoMetrics: EcoMetric[] = [
  {
    id: 'm1',
    name: 'Carbon Footprint',
    category: 'carbon',
    value: 12.5,
    unit: 'tons CO2e',
    target: 10,
    previousValue: 15.2,
    improvement: 17.8,
    icon: <Flame className="h-5 w-5 text-orange-500" />
  },
  {
    id: 'm2',
    name: 'Water Usage',
    category: 'water',
    value: 865,
    unit: 'gallons/day',
    target: 750,
    previousValue: 920,
    improvement: 6,
    icon: <Droplets className="h-5 w-5 text-blue-500" />
  },
  {
    id: 'm3',
    name: 'Waste Generation',
    category: 'waste',
    value: 245,
    unit: 'kg/month',
    target: 200,
    previousValue: 320,
    improvement: 23.4,
    icon: <Recycle className="h-5 w-5 text-green-500" />
  },
  {
    id: 'm4',
    name: 'Energy Consumption',
    category: 'energy',
    value: 1250,
    unit: 'kWh/month',
    target: 1000,
    previousValue: 1350,
    improvement: 7.4,
    icon: <Lightbulb className="h-5 w-5 text-yellow-500" />
  },
  {
    id: 'm5',
    name: 'Biodiversity Score',
    category: 'biodiversity',
    value: 68,
    unit: 'index',
    target: 75,
    previousValue: 62,
    improvement: 9.7,
    icon: <Trees className="h-5 w-5 text-emerald-500" />
  },
  {
    id: 'm6',
    name: 'Sustainable Materials',
    category: 'materials',
    value: 72,
    unit: '%',
    target: 85,
    previousValue: 64,
    improvement: 12.5,
    icon: <Factory className="h-5 w-5 text-purple-500" />
  },
];

// Mock projects with eco metrics
const projects: Project[] = [
  {
    id: 'p1',
    name: 'Urban Garden Collective',
    metrics: ecoMetrics,
    ecoScore: 78,
    lastUpdated: '2024-05-01',
  },
  {
    id: 'p2',
    name: 'Renewable Energy Co-op',
    metrics: ecoMetrics.map(m => ({...m, value: m.value * 0.85, improvement: m.improvement * 1.2})),
    ecoScore: 85,
    lastUpdated: '2024-04-28',
  },
  {
    id: 'p3',
    name: 'Sustainable Housing Initiative',
    metrics: ecoMetrics.map(m => ({...m, value: m.value * 1.1, improvement: m.improvement * 0.9})),
    ecoScore: 72,
    lastUpdated: '2024-05-02',
  },
];

// Mock recommendations
const recommendations: Recommendation[] = [
  {
    id: 'r1',
    title: 'Install Solar Panels',
    description: 'Adding solar panels to your facility can significantly reduce carbon emissions and energy costs.',
    impact: 'high',
    category: 'energy',
    difficulty: 'moderate',
    estimatedSavings: '~30% on energy costs, 5 tons of CO2 annually',
    implemented: false
  },
  {
    id: 'r2',
    title: 'Implement Water Recycling System',
    description: 'Recycling greywater for irrigation and non-potable uses can reduce water consumption dramatically.',
    impact: 'high',
    category: 'water',
    difficulty: 'moderate',
    estimatedSavings: '200-300 gallons/day',
    implemented: false
  },
  {
    id: 'r3',
    title: 'Switch to LED Lighting',
    description: 'Replace all conventional lighting with energy-efficient LED alternatives.',
    impact: 'medium',
    category: 'energy',
    difficulty: 'easy',
    estimatedSavings: '10-15% on energy costs',
    implemented: true
  },
  {
    id: 'r4',
    title: 'Implement Composting Program',
    description: 'Start a composting program to reduce waste and create nutrient-rich soil for gardens.',
    impact: 'medium',
    category: 'waste',
    difficulty: 'easy',
    estimatedSavings: '30-40% reduction in waste to landfill',
    implemented: false
  },
  {
    id: 'r5',
    title: 'Plant Native Species',
    description: 'Replace conventional landscaping with native plant species to improve biodiversity and reduce water usage.',
    impact: 'medium',
    category: 'biodiversity',
    difficulty: 'easy',
    estimatedSavings: '50% reduction in landscape water usage',
    implemented: false
  },
  {
    id: 'r6',
    title: 'Source Local Materials',
    description: 'Establish partnerships with local suppliers to reduce transportation emissions and support the local economy.',
    impact: 'medium',
    category: 'carbon',
    difficulty: 'moderate',
    estimatedSavings: '2 tons of CO2 annually from reduced transportation',
    implemented: false
  },
];

// Mock sustainability goals
const goals: GoalData[] = [
  {
    id: 'g1',
    title: 'Zero Waste Initiative',
    description: 'Achieve zero waste to landfill by implementing comprehensive recycling and composting programs.',
    category: 'waste',
    targetDate: '2025-12-31',
    currentValue: 245,
    targetValue: 0,
    unit: 'kg/month',
    progress: 68
  },
  {
    id: 'g2',
    title: 'Carbon Neutrality',
    description: 'Achieve carbon neutrality through emissions reductions and carbon offsets.',
    category: 'carbon',
    targetDate: '2026-06-30',
    currentValue: 12.5,
    targetValue: 0,
    unit: 'tons CO2e',
    progress: 45
  },
  {
    id: 'g3',
    title: '100% Renewable Energy',
    description: 'Transition to 100% renewable energy sources for all operations.',
    category: 'energy',
    targetDate: '2025-09-30',
    currentValue: 70,
    targetValue: 100,
    unit: '%',
    progress: 70
  }
];

// Mock reports
const reports: Report[] = [
  {
    id: 'rep1',
    title: 'Q1 2024 Sustainability Report',
    date: '2024-03-31',
    summary: 'Quarterly assessment of ecological impact and sustainability initiatives.',
    score: 72,
    downloadUrl: '#'
  },
  {
    id: 'rep2',
    title: 'Annual Ecological Impact Report 2023',
    date: '2023-12-31',
    summary: 'Comprehensive analysis of ecological footprint and sustainability performance for the past year.',
    score: 65,
    downloadUrl: '#'
  },
  {
    id: 'rep3',
    title: 'Water Conservation Initiative Assessment',
    date: '2024-02-15',
    summary: 'Focused report on water usage reduction efforts and results.',
    score: 82,
    downloadUrl: '#'
  }
];

const EcologicalImpact: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('p1');
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false);
  const [showNewMetricDialog, setShowNewMetricDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  
  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];
  
  const getMetricProgressColor = (metric: EcoMetric) => {
    const ratio = metric.value / metric.target;
    
    // For metrics where lower is better (carbon, water, waste, energy)
    if (['carbon', 'water', 'waste', 'energy'].includes(metric.category)) {
      if (ratio > 1.2) return "bg-red-500";
      if (ratio > 1) return "bg-yellow-500";
      return "bg-green-500";
    }
    
    // For metrics where higher is better (biodiversity score, sustainable materials)
    if (ratio < 0.8) return "bg-red-500";
    if (ratio < 1) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const getRecommendationImpactColor = (impact: string) => {
    switch(impact) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-slate-600';
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'carbon': return <Flame className="h-5 w-5 text-orange-500" />;
      case 'water': return <Droplets className="h-5 w-5 text-blue-500" />;
      case 'waste': return <Recycle className="h-5 w-5 text-green-500" />;
      case 'energy': return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'biodiversity': return <Trees className="h-5 w-5 text-emerald-500" />;
      case 'materials': return <Factory className="h-5 w-5 text-purple-500" />;
      default: return <Leaf className="h-5 w-5 text-green-500" />;
    }
  };
  
  const getImprovementLabel = (improvement: number) => {
    return (
      <span className={improvement > 0 ? 'text-green-600' : 'text-red-600'}>
        {improvement > 0 ? '↑' : '↓'} {Math.abs(improvement).toFixed(1)}%
      </span>
    );
  };
  
  const handleImplementRecommendation = (id: string) => {
    // In a real app, this would update the database
    console.log(`Implementing recommendation ${id}`);
  };
  
  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'carbon': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'water': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'waste': return 'bg-green-100 text-green-800 border-green-200';
      case 'energy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'biodiversity': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'materials': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };
  
  const getDifficultyBadgeColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'challenging': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-500 mb-2">
          Ecological Impact Assessment
        </h1>
        <p className="text-slate-600 max-w-3xl">
          Measure, track, and improve the ecological footprint of your collaborative projects. 
          Set sustainability goals, get recommendations, and generate comprehensive reports.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-3/4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Assessment</CardTitle>
                  <CardDescription>
                    Select a project to view its ecological impact
                  </CardDescription>
                </div>
                <Select
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="dashboard" onValueChange={setCurrentTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics Detail</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="goals">Sustainability Goals</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Ecological Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <div className="w-24 h-24 rounded-full flex items-center justify-center border-8 border-green-100 bg-white">
                            <span className={`text-3xl font-bold ${getScoreColor(currentProject.ecoScore)}`}>
                              {currentProject.ecoScore}
                            </span>
                          </div>
                          <div className="ml-6">
                            <div className="text-sm text-slate-500 mb-1">Last updated: {currentProject.lastUpdated}</div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="text-center">
                                <div className="text-xs uppercase text-slate-500">Carbon</div>
                                <div className="font-semibold text-sm">B+</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs uppercase text-slate-500">Water</div>
                                <div className="font-semibold text-sm">A-</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs uppercase text-slate-500">Energy</div>
                                <div className="font-semibold text-sm">B</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Improvement Areas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {currentProject.metrics
                            .sort((a, b) => (a.value / a.target) - (b.value / b.target))
                            .slice(0, 3)
                            .map(metric => (
                              <div key={metric.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {metric.icon}
                                  <span className="ml-2 text-sm">{metric.name}</span>
                                </div>
                                <Badge variant="outline" className={getCategoryBadgeColor(metric.category)}>
                                  Priority
                                </Badge>
                              </div>
                            ))
                          }
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-3">Key Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentProject.metrics.map(metric => (
                      <Card key={metric.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium flex items-center">
                              {metric.icon}
                              <span className="ml-2">{metric.name}</span>
                            </CardTitle>
                            <Badge variant="outline" className={getCategoryBadgeColor(metric.category)}>
                              {metric.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold mb-1">
                            {metric.value} <span className="text-sm font-normal text-slate-500">{metric.unit}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                            <span>Target: {metric.target} {metric.unit}</span>
                            <span>{getImprovementLabel(metric.improvement)}</span>
                          </div>
                          <Progress 
                            value={
                              ['biodiversity', 'materials'].includes(metric.category)
                                ? (metric.value / metric.target) * 100
                                : (1 - metric.value / metric.target) * 100
                            } 
                            className={`h-1.5 ${getMetricProgressColor(metric)}`} 
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="metrics" className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">All Ecological Metrics</h3>
                    <Button onClick={() => setShowNewMetricDialog(true)}>Add Metric</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      {currentProject.metrics.map(metric => (
                        <AccordionItem key={metric.id} value={metric.id}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center justify-between w-full pr-4">
                              <div className="flex items-center">
                                {metric.icon}
                                <span className="ml-2">{metric.name}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <Badge variant="outline" className={getCategoryBadgeColor(metric.category)}>
                                  {metric.category}
                                </Badge>
                                <span className="text-slate-700">
                                  {metric.value} <span className="text-xs text-slate-500">{metric.unit}</span>
                                </span>
                                <span className="text-xs">
                                  {getImprovementLabel(metric.improvement)}
                                </span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="p-4 bg-slate-50 rounded-md">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-medium mb-2">Current Status</h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Current Value:</span>
                                      <span className="font-medium">{metric.value} {metric.unit}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Target Value:</span>
                                      <span className="font-medium">{metric.target} {metric.unit}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Previous Value:</span>
                                      <span className="font-medium">{metric.previousValue} {metric.unit}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-600">Improvement:</span>
                                      <span className="font-medium">{getImprovementLabel(metric.improvement)}</span>
                                    </div>
                                    
                                    <div className="mt-4">
                                      <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                                        <span>Progress to Target</span>
                                        <span>
                                          {Math.round((['biodiversity', 'materials'].includes(metric.category)
                                            ? (metric.value / metric.target) * 100
                                            : (1 - metric.value / metric.target) * 100))}%
                                        </span>
                                      </div>
                                      <Progress 
                                        value={(['biodiversity', 'materials'].includes(metric.category)
                                          ? (metric.value / metric.target) * 100
                                          : (1 - metric.value / metric.target) * 100)} 
                                        className={`h-2 ${getMetricProgressColor(metric)}`} 
                                      />
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2">History & Trends</h4>
                                  <div className="p-6 bg-white rounded border flex items-center justify-center">
                                    <LineChart className="w-16 h-16 text-slate-300" />
                                    <p className="text-slate-500 text-sm ml-4">
                                      Historical data visualization will be displayed here.
                                    </p>
                                  </div>
                                  
                                  <div className="mt-4 flex space-x-2">
                                    <Button variant="outline" size="sm">
                                      <Upload className="h-4 w-4 mr-1" />
                                      Update Data
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4 mr-1" />
                                      Export Data
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t">
                                <h4 className="font-medium mb-2">Related Recommendations</h4>
                                <div className="space-y-2">
                                  {recommendations
                                    .filter(r => r.category === metric.category)
                                    .map(recommendation => (
                                      <div 
                                        key={recommendation.id} 
                                        className="p-2 bg-white border rounded flex items-center justify-between"
                                      >
                                        <div className="flex items-center">
                                          <Info className="h-4 w-4 text-blue-500 mr-2" />
                                          <span className="text-sm">{recommendation.title}</span>
                                        </div>
                                        <Badge 
                                          variant="outline" 
                                          className={`text-xs ${getRecommendationImpactColor(recommendation.impact)}`}
                                        >
                                          {recommendation.impact} impact
                                        </Badge>
                                      </div>
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
                
                <TabsContent value="recommendations" className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Improvement Recommendations</h3>
                      <p className="text-sm text-slate-500">
                        Suggestions to improve your project's ecological impact
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Filter by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="carbon">Carbon</SelectItem>
                          <SelectItem value="water">Water</SelectItem>
                          <SelectItem value="waste">Waste</SelectItem>
                          <SelectItem value="energy">Energy</SelectItem>
                          <SelectItem value="biodiversity">Biodiversity</SelectItem>
                          <SelectItem value="materials">Materials</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select defaultValue="impact">
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="impact">Impact</SelectItem>
                          <SelectItem value="difficulty">Difficulty</SelectItem>
                          <SelectItem value="category">Category</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {recommendations.map(recommendation => (
                      <Card key={recommendation.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {getCategoryIcon(recommendation.category)}
                              <CardTitle className="text-lg ml-2">{recommendation.title}</CardTitle>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className={getCategoryBadgeColor(recommendation.category)}>
                                {recommendation.category}
                              </Badge>
                              <Badge variant="outline" className={getDifficultyBadgeColor(recommendation.difficulty)}>
                                {recommendation.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 mb-3">{recommendation.description}</p>
                          
                          <div className="flex items-center mb-4">
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs flex items-center">
                              <BarChart3 className="h-3 w-3 mr-1" />
                              <span>Impact: </span>
                              <span className="font-medium ml-1">{recommendation.impact}</span>
                            </div>
                            <div className="ml-4 text-sm text-slate-600">
                              <span className="font-medium">Estimated Savings: </span>
                              {recommendation.estimatedSavings}
                            </div>
                          </div>
                          
                          {recommendation.implemented ? (
                            <div className="flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-1" />
                              <span className="text-sm">Implemented</span>
                            </div>
                          ) : (
                            <Button onClick={() => handleImplementRecommendation(recommendation.id)}>
                              Implement Recommendation
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="goals" className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Sustainability Goals</h3>
                      <p className="text-sm text-slate-500">
                        Track progress towards your ecological goals
                      </p>
                    </div>
                    <Button onClick={() => setShowNewGoalDialog(true)}>
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Goal
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {goals.map(goal => (
                      <Card key={goal.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {getCategoryIcon(goal.category)}
                              <CardTitle className="text-lg ml-2">{goal.title}</CardTitle>
                            </div>
                            <Badge variant="outline" className={getCategoryBadgeColor(goal.category)}>
                              {goal.category}
                            </Badge>
                          </div>
                          <CardDescription>{goal.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-slate-500 mr-1" />
                                <span className="text-sm text-slate-500">
                                  Target Date: {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                                </span>
                              </div>
                              <span className="text-sm font-medium">
                                {goal.progress}% Complete
                              </span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-slate-50 p-3 rounded text-center">
                              <div className="text-lg font-semibold">
                                {goal.currentValue}
                                <span className="text-xs text-slate-500 ml-1">{goal.unit}</span>
                              </div>
                              <div className="text-xs text-slate-500">Current</div>
                            </div>
                            
                            <div className="bg-slate-50 p-3 rounded text-center">
                              <div className="text-lg font-semibold">
                                {goal.targetValue}
                                <span className="text-xs text-slate-500 ml-1">{goal.unit}</span>
                              </div>
                              <div className="text-xs text-slate-500">Target</div>
                            </div>
                            
                            <div className="bg-blue-50 p-3 rounded text-center">
                              <div className="text-lg font-semibold text-blue-600">
                                {Math.abs(goal.currentValue - goal.targetValue)}
                                <span className="text-xs ml-1">{goal.unit}</span>
                              </div>
                              <div className="text-xs text-blue-600">Remaining</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <Button variant="outline" size="sm">
                            Update Progress
                          </Button>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <HelpCircle className="h-4 w-4 text-slate-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View relevant recommendations to achieve this goal</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-1/4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reports</CardTitle>
                <CardDescription>
                  Generate and download reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {reports.map(report => (
                      <div 
                        key={report.id} 
                        className="p-3 border rounded-md bg-white flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium text-sm">{report.title}</div>
                          <div className="text-xs text-slate-500">
                            {format(new Date(report.date), 'MMM d, yyyy')}
                          </div>
                        </div>
                        <Download className="h-4 w-4 text-slate-500" />
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full">
                    Generate New Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compare Projects</CardTitle>
                <CardDescription>
                  See how projects compare ecologically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    {projects.map(project => (
                      <div key={project.id} className="flex items-center">
                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mr-2">
                          <Leaf className="h-3 w-3 text-green-500" />
                        </div>
                        <div className="flex-grow">
                          <div className="text-sm font-medium">{project.name}</div>
                          <div className="flex items-center space-x-1">
                            <Progress 
                              value={project.ecoScore} 
                              className={`h-1.5 ${getScoreColor(project.ecoScore)}`} 
                            />
                            <span className={`text-xs ${getScoreColor(project.ecoScore)}`}>
                              {project.ecoScore}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    View Detailed Comparison
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {currentTab === 'dashboard' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Certification Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">B Corp Certification</span>
                          <span className="text-xs font-medium">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">LEED Green Business</span>
                          <span className="text-xs font-medium">42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Regenerative Business</span>
                          <span className="text-xs font-medium">28%</span>
                        </div>
                        <Progress value={28} className="h-2" />
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      View Requirements
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Goal Dialog */}
      <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Sustainability Goal</DialogTitle>
            <DialogDescription>
              Create a new ecological goal for your project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input
                id="goal-title"
                placeholder="e.g., Zero Waste by 2025"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="goal-description">Description</Label>
              <Textarea
                id="goal-description"
                placeholder="Describe your sustainability goal..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-category">Category</Label>
                <Select defaultValue="carbon">
                  <SelectTrigger id="goal-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carbon">Carbon</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="waste">Waste</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="biodiversity">Biodiversity</SelectItem>
                    <SelectItem value="materials">Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal-date">Target Date</Label>
                <Input
                  id="goal-date"
                  type="date"
                  defaultValue={format(addDays(new Date(), 365), 'yyyy-MM-dd')}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-current">Current Value</Label>
                <Input
                  id="goal-current"
                  type="number"
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal-target">Target Value</Label>
                <Input
                  id="goal-target"
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="goal-unit">Unit of Measurement</Label>
              <Input
                id="goal-unit"
                placeholder="e.g., kg, tons, %, gallons"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewGoalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowNewGoalDialog(false)}>
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Metric Dialog */}
      <Dialog open={showNewMetricDialog} onOpenChange={setShowNewMetricDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Ecological Metric</DialogTitle>
            <DialogDescription>
              Track a new sustainability metric for your project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="metric-name">Metric Name</Label>
              <Input
                id="metric-name"
                placeholder="e.g., Greenhouse Gas Emissions"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="metric-category">Category</Label>
                <Select defaultValue="carbon">
                  <SelectTrigger id="metric-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carbon">Carbon</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="waste">Waste</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="biodiversity">Biodiversity</SelectItem>
                    <SelectItem value="materials">Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="metric-unit">Unit</Label>
                <Input
                  id="metric-unit"
                  placeholder="e.g., kg CO2e, kWh, gallons"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="metric-current">Current Value</Label>
                <Input
                  id="metric-current"
                  type="number"
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="metric-target">Target Value</Label>
                <Input
                  id="metric-target"
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="metric-description">Description</Label>
              <Textarea
                id="metric-description"
                placeholder="Describe what this metric measures and why it's important..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Lower values are better (e.g., emissions, waste)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewMetricDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowNewMetricDialog(false)}>
              Add Metric
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EcologicalImpact;