import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  Grid, 
  Leaf, 
  BookOpen, 
  Download,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Clock,
  Calendar,
  Car,
  Book
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

type SidebarItemType = {
  title: string;
  path: string;
  icon: React.ReactNode;
  submenu?: { title: string; path: string }[];
};

const sidebarItems: SidebarItemType[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: 'How It Works',
    path: '/how-it-works',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: 'Browse Projects',
    path: '/projects',
    icon: <Grid className="h-5 w-5" />,
  },
  {
    title: 'Find Collaborators',
    path: '/discover',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Resource Library',
    path: '/resources',
    icon: <FileText className="h-5 w-5" />,
    submenu: [
      { title: 'All Resources', path: '/resources' },
      { title: 'Business Models', path: '/business-models' },
      { title: 'Ecological Assessment', path: '/ecological-assessment' },
      { title: 'Revenue Sharing', path: '/revenue-sharing' },
      { title: 'Governance Structures', path: '/governance' },
      { title: 'Legal Resources', path: '/legal-resources' },
    ],
  },
  {
    title: 'Stewardship Model',
    path: '/stewardship-model',
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    title: 'Business Tools',
    path: '/timesheet',
    icon: <Clock className="h-5 w-5" />,
    submenu: [
      { title: 'Timesheet Tracker', path: '/timesheet' },
      { title: 'Eco Dictionary', path: '/dictionary' },
      { title: 'Tax Reporting', path: '/timesheet?tab=tax' },
      { title: 'Weekly Reports', path: '/timesheet?tab=reports' },
    ],
  },
  {
    title: 'Printable Resources',
    path: '/printable',
    icon: <Download className="h-5 w-5" />,
    submenu: [
      { title: 'Forms & Worksheets', path: '/printable/forms' },
      { title: 'Legal Documents', path: '/printable/legal' },
      { title: 'Workbooks', path: '/printable/workbooks' },
    ],
  },
  {
    title: 'Success Stories',
    path: '/success-stories',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: 'About',
    path: '/mission',
    icon: <Settings className="h-5 w-5" />,
    submenu: [
      { title: 'Our Mission', path: '/mission' },
      { title: 'Team', path: '/team' },
      { title: 'Partners', path: '/partners' },
      { title: 'Contact Us', path: '/contact' },
      { title: 'Privacy Policy', path: '/privacy' },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [location] = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  
  const isActive = (path: string) => location === path;
  
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
              Eco-Collective
            </span>
          </div>
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4 overflow-auto">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
                      isActive(item.path) ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    {expandedItems[item.title] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedItems[item.title] && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <Link href={subItem.path}>
                            <span
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm font-medium",
                                isActive(subItem.path) ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100"
                              )}
                              onClick={isMobile ? () => setIsOpen(false) : undefined}
                            >
                              {subItem.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link href={item.path}>
                  <span
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      isActive(item.path) ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-100"
                    )}
                    onClick={isMobile ? () => setIsOpen(false) : undefined}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
          Create Project
        </Button>
      </div>
    </div>
  );
  
  if (isMobile) {
    return (
      <>
        <div className="h-16 flex items-center px-4 border-b">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-4">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          
          <Link href="/">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
                Eco-Collective
              </span>
            </div>
          </Link>
        </div>
      </>
    );
  }
  
  return (
    <div className={cn("w-64 h-screen flex-shrink-0 border-r bg-white fixed left-0 top-0", className)}>
      <SidebarContent />
    </div>
  );
};

export default Sidebar;