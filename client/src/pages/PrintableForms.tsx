import React from 'react';
import { FileIcon, FileText, FileSpreadsheet, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PrintableResource {
  id: string;
  title: string;
  description: string;
  type: 'form' | 'worksheet' | 'legal' | 'workbook';
  fileType: 'pdf' | 'docx' | 'xlsx';
  category: string;
  downloadUrl: string;
}

const printableResources: PrintableResource[] = [
  {
    id: 'form1',
    title: 'Project Registration Form',
    description: 'Official form to register a new ecological project within the platform.',
    type: 'form',
    fileType: 'pdf',
    category: 'Project Setup',
    downloadUrl: '#',
  },
  {
    id: 'worksheet1',
    title: 'Ecological Impact Assessment Worksheet',
    description: 'Evaluate and document the ecological impact of your project or business venture.',
    type: 'worksheet',
    fileType: 'xlsx',
    category: 'Assessment',
    downloadUrl: '#',
  },
  {
    id: 'legal1',
    title: 'Participation Agreement Template',
    description: 'Legal template for establishing formal participation in an ecological project.',
    type: 'legal',
    fileType: 'docx',
    category: 'Agreements',
    downloadUrl: '#',
  },
  {
    id: 'workbook1',
    title: 'Stewardship Investment Model Workbook',
    description: 'Comprehensive workbook explaining the SIM principles with practical exercises.',
    type: 'workbook',
    fileType: 'pdf',
    category: 'Education',
    downloadUrl: '#',
  },
  {
    id: 'form2',
    title: 'Resource Contribution Log',
    description: 'Track and document resources contributed to collaborative projects.',
    type: 'form',
    fileType: 'xlsx',
    category: 'Resource Management',
    downloadUrl: '#',
  },
  {
    id: 'legal2',
    title: 'Revenue Sharing Agreement',
    description: 'Legal template for establishing fair revenue distribution among collaborators.',
    type: 'legal',
    fileType: 'docx',
    category: 'Agreements',
    downloadUrl: '#',
  },
  {
    id: 'worksheet2',
    title: 'Governance Structure Planning',
    description: 'Worksheet to plan and document the governance structure for your collaborative venture.',
    type: 'worksheet',
    fileType: 'pdf',
    category: 'Governance',
    downloadUrl: '#',
  },
  {
    id: 'workbook2',
    title: 'Ecological Business Model Canvas',
    description: 'Interactive workbook to develop your ecological business model with sustainability at its core.',
    type: 'workbook',
    fileType: 'pdf',
    category: 'Business Planning',
    downloadUrl: '#',
  },
];

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return <FileIcon className="h-5 w-5 text-red-500" />;
    case 'docx':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'xlsx':
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const ResourceCard = ({ resource }: { resource: PrintableResource }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center">
          {getFileIcon(resource.fileType)}
          <CardTitle className="ml-2 text-lg">{resource.title}</CardTitle>
        </div>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-slate-500">
          <div className="flex items-center">
            <span className="font-medium">Category:</span>
            <span className="ml-2">{resource.category}</span>
          </div>
          <div className="flex items-center mt-2">
            <span className="font-medium">Format:</span>
            <span className="ml-2 uppercase">{resource.fileType}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

const PrintableForms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Printable Resources</h1>
        <p className="text-slate-600 max-w-3xl">
          Download and print these forms, worksheets, legal documents, and workbooks to help
          with your ecological ventures and collaborations. These resources are designed to
          support the implementation of the Stewardship Investment Model.
        </p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
          <TabsTrigger value="legal">Legal Documents</TabsTrigger>
          <TabsTrigger value="workbooks">Workbooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printableResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="forms" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printableResources
              .filter((resource) => resource.type === 'form')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="worksheets" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printableResources
              .filter((resource) => resource.type === 'worksheet')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="legal" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printableResources
              .filter((resource) => resource.type === 'legal')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="workbooks" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printableResources
              .filter((resource) => resource.type === 'workbook')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrintableForms;