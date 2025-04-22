import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Create sustainable businesses through collective collaboration
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Connect with like-minded individuals, share resources, and build equitable businesses that prioritize people and planet.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button size="lg" variant="default" className="bg-white text-primary hover:bg-neutral-100">
                <Link href="/discover">Find Collaborators</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white hover:bg-white/10 text-white">
                <Link href="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2 mt-8 md:mt-0">
            <div className="rounded-lg shadow-2xl overflow-hidden h-80 lg:h-96 flex items-center justify-center bg-green-800">
              <svg className="w-48 h-48 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L4,5v6c0,5.5,3.8,10.7,8,12,4.2-1.3,8-6.5,8-12V5L12,2z M12,15c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,15,12,15z M16,10c0,2.2-1.8,4-4,4s-4-1.8-4-4c0-1.9,1.3-3.4,3-3.9V3.5l1-0.3l1,0.3v2.6C14.7,6.6,16,8.1,16,10z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
