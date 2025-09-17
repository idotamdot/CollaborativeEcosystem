import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Discover from "@/pages/Discover";
import SteewardshipModel from "@/pages/SteewardshipModel";
import Resources from "@/pages/Resources";
import HowItWorks from "@/pages/HowItWorks";
import PrintableForms from "@/pages/PrintableForms";
import TimesheetTracker from "@/pages/TimesheetTracker";
import EcoDictionary from "@/pages/EcoDictionary";
import LegalTemplates from "@/pages/LegalTemplates";
import TaskAutomation from "@/pages/TaskAutomation";
import EcologicalImpact from "@/pages/EcologicalImpact";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

// Placeholder component for pages still under development
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-6">{title}</h1>
    <p className="text-lg text-gray-600">This page is under construction.</p>
  </div>
);

function Router() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className={`flex flex-col ${isMobile ? 'w-full' : 'ml-64 w-[calc(100%-16rem)]'}`}>
        <main className="flex-grow">
          <div className="p-6">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/profile" component={Profile} />
              <Route path="/projects" component={Projects} />
              <Route path="/projects/:id" component={ProjectDetail} />
              <Route path="/discover" component={Discover} />
              <Route path="/stewardship-model" component={SteewardshipModel} />
              <Route path="/resources" component={Resources} />
              <Route path="/how-it-works" component={HowItWorks} />
              
              {/* Platform section */}
              <Route path="/success-stories">
                <PlaceholderPage title="Success Stories" />
              </Route>
              
              {/* Resources section */}
              <Route path="/business-models">
                <PlaceholderPage title="Business Models" />
              </Route>
              <Route path="/ecological-assessment">
                <PlaceholderPage title="Ecological Assessment" />
              </Route>
              <Route path="/revenue-sharing">
                <PlaceholderPage title="Revenue Sharing Templates" />
              </Route>
              <Route path="/governance">
                <PlaceholderPage title="Governance Structures" />
              </Route>
              <Route path="/legal-resources">
                <PlaceholderPage title="Legal Resources" />
              </Route>
              
              {/* Printable resources section */}
              <Route path="/printable" component={PrintableForms} />
              <Route path="/printable/forms" component={PrintableForms} />
              <Route path="/printable/legal" component={PrintableForms} />
              <Route path="/printable/workbooks" component={PrintableForms} />
              
              {/* Business Tools section */}
              <Route path="/timesheet" component={TimesheetTracker} />
              <Route path="/dictionary" component={EcoDictionary} />
              <Route path="/legal-templates" component={LegalTemplates} />
              <Route path="/task-automation" component={TaskAutomation} />
              <Route path="/ecological-impact" component={EcologicalImpact} />
              
              {/* About section */}
              <Route path="/mission">
                <PlaceholderPage title="Our Mission" />
              </Route>
              <Route path="/team">
                <PlaceholderPage title="Team" />
              </Route>
              <Route path="/partners">
                <PlaceholderPage title="Partners" />
              </Route>
              <Route path="/contact">
                <PlaceholderPage title="Contact Us" />
              </Route>
              <Route path="/privacy">
                <PlaceholderPage title="Privacy Policy" />
              </Route>
              
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
