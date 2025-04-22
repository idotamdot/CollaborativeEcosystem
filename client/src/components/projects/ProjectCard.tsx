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
    <div className="bg-neutral-50 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-neutral-900">{project.title}</h3>
          <Badge variant="project" className="text-xs">
            Seeking {project.membersNeeded} Members
          </Badge>
        </div>
        <p className="mt-2 text-neutral-800">{project.description}</p>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-neutral-900">Needed Resources & Skills</h4>
          <div className="mt-2 flex flex-wrap gap-1">
            {project.neededSkills.map((skill: string) => (
              <Badge key={skill} variant="skill" className="text-xs">{skill}</Badge>
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
          <Button
            size="sm"
            className="bg-primary hover:bg-primary-dark text-white"
          >
            <Link href={`/projects/${project.id}`}>Join Project</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
