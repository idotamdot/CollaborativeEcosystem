import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Profile {
  id: number;
  name: string;
  location: string;
  profileImage: string;
  skills: string[];
  resources: string[];
  position: {
    top: number;
    left: number;
  };
}

interface Connection {
  from: number;
  to: number;
}

const sampleProfiles: Profile[] = [
  {
    id: 1,
    name: "Emma Johnson",
    location: "Portland, OR",
    profileImage: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
    skills: ["Sustainable Design", "Project Management"],
    resources: ["Workshop Space", "Equipment"],
    position: { top: 60, left: 100 }
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Seattle, WA",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    skills: ["Web Development", "Marketing"],
    resources: ["Capital", "Network"],
    position: { top: 280, left: 500 }
  },
  {
    id: 3,
    name: "Sophia Patel",
    location: "Austin, TX",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    skills: ["Permaculture", "Social Media"],
    resources: ["Land", "Community"],
    position: { top: 120, left: 350 }
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Denver, CO",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    skills: ["Renewable Energy", "Finance"],
    resources: ["Solar Equipment", "Partnership"],
    position: { top: 300, left: 180 }
  }
];

const sampleConnections: Connection[] = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 1, to: 4 }
];

const ProfileCard = ({ profile }: { profile: Profile }) => {
  return (
    <div 
      className="profile-card absolute bg-white rounded-lg shadow-md p-4 w-64 z-10" 
      style={{ top: profile.position.top, left: profile.position.left }}
      data-id={profile.id}
    >
      <div className="flex items-center space-x-3">
        <img src={profile.profileImage} alt={profile.name} className="w-12 h-12 rounded-full" />
        <div>
          <h4 className="font-medium">{profile.name}</h4>
          <p className="text-sm text-neutral-600">{profile.location}</p>
        </div>
      </div>
      <div className="mt-3">
        <h5 className="text-sm font-medium text-neutral-900">Skills</h5>
        <div className="mt-1 flex flex-wrap gap-1">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="skill" className="text-xs">{skill}</Badge>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <h5 className="text-sm font-medium text-neutral-900">Resources</h5>
        <div className="mt-1 flex flex-wrap gap-1">
          {profile.resources.map((resource) => (
            <Badge key={resource} variant="resource" className="text-xs">{resource}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const MatchingVisual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [connections, setConnections] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const drawConnections = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newConnections: JSX.Element[] = [];
      
      sampleConnections.forEach((connection, index) => {
        const fromElement = container.querySelector(`[data-id="${connection.from}"]`);
        const toElement = container.querySelector(`[data-id="${connection.to}"]`);
        
        if (fromElement && toElement) {
          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();
          
          const x1 = fromRect.left - containerRect.left + fromRect.width / 2;
          const y1 = fromRect.top - containerRect.top + fromRect.height / 2;
          const x2 = toRect.left - containerRect.left + toRect.width / 2;
          const y2 = toRect.top - containerRect.top + toRect.height / 2;
          
          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
          
          newConnections.push(
            <div 
              key={index}
              className="absolute bg-secondary/60 z-0"
              style={{
                width: `${length}px`,
                height: '2px',
                left: `${x1}px`,
                top: `${y1}px`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0 0',
                opacity: '0.6'
              }}
            />
          );
        }
      });
      
      setConnections(newConnections);
    };
    
    drawConnections();
    window.addEventListener('resize', drawConnections);
    
    return () => {
      window.removeEventListener('resize', drawConnections);
    };
  }, []);

  return (
    <section className="py-16 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900">Find Your Perfect Match</h2>
          <p className="mt-4 text-lg text-neutral-800 max-w-3xl mx-auto">
            Our matching system connects people with complementary resources, skills, and values.
          </p>
        </div>
        
        <div ref={containerRef} className="relative h-[500px] bg-white rounded-xl shadow-md p-6 overflow-hidden">
          {connections}
          
          {sampleProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchingVisual;
