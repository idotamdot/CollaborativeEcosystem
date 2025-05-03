import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: any; // Simplified type for now
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // In a real app we would fetch user data based on member IDs
  const memberImages = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7"
  ];
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] group">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <Badge variant="outline" className="absolute top-3 right-3 bg-white/90 font-medium text-primary text-xs">
          Seeking {project.membersNeeded} Members
        </Badge>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
        </div>
        <p className="mt-2 text-neutral-700 line-clamp-3">{project.description}</p>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-primary/80">Needed Skills</h4>
          <div className="mt-2 flex flex-wrap gap-1">
            {project.neededSkills.map((skill: string) => (
              <Badge key={skill} variant="secondary" className="text-xs bg-secondary/20 text-primary">{skill}</Badge>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((memberId: number, index: number) => (
              <Avatar key={index} className="h-8 w-8 border-2 border-white">
                <AvatarImage src={memberImages[memberId % memberImages.length]} />
                <AvatarFallback>U{memberId}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Button size="sm">
            <Link href={`/projects/${project.id}`}>Join Project</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
