import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ecoCollectiveHero from "../../assets/eco-collective-hero.png";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-100">
              Create sustainable businesses through collective collaboration
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Connect with like-minded individuals, share resources, and build equitable businesses that prioritize people and planet.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button size="lg" variant="default" className="bg-amber-300 text-primary hover:bg-amber-200">
                <Link href="/discover">Find Collaborators</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-amber-300 hover:bg-amber-300/10 text-amber-300">
                <Link href="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="md:block md:w-1/2 mt-8 md:mt-0">
            <div className="rounded-lg shadow-2xl overflow-hidden h-80 lg:h-[400px] flex items-center justify-center">
              <img 
                src={ecoCollectiveHero} 
                alt="Eco-Collective: People collaborating around a sustainable world" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
