import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  calculateMatchScore, 
  filterMatchesByMinScore, 
  sortMatchesByScore 
} from "@/lib/utils/matching";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, UserPlus } from "lucide-react";
import MatchCard from "@/components/discover/MatchCard";
import MatchFilter from "@/components/discover/MatchFilter";

// Sample current user for demonstration
const currentUser = {
  id: 1,
  name: "Emma Johnson",
  location: "Portland, OR",
  profileImage: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
  bio: "Sustainable design expert and project manager with a passion for ecological solutions.",
  skills: ["Sustainable Design", "Project Management", "Marketing"],
  resources: ["Workshop Space", "Equipment"],
  values: ["Ecological Restoration", "Shared Leadership", "Equitable Economics"]
};

// Sample potential matches for demonstration
const samplePotentialMatches = [
  {
    id: 2,
    name: "Michael Chen",
    location: "Seattle, WA",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    bio: "Web developer and marketing specialist looking to create technology for sustainable businesses.",
    skills: ["Web Development", "Marketing", "Design"],
    resources: ["Capital", "Network"],
    values: ["Innovation", "Community Focus", "Ecological Restoration"]
  },
  {
    id: 3,
    name: "Sophia Patel",
    location: "Austin, TX",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    bio: "Permaculture designer and community organizer with 5 acres of land available for collaborative projects.",
    skills: ["Permaculture", "Social Media", "Community Organizing"],
    resources: ["Land", "Community"],
    values: ["Ecological Restoration", "Community Focus", "Circular Economy"]
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Denver, CO",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    bio: "Renewable energy specialist with expertise in solar installation and financial modeling for cooperative ventures.",
    skills: ["Renewable Energy", "Finance", "Engineering"],
    resources: ["Solar Equipment", "Partnership"],
    values: ["Shared Leadership", "Equitable Economics", "Innovation"]
  },
  {
    id: 5,
    name: "Ana Rodriguez",
    location: "Portland, OR",
    profileImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    bio: "Urban farmer and food justice advocate seeking partners for a community-supported agriculture project.",
    skills: ["Urban Farming", "Food Justice", "Community Outreach"],
    resources: ["Urban Garden Space", "Farming Equipment", "Seed Bank"],
    values: ["Ecological Restoration", "Equitable Economics", "Community Focus"]
  },
  {
    id: 6,
    name: "Thomas Lee",
    location: "San Francisco, CA",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    bio: "Software engineer with experience in blockchain and interest in creating transparent supply chain solutions for ecological businesses.",
    skills: ["Software Development", "Blockchain", "Supply Chain"],
    resources: ["Technical Infrastructure", "Developer Network"],
    values: ["Innovation", "Circular Economy", "Equitable Economics"]
  },
  {
    id: 7,
    name: "Elena Sanchez",
    location: "New York, NY",
    profileImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
    bio: "Legal expert specializing in cooperative business structures and social enterprise models.",
    skills: ["Legal", "Cooperative Development", "Business Strategy"],
    resources: ["Legal Resources", "Professional Network"],
    values: ["Shared Leadership", "Equitable Economics", "Community Focus"]
  }
];

const Discover = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("matches");
  const [matchThreshold, setMatchThreshold] = useState(0);
  const [filteredMatches, setFilteredMatches] = useState<any[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<number[]>([]);
  
  // In a real app, we would fetch from the API
  // const { data: potentialMatches, isLoading } = useQuery({
  //   queryKey: ['/api/users/matches']
  // });
  
  // Using sample data for now
  const potentialMatches = samplePotentialMatches;
  const isLoading = false;
  
  // Calculate match scores for all potential matches
  useEffect(() => {
    if (potentialMatches) {
      const matchScores = potentialMatches.map(match => {
        const score = calculateMatchScore(
          currentUser.skills,
          currentUser.resources,
          currentUser.values,
          match.id,
          match.skills,
          match.resources,
          match.values
        );
        
        return {
          ...match,
          matchScore: score
        };
      });
      
      // Sort by match score and filter by threshold
      const sortedAndFiltered = sortMatchesByScore(matchScores)
        .filter(match => match.matchScore.totalScore >= matchThreshold);
      
      setFilteredMatches(sortedAndFiltered);
    }
  }, [potentialMatches, matchThreshold]);
  
  const handleFilterChange = (filters: any) => {
    const { searchTerm, matchThreshold, locations, skills, resources, values } = filters;
    
    // Update match threshold
    setMatchThreshold(matchThreshold);
    
    if (potentialMatches) {
      let filtered = potentialMatches.map(match => {
        const score = calculateMatchScore(
          currentUser.skills,
          currentUser.resources,
          currentUser.values,
          match.id,
          match.skills,
          match.resources,
          match.values
        );
        
        return {
          ...match,
          matchScore: score
        };
      });
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(match =>
          match.name.toLowerCase().includes(term) ||
          match.bio.toLowerCase().includes(term) ||
          match.skills.some((skill: string) => skill.toLowerCase().includes(term)) ||
          match.resources.some((resource: string) => resource.toLowerCase().includes(term))
        );
      }
      
      // Filter by location
      if (locations && locations.length > 0) {
        filtered = filtered.filter(match =>
          locations.some(loc => match.location.toLowerCase().includes(loc))
        );
      }
      
      // Filter by skills
      if (skills && skills.length > 0) {
        filtered = filtered.filter(match =>
          match.skills.some((skill: string) => 
            skills.some(s => skill.toLowerCase().includes(s))
          )
        );
      }
      
      // Filter by resources
      if (resources && resources.length > 0) {
        filtered = filtered.filter(match =>
          match.resources.some((resource: string) => 
            resources.some(r => resource.toLowerCase().includes(r))
          )
        );
      }
      
      // Filter by values
      if (values && values.length > 0) {
        filtered = filtered.filter(match =>
          match.values.some((value: string) => 
            values.some(v => value.toLowerCase().includes(v))
          )
        );
      }
      
      // Sort by match score and filter by threshold
      const sortedAndFiltered = sortMatchesByScore(filtered)
        .filter(match => match.matchScore.totalScore >= matchThreshold);
      
      setFilteredMatches(sortedAndFiltered);
    }
  };
  
  const handleConnectUser = (userId: number) => {
    // In a real app, we would make an API call to connect users
    toast({
      title: "Connection Request Sent",
      description: "Your connection request has been sent successfully.",
    });
    
    setInvitedUsers([...invitedUsers, userId]);
  };
  
  const handleMessageUser = (userId: number) => {
    // In a real app, we would navigate to a messaging interface or open a modal
    toast({
      title: "Message Interface",
      description: "Message functionality coming soon.",
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Discover Collaborators</h1>
          <p className="mt-2 text-lg text-neutral-700">
            Find individuals with complementary skills and resources for sustainable business ventures
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="matches">
            <Users className="h-4 w-4 mr-2" /> Potential Matches
          </TabsTrigger>
          <TabsTrigger value="invitations">
            <UserPlus className="h-4 w-4 mr-2" /> Sent Invitations
          </TabsTrigger>
          <TabsTrigger value="connections">
            <User className="h-4 w-4 mr-2" /> Your Connections
          </TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <MatchFilter onFilterChange={handleFilterChange} />
          </div>
          
          <div className="flex-1">
            <TabsContent value="matches" className="m-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="h-96 animate-pulse">
                      <div className="h-32 bg-neutral-100"></div>
                      <CardContent className="p-4">
                        <div className="h-4 bg-neutral-100 rounded-full w-3/4 mb-4"></div>
                        <div className="h-3 bg-neutral-100 rounded-full w-1/2 mb-6"></div>
                        <div className="space-y-3">
                          <div className="h-3 bg-neutral-100 rounded-full w-full"></div>
                          <div className="h-3 bg-neutral-100 rounded-full w-full"></div>
                          <div className="h-3 bg-neutral-100 rounded-full w-3/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  {filteredMatches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredMatches.map((match) => (
                        <MatchCard
                          key={match.id}
                          user={match}
                          matchScore={match.matchScore}
                          onConnect={handleConnectUser}
                          onMessage={handleMessageUser}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-neutral-900 mb-2">No matches found</h3>
                        <p className="text-neutral-600 mb-6">
                          Try adjusting your filters or updating your profile with more skills and resources.
                        </p>
                        <Button>Update Your Profile</Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="invitations" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Sent Invitations</CardTitle>
                  <CardDescription>
                    People you've invited to connect with
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {invitedUsers.length > 0 ? (
                    <div className="space-y-4">
                      {potentialMatches
                        .filter(match => invitedUsers.includes(match.id))
                        .map(user => (
                          <div key={user.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={user.profileImage} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{user.name}</h4>
                                <p className="text-sm text-neutral-600">{user.location}</p>
                              </div>
                            </div>
                            <div className="text-sm text-neutral-500">Invitation Sent</div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <UserPlus className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No invitations sent yet</h3>
                      <p className="text-neutral-600 mb-4">Start connecting with potential collaborators</p>
                      <Button onClick={() => setActiveTab("matches")}>Find Collaborators</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="connections" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Your Connections</CardTitle>
                  <CardDescription>
                    People who have accepted your invitations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <User className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No connections yet</h3>
                    <p className="text-neutral-600 mb-4">
                      When people accept your connection requests, they'll appear here
                    </p>
                    <Button onClick={() => setActiveTab("matches")}>Find Collaborators</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Discover;
