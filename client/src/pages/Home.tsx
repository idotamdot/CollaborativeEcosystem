import Hero from "@/components/home/Hero";
import MatchingProcess from "@/components/home/MatchingProcess";
import MatchingVisual from "@/components/home/MatchingVisual";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import ProfileSection from "@/components/home/ProfileSection";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

const Home = () => {
  return (
    <div>
      <Hero />
      <MatchingProcess />
      <MatchingVisual />
      <ProjectShowcase />
      <FeatureHighlights />
      <ProfileSection />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
