import {
  Users,
  File,
  MessageSquare,
  Leaf,
  Handshake,
  GraduationCap
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Skills & Resource Matching",
    description: "Our algorithm connects people with complementary capabilities to form balanced teams."
  },
  {
    icon: <File className="h-6 w-6" />,
    title: "Revenue Sharing Templates",
    description: "Choose from multiple frameworks for equitable profit distribution among collaborators."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Collaboration Workspace",
    description: "Dedicated spaces for messaging, file sharing, and project management with your team."
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Ecological Impact Assessment",
    description: "Tools to measure and improve the environmental footprint of your business activities."
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: "Resource Sharing Network",
    description: "Access shared equipment, spaces, and materials within the community ecosystem."
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Business Model Education",
    description: "Learn about sustainable business practices, cooperative structures, and regenerative economics."
  }
];

const FeatureHighlights = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900">Platform Features</h2>
          <p className="mt-4 text-lg text-neutral-800 max-w-3xl mx-auto">
            Tools and resources to help you build equitable, sustainable business models.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-secondary/30 text-primary rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">{feature.title}</h3>
              <p className="text-neutral-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
