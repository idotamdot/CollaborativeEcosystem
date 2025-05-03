import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Discover from "@/pages/Discover";
import SteewardshipModel from "@/pages/SteewardshipModel";
import Resources from "@/pages/Resources";
import HowItWorks from "@/pages/HowItWorks";

// Placeholder component for pages still under development
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-6">{title}</h1>
    <p className="text-lg text-gray-600">This page is under construction.</p>
  </div>
);

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
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
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
