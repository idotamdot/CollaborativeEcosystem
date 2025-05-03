import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@shared/schema";

// Sample projects data (in production would come from API)
const sampleProjects = [
  {
    id: 1,
    title: "Organic Farm Collective",
    description: "A cooperative organic farm seeking partners with regenerative agriculture knowledge, marketing skills, and distribution connections.",
    image: "https://images.unsplash.com/photo-1550505095-81378a674be9",
    neededSkills: ["Marketing", "Distribution", "Investment"],
    membersNeeded: 3,
    members: [2, 4]
  },
  {
    id: 2,
    title: "Eco Tech Solutions",
    description: "Developing open-source technology for environmental monitoring and sustainable resource management in urban areas.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    neededSkills: ["IoT Development", "Hardware Design", "Funding"],
    membersNeeded: 2,
    members: [1, 3]
  },
  {
    id: 3,
    title: "Community Renewable Energy",
    description: "Creating a community-owned solar and wind energy cooperative with equitable revenue sharing and local governance.",
    image: "https://images.unsplash.com/photo-1560252829-804f1aedf1be",
    neededSkills: ["Engineering", "Legal", "Community Organizing"],
    membersNeeded: 4,
    members: [2]
  },
  {
    id: 4,
    title: "Sustainable Fashion Cooperative",
    description: "A workers-owned fashion brand creating eco-friendly, ethical clothing with transparent supply chains.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    neededSkills: ["Design", "Production", "Marketing"],
    membersNeeded: 3,
    members: [1, 3]
  },
  {
    id: 5,
    title: "Local Food Distribution Network",
    description: "Building technology and logistics for connecting small-scale farmers directly to consumers through neighborhood hubs.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9",
    neededSkills: ["Logistics", "App Development", "Business Development"],
    membersNeeded: 2,
    members: [4]
  },
  {
    id: 6,
    title: "Open Source Ecological Design",
    description: "Creating and sharing sustainable design patterns for agriculture, housing, and community spaces.",
    image: "https://images.unsplash.com/photo-1503387837-b154d5074bd2",
    neededSkills: ["Architecture", "Permaculture", "Documentation"],
    membersNeeded: 3,
    members: [2, 3]
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // In a real app, we'd fetch from the API
  // const { data: projects, isLoading } = useQuery<Project[]>({
  //   queryKey: ['/api/projects']
  // });
  
  // Using sample data for now
  const projects = sampleProjects;
  const isLoading = false;
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.neededSkills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Collaborative Projects</h1>
            <p className="mt-2 text-lg text-white/90">
              Discover and join ecological business ventures seeking collaborators
            </p>
          </div>
          <Button className="bg-white text-primary hover:bg-white/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Project
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="py-4">
                <CardTitle className="text-lg text-primary">Filter Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-8 border-primary/20 focus:border-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2 text-primary/80">Categories</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="agriculture" className="rounded text-primary" />
                      <label htmlFor="agriculture" className="ml-2 text-sm">Agriculture & Food</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="energy" className="rounded text-primary" />
                      <label htmlFor="energy" className="ml-2 text-sm">Renewable Energy</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="technology" className="rounded text-primary" />
                      <label htmlFor="technology" className="ml-2 text-sm">Sustainable Technology</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="manufacturing" className="rounded text-primary" />
                      <label htmlFor="manufacturing" className="ml-2 text-sm">Eco Manufacturing</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="services" className="rounded text-primary" />
                      <label htmlFor="services" className="ml-2 text-sm">Community Services</label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2 text-primary/80">Skills Needed</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="marketing" className="rounded text-primary" />
                      <label htmlFor="marketing" className="ml-2 text-sm">Marketing</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="development" className="rounded text-primary" />
                      <label htmlFor="development" className="ml-2 text-sm">Development</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="design" className="rounded text-primary" />
                      <label htmlFor="design" className="ml-2 text-sm">Design</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="finance" className="rounded text-primary" />
                      <label htmlFor="finance" className="ml-2 text-sm">Finance</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="legal" className="rounded text-primary" />
                      <label htmlFor="legal" className="ml-2 text-sm">Legal</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 bg-white/20">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-primary">All Projects</TabsTrigger>
                <TabsTrigger value="recommended" className="data-[state=active]:bg-white data-[state=active]:text-primary">Recommended for You</TabsTrigger>
                <TabsTrigger value="newest" className="data-[state=active]:bg-white data-[state=active]:text-primary">Newest</TabsTrigger>
                <TabsTrigger value="popular" className="data-[state=active]:bg-white data-[state=active]:text-primary">Most Popular</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-white/30 rounded-xl h-96 animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))
                    ) : (
                      <div className="col-span-3 bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center py-12">
                        <h3 className="text-lg font-medium text-primary">No projects found</h3>
                        <p className="text-neutral-600">Try adjusting your search or filters</p>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recommended">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* We would filter projects based on user profile match */}
                  {filteredProjects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="newest">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* We would sort projects by creation date */}
                  {filteredProjects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="popular">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* We would sort projects by popularity/applications */}
                  {filteredProjects.slice(3, 6).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;