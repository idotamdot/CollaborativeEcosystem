import React from 'react';
import { Link } from 'wouter';
import { Leaf, ArrowRight, Mail, Instagram, Twitter, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 mr-2 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-600">Eco-Collective</h2>
            </div>
            <p className="max-w-md text-slate-600">
              A collaborative platform empowering entrepreneurs to form equitable, sustainable business 
              ventures through skill matching and collective resource sharing.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-slate-500 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/how-it-works"><span className="text-slate-600 hover:text-blue-600">How It Works</span></Link></li>
                <li><Link href="/projects"><span className="text-slate-600 hover:text-blue-600">Browse Projects</span></Link></li>
                <li><Link href="/discover"><span className="text-slate-600 hover:text-blue-600">Find Collaborators</span></Link></li>
                <li><Link href="/resources"><span className="text-slate-600 hover:text-blue-600">Resource Library</span></Link></li>
                <li><Link href="/success-stories"><span className="text-slate-600 hover:text-blue-600">Success Stories</span></Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/business-models"><span className="text-slate-600 hover:text-blue-600">Business Models</span></Link></li>
                <li><Link href="/ecological-assessment"><span className="text-slate-600 hover:text-blue-600">Ecological Assessment</span></Link></li>
                <li><Link href="/revenue-sharing"><span className="text-slate-600 hover:text-blue-600">Revenue Sharing</span></Link></li>
                <li><Link href="/governance"><span className="text-slate-600 hover:text-blue-600">Governance Structures</span></Link></li>
                <li><Link href="/legal-resources"><span className="text-slate-600 hover:text-blue-600">Legal Resources</span></Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">About</h3>
              <ul className="space-y-2">
                <li><Link href="/mission"><span className="text-slate-600 hover:text-blue-600">Our Mission</span></Link></li>
                <li><Link href="/team"><span className="text-slate-600 hover:text-blue-600">Team</span></Link></li>
                <li><Link href="/partners"><span className="text-slate-600 hover:text-blue-600">Partners</span></Link></li>
                <li><Link href="/contact"><span className="text-slate-600 hover:text-blue-600">Contact Us</span></Link></li>
                <li><Link href="/privacy"><span className="text-slate-600 hover:text-blue-600">Privacy Policy</span></Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-base font-medium text-slate-900">Subscribe to our newsletter</h3>
              <p className="mt-2 text-sm text-slate-600">
                Stay updated on new projects, resources, and ecological business opportunities.
              </p>
              <div className="mt-4 flex max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button type="submit" className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-start lg:justify-end">
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} Eco-Collective. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;