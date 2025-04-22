import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  UserPlus, 
  Users, 
  Leaf, 
  Briefcase 
} from "lucide-react";
import { calculateMatchPercentage } from "@/lib/utils/matching";

interface MatchCardProps {
  user: {
    id: number;
    name: string;
    location: string;
    profileImage: string;
    bio: string;
    skills: string[];
    resources: string[];
    values: string[];
  };
  matchScore: {
    totalScore: number;
    skillsMatch: string[];
    resourcesMatch: string[];
    valuesMatch: string[];
  };
  onConnect: (userId: number) => void;
  onMessage: (userId: number) => void;
}

const MatchCard = ({ user, matchScore, onConnect, onMessage }: MatchCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const matchPercentage = calculateMatchPercentage(matchScore.totalScore);
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative">
        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          {matchPercentage}% Match
        </div>
        <div className="h-32 bg-gradient-to-r from-green-700/20 to-green-500/20 flex items-center justify-center">
          <Avatar className="h-20 w-20 border-4 border-white">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="text-center mb-3">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-neutral-600 text-sm">{user.location}</p>
        </div>
        
        <p className="text-sm text-neutral-800 mb-4 line-clamp-2">
          {user.bio}
        </p>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center mb-1 text-sm font-medium text-neutral-800">
              <Briefcase className="h-4 w-4 mr-1 text-primary" /> Complementary Skills
            </div>
            <div className="flex flex-wrap gap-1">
              {matchScore.skillsMatch.slice(0, isExpanded ? undefined : 3).map((skill, index) => (
                <Badge key={index} variant="skill" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {!isExpanded && matchScore.skillsMatch.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{matchScore.skillsMatch.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-1 text-sm font-medium text-neutral-800">
              <Users className="h-4 w-4 mr-1 text-primary" /> Complementary Resources
            </div>
            <div className="flex flex-wrap gap-1">
              {matchScore.resourcesMatch.slice(0, isExpanded ? undefined : 3).map((resource, index) => (
                <Badge key={index} variant="resource" className="text-xs">
                  {resource}
                </Badge>
              ))}
              {!isExpanded && matchScore.resourcesMatch.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{matchScore.resourcesMatch.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-1 text-sm font-medium text-neutral-800">
              <Leaf className="h-4 w-4 mr-1 text-primary" /> Shared Values
            </div>
            <div className="flex flex-wrap gap-1">
              {matchScore.valuesMatch.slice(0, isExpanded ? undefined : 3).map((value, index) => (
                <Badge key={index} variant="value" className="text-xs">
                  {value}
                </Badge>
              ))}
              {!isExpanded && matchScore.valuesMatch.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{matchScore.valuesMatch.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {(matchScore.skillsMatch.length > 3 || 
          matchScore.resourcesMatch.length > 3 || 
          matchScore.valuesMatch.length > 3) && (
          <button 
            className="w-full text-primary text-sm mt-2 hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onMessage(user.id)}
        >
          <MessageSquare className="h-4 w-4 mr-2" /> Message
        </Button>
        <Button 
          size="sm" 
          className="flex-1 bg-primary hover:bg-primary-dark"
          onClick={() => onConnect(user.id)}
        >
          <UserPlus className="h-4 w-4 mr-2" /> Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
