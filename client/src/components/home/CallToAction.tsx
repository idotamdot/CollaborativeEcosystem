import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">
          Ready to Build a Sustainable Business Collectively?
        </h2>
        <p className="mt-4 text-xl text-white/90 max-w-3xl mx-auto">
          Join our community of changemakers creating ecological, equitable enterprises together.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0">
          <Button size="lg" variant="default" className="bg-white text-primary hover:bg-neutral-100">
            <Link href="/profile">Create Your Profile</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-white hover:bg-white/10 text-white">
            <Link href="/projects">Browse Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
