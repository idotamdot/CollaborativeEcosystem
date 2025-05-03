import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MainNav = () => {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const NavLinks = () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/how-it-works">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">How It Works</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Overview of the ecosystem, workflows, matching, and collaboration structure
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/projects">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Browse Projects</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Explore open and ongoing projects available for contribution or inspiration
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/discover">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Find Collaborators</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Use profile matching and interest filters to form ideal teams
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/resources">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Resource Library</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Open educational materials, templates, datasets, and community tools
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/success-stories">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Success Stories</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Highlighted case studies from successful Eco CoLab collaborations
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/business-models">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Business Models</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Frameworks for equitable revenue generation and cooperative ownership
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/ecological-assessment">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Ecological Assessment</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Impact evaluation and sustainability checklists for every initiative
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/revenue-sharing">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Revenue Sharing Templates</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Standardized documents for implementing fair compensation
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/governance">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Governance Structures</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Examples and tools for transparent and non-hierarchical decision-making
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/legal-resources">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Legal Resources</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Contracts, cooperative bylaws, and legal aid suggestions for community-led ventures
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/mission">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Our Mission</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Statement of purpose and vision for global stewardship and equality
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/team">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Team</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Bios and contributions of the humans and AI who co-build this platform
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/partners">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Partners</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Aligned organizations and networks supporting the ecosystem
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/contact">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Contact Us</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Get in touch for support, collaboration, or community onboarding
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/privacy">
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Privacy Policy</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Commitment to ethical data use, privacy, and collective transparency
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link href="/stewardship-model">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Stewardship Model
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
  
  const MobileNav = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <div className="pt-6 space-y-4">
          <div className="font-medium text-lg">Platform</div>
          <ul className="space-y-2 pl-2">
            <li>
              <Link href="/how-it-works">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  How It Works
                </span>
              </Link>
            </li>
            <li>
              <Link href="/projects">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Browse Projects
                </span>
              </Link>
            </li>
            <li>
              <Link href="/discover">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Find Collaborators
                </span>
              </Link>
            </li>
            <li>
              <Link href="/resources">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Resource Library
                </span>
              </Link>
            </li>
            <li>
              <Link href="/success-stories">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Success Stories
                </span>
              </Link>
            </li>
          </ul>
          
          <div className="font-medium text-lg pt-4">Resources</div>
          <ul className="space-y-2 pl-2">
            <li>
              <Link href="/business-models">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Business Models
                </span>
              </Link>
            </li>
            <li>
              <Link href="/ecological-assessment">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Ecological Assessment
                </span>
              </Link>
            </li>
            <li>
              <Link href="/revenue-sharing">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Revenue Sharing Templates
                </span>
              </Link>
            </li>
            <li>
              <Link href="/governance">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Governance Structures
                </span>
              </Link>
            </li>
            <li>
              <Link href="/legal-resources">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Legal Resources
                </span>
              </Link>
            </li>
          </ul>
          
          <div className="font-medium text-lg pt-4">About</div>
          <ul className="space-y-2 pl-2">
            <li>
              <Link href="/mission">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Our Mission
                </span>
              </Link>
            </li>
            <li>
              <Link href="/team">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Team
                </span>
              </Link>
            </li>
            <li>
              <Link href="/partners">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Partners
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Contact Us
                </span>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <span className="block py-2 text-blue-600 hover:text-blue-800" onClick={() => setIsOpen(false)}>
                  Privacy Policy
                </span>
              </Link>
            </li>
          </ul>
          
          <div className="pt-4">
            <Link href="/stewardship-model">
              <span className="block py-2 text-blue-600 hover:text-blue-800 font-medium" onClick={() => setIsOpen(false)}>
                Stewardship Model
              </span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  return (
    <div className="flex h-16 items-center px-4 border-b">
      <div className="mr-6">
        <Link href="/">
          <div className="font-bold text-xl text-blue-600 flex items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
              Eco-Collective
            </span>
          </div>
        </Link>
      </div>
      
      {isMobile ? (
        <MobileNav />
      ) : (
        <NavLinks />
      )}
      
      <div className="ml-auto flex items-center space-x-4">
        <Link href="/profile">
          <Button variant="ghost" size="sm">Profile</Button>
        </Link>
        <Button size="sm">Sign In</Button>
      </div>
    </div>
  );
};

export default MainNav;