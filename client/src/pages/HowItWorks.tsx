import React from 'react';
import { Link } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">How It Works</h1>
      <div className="prose max-w-none">
        <p>
          Overview of the ecosystem, workflows, matching, and collaboration structure for the Eco-Collective platform.
        </p>
        
        <p>This page is under construction.</p>
      </div>
    </div>
  );
};

export default HowItWorks;