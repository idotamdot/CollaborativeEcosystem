import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Plus, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Types based on our schema
interface Resource {
  id: number;
  type: string;
  description: string;
  location: string;
  status: string;
  accessMethod: string;
  createdAt: string;
}

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-primary">
            {resource.type}
          </CardTitle>
          <span className={`px-2 py-1 text-xs rounded-full ${
            resource.status === "active" 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-800"
          }`}>
            {resource.status}
          </span>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin className="h-3.5 w-3.5" />
          {resource.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-700">{resource.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <div className="w-full mt-2 pt-2 border-t">
          <p className="text-xs text-gray-500">
            <span className="font-medium">Access:</span> {resource.accessMethod}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

const AddResourceForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    type: "",
    description: "",
    location: "",
    status: "active",
    accessMethod: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await apiRequest(
        "POST",
        "/api/resources",
        formState
      );
      
      toast({
        title: "Resource Added",
        description: "Your resource has been successfully added to the collective."
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add resource. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Resource Type</Label>
        <Select 
          name="type" 
          value={formState.type}
          onValueChange={(value) => handleSelectChange("type", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="space">Workspace/Space</SelectItem>
            <SelectItem value="tool">Tools/Equipment</SelectItem>
            <SelectItem value="material">Materials</SelectItem>
            <SelectItem value="land">Land</SelectItem>
            <SelectItem value="vehicle">Vehicle</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea 
          id="description" 
          name="description"
          value={formState.description}
          onChange={handleChange}
          required
          className="w-full min-h-[100px] px-3 py-2 border rounded-md"
          placeholder="Describe the resource, its condition, and any special features..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location" 
          name="location"
          value={formState.location}
          onChange={handleChange}
          required
          placeholder="City, Region or Address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="accessMethod">Access Method</Label>
        <Input 
          id="accessMethod" 
          name="accessMethod"
          value={formState.accessMethod}
          onChange={handleChange}
          required
          placeholder="How can others access this resource?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select 
          name="status" 
          value={formState.status}
          onValueChange={(value) => handleSelectChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active (Available)</SelectItem>
            <SelectItem value="maintenance">Under Maintenance</SelectItem>
            <SelectItem value="borrowed">Borrowed/In Use</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Resource</Button>
      </DialogFooter>
    </form>
  );
};

const ResourceFilters = ({ 
  onFilterChange 
}: { 
  onFilterChange: (filters: { type: string; location: string; status: string }) => void
}) => {
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    status: ""
  });

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { type: "", location: "", status: "" };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Filter Resources</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="filter-type">Resource Type</Label>
          <Select 
            value={filters.type} 
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger id="filter-type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="space">Workspace/Space</SelectItem>
              <SelectItem value="tool">Tools/Equipment</SelectItem>
              <SelectItem value="material">Materials</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="vehicle">Vehicle</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="filter-location">Location</Label>
          <Input 
            id="filter-location" 
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            placeholder="Filter by location"
          />
        </div>

        <div>
          <Label htmlFor="filter-status">Status</Label>
          <Select 
            value={filters.status} 
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger id="filter-status">
              <SelectValue placeholder="Any Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Status</SelectItem>
              <SelectItem value="active">Active (Available)</SelectItem>
              <SelectItem value="maintenance">Under Maintenance</SelectItem>
              <SelectItem value="borrowed">Borrowed/In Use</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

const ResourcesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    status: ""
  });

  // Fetch resources data
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
    retry: 1,
  });

  // Apply filters to resources
  const filteredResources = resources.filter((resource: Resource) => {
    // Filter by tab first
    if (activeTab !== "all" && resource.type !== activeTab) return false;
    
    // Then apply additional filters
    if (filters.type && resource.type !== filters.type) return false;
    if (filters.status && resource.status !== filters.status) return false;
    if (filters.location && !resource.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    
    return true;
  });

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Shared Resources</h1>
          <p className="text-neutral-600 mt-2 max-w-2xl">
            Browse and share ecological resources with the community. From workspace to tools, help create a circular economy of shared assets.
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 sm:mt-0" size="lg">
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add a Shared Resource</DialogTitle>
              <DialogDescription>
                Share your workspace, tools, or other resources with the Eco-Collective community.
              </DialogDescription>
            </DialogHeader>
            <AddResourceForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <ResourceFilters onFilterChange={setFilters} />

      <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="space">Spaces</TabsTrigger>
          <TabsTrigger value="tool">Tools</TabsTrigger>
          <TabsTrigger value="material">Materials</TabsTrigger>
          <TabsTrigger value="land">Land</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicles</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource: Resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
          <p className="text-xl font-medium text-gray-600 mb-4">No resources found</p>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {activeTab !== "all" || Object.values(filters).some(f => f !== "") 
              ? "Try changing your filters or tab selection."
              : "Be the first to share a resource with the community!"}
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Your First Resource</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add a Shared Resource</DialogTitle>
                <DialogDescription>
                  Share your workspace, tools, or other resources with the Eco-Collective community.
                </DialogDescription>
              </DialogHeader>
              <AddResourceForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;