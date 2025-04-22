import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface Step {
  number: number;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Create Your Profile",
    description: "Share your skills, resources, and values to find the perfect matches for your collaborative business ventures.",
    linkText: "Get Started",
    linkHref: "/profile"
  },
  {
    number: 2,
    title: "Discover Matches",
    description: "Our algorithm finds people and projects that complement your offerings and align with your ecological values.",
    linkText: "Browse Matches",
    linkHref: "/discover"
  },
  {
    number: 3,
    title: "Collaborate & Launch",
    description: "Use our workspace and templates to develop your idea into a revenue-sharing, sustainable business model.",
    linkText: "See Success Stories",
    linkHref: "/success-stories"
  }
];

const MatchingProcess = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900">How Eco-Collective Works</h2>
          <p className="mt-4 text-lg text-neutral-800 max-w-3xl mx-auto">
            Our platform matches individuals with complementary skills, resources, and values to create sustainable businesses together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-neutral-50 rounded-xl p-6 shadow-sm relative">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-neutral-800">{step.description}</p>
              <div className="mt-6">
                <Link href={step.linkHref} className="text-primary hover:text-primary-dark font-medium flex items-center">
                  {step.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchingProcess;
