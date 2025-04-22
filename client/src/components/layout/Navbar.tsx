import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L4,5v6c0,5.5,3.8,10.7,8,12,4.2-1.3,8-6.5,8-12V5L12,2z M12,15c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,15,12,15z M16,10c0,2.2-1.8,4-4,4s-4-1.8-4-4c0-1.9,1.3-3.4,3-3.9V3.5l1-0.3l1,0.3v2.6C14.7,6.6,16,8.1,16,10z"></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-primary">Eco-Collective</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/discover" className={`${location === "/discover" ? "text-primary" : "text-neutral-800"} hover:text-primary font-medium`}>
              Discover
            </Link>
            <Link href="/projects" className={`${location === "/projects" ? "text-primary" : "text-neutral-800"} hover:text-primary font-medium`}>
              Projects
            </Link>
            <Link href="/resources" className={`${location === "/resources" ? "text-primary" : "text-neutral-800"} hover:text-primary font-medium`}>
              Resources
            </Link>
            <Link href="/community" className={`${location === "/community" ? "text-primary" : "text-neutral-800"} hover:text-primary font-medium`}>
              Community
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button>
              Create Project
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              type="button" 
              className="text-neutral-800 hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link href="/discover" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-800 hover:text-primary hover:bg-neutral-100">
              Discover
            </Link>
            <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-800 hover:text-primary hover:bg-neutral-100">
              Projects
            </Link>
            <Link href="/resources" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-800 hover:text-primary hover:bg-neutral-100">
              Resources
            </Link>
            <Link href="/community" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-800 hover:text-primary hover:bg-neutral-100">
              Community
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
