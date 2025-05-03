import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project, User } from "@shared/schema";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  ChevronLeft,
  Calendar,
  MapPin,
  Share2,
  Heart,
  Handshake,
  FilePenLine
} from "lucide-react";
import ParticipationAgreement from "@/components/projects/ParticipationAgreement";
import ProjectAgreements from "@/components/projects/ProjectAgreements";

// Sample data for demonstration
const sampleProject = {
  id: 1,
  title: "Organic Farm Collective",
  description: "A cooperative organic farm seeking partners with regenerative agriculture knowledge, marketing skills, and distribution connections.",
  detailedDescription: `
    <p>The Organic Farm Collective aims to create a worker-owned cooperative that grows organic produce, creates value-added products, and sells directly to local communities.</p>
    
    <p>We have secured 5 acres of land outside Portland and have two experienced farmers on board. We're looking for partners with complementary skills who share our values of sustainability, equity, and community focus.</p>
    
    <h3>Our Mission</h3>
    <p>To create a regenerative agricultural business that provides fair livelihoods for all members while healing the land and providing nutritious food to our community.</p>
    
    <h3>Revenue Sharing Model</h3>
    <p>We plan to use a cooperative ownership structure where all members have equal voting rights and receive profit distributions based on hours worked, with a small percentage reinvested in the business growth and community initiatives.</p>
  `,
  location: "Portland, Oregon",
  createdAt: "2023-09-15",
  image: "https://images.unsplash.com/photo-1550505095-81378a674be9",
  neededSkills: ["Marketing", "Distribution", "Investment", "Food Processing", "Sales"],
  neededResources: ["Distribution Vehicle", "Processing Equipment", "Starting Capital", "Market Connections"],
  memberIds: [2, 4],
  membersNeeded: 3,
  values: ["Ecological Restoration", "Community Focus", "Equitable Economics", "Circular Economy"],
  status: "open"
};

const sampleMembers = [
  {
    id: 2,
    name: "Michael Chen",
    bio: "Web developer and marketing specialist with 5 years of experience in sustainable business.",
    skills: ["Web Development", "Marketing", "Design"],
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    id: 4,
    name: "James Wilson",
    bio: "Organic farmer with 10 years experience in regenerative agriculture and community-supported agriculture models.",
    skills: ["Regenerative Agriculture", "Permaculture", "Farmer's Markets"],
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = parseInt(id || "1");
  
  // In a real app, we'd fetch from the API
  // const { data: project, isLoading } = useQuery<Project>({
  //   queryKey: [`/api/projects/${projectId}`]
  // });
  
  // Using sample data for demonstration
  const project = sampleProject;
  const isLoading = false;
  const members = sampleMembers;
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse h-8 w-64 bg-neutral-200 rounded mb-4"></div>
        <div className="animate-pulse h-96 w-full bg-neutral-200 rounded-lg"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Project Not Found</h2>
        <p className="text-neutral-600">The project you're looking for doesn't exist or has been removed.</p>
        <Button variant="outline" className="mt-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Button variant="outline" className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Button>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="rounded-xl overflow-hidden mb-6 h-[400px]">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{project.title}</h1>
          
          <div className="flex gap-4 items-center mb-6">
            <div className="flex items-center text-neutral-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">Created {project.createdAt}</span>
            </div>
            <div className="flex items-center text-neutral-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{project.location}</span>
            </div>
            <div className="flex items-center text-neutral-600">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">Seeking {project.membersNeeded} Members</span>
            </div>
          </div>
          
          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="agreements">Agreements</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.detailedDescription }} />
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">Values</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.values.map((value, i) => (
                        <Badge key={i} variant="value">{value}</Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">Skills Needed</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.neededSkills.map((skill, i) => (
                        <Badge key={i} variant="skill">{skill}</Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">Resources Needed</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.neededResources.map((resource, i) => (
                        <Badge key={i} variant="resource">{resource}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Project Members</CardTitle>
                  <CardDescription>
                    The team currently working on this collaborative project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.profileImage} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-neutral-900">{member.name}</h4>
                          <p className="text-neutral-700 text-sm mt-1">{member.bio}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {member.skills.map((skill, i) => (
                              <Badge key={i} variant="skill" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="agreements">
              <div className="space-y-6">
                <ProjectAgreements projectId={projectId} />
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Handshake className="h-5 w-5 text-primary" />
                      Participation Agreement
                    </CardTitle>
                    <CardDescription>
                      Sign a formal agreement to join this project under the Stewardship Investment Model
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-100">
                      <h3 className="font-medium mb-2 text-blue-700">Why Sign an Agreement?</h3>
                      <p className="text-sm text-blue-700">
                        Signing a participation agreement formalizes your commitment to this project and establishes
                        how revenue will be distributed based on your contributions according to the Stewardship Investment Model.
                      </p>
                    </div>
                    
                    <div className="my-6">
                      <ParticipationAgreement
                        projectId={projectId}
                        projectTitle={project.title}
                        userId={1} // This would be the current user's ID in a real app
                        userName="Current User" // This would be the current user's name in a real app
                        userEmail="user@example.com" // This would be the current user's email in a real app
                        trigger={
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
                            <FilePenLine className="mr-2 h-4 w-4" />
                            Sign Participation Agreement
                          </Button>
                        }
                      />
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2">
                      By signing, you agree to the terms outlined in the participation agreement, including
                      revenue sharing, governance, and the Eco-CoLab values.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="discussions">
              <Card>
                <CardHeader>
                  <CardTitle>Project Discussions</CardTitle>
                  <CardDescription>
                    Conversations between members and interested collaborators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No discussions yet</h3>
                    <p className="text-neutral-600 mb-4">Start a conversation about this project</p>
                    <Button>Start Discussion</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Project Resources</CardTitle>
                  <CardDescription>
                    Shared documents, templates, and tools for collaboration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No resources shared yet</h3>
                    <p className="text-neutral-600 mb-4">Upload documents and resources for the team</p>
                    <Button>Add Resource</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:w-1/3">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Join This Project</CardTitle>
              <CardDescription>
                Apply to collaborate on this ecological business venture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary hover:bg-primary-dark mb-4">
                Apply to Join
              </Button>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="flex-1 mr-2">
                  <Heart className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Sharing Model</CardTitle>
              <CardDescription>
                How project rewards are distributed among collaborators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Cooperative Structure</h3>
                <p className="text-sm text-neutral-700">
                  Equal voting rights for all members with profit sharing based on hours contributed
                </p>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Distribution Formula</h3>
                <ul className="text-sm text-neutral-700 space-y-1 list-disc pl-5">
                  <li>70% - Distributed to members based on hours worked</li>
                  <li>20% - Reinvested in business growth</li>
                  <li>10% - Community and environmental initiatives</li>
                </ul>
              </div>
              
              <Button variant="outline" className="w-full">
                View Detailed Model
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
