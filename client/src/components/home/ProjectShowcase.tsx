import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project } from "@shared/schema";
import ProjectCard from "@/components/projects/ProjectCard";

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
  }
];

const ProjectShowcase = () => {
  // In a real app, we would fetch projects from the API
  // const { data: projects, isLoading } = useQuery<Project[]>({ 
  //   queryKey: ['/api/projects'] 
  // });

  // Using sample data for now
  const projects = sampleProjects;
  const isLoading = false;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Collaborative Projects</h2>
            <p className="mt-2 text-lg text-neutral-800">Discover ongoing ventures seeking collaborators</p>
          </div>
          <Link href="/projects" className="text-primary hover:text-primary-dark font-medium hidden md:flex items-center">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-50 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/projects" className="text-primary hover:text-primary-dark font-medium inline-flex items-center">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
