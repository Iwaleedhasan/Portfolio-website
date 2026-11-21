import Navbar from "@/components/Navbar";
import HeroMorph from "@/components/HeroMorph";
import TechStackGrid from "@/components/TechStackGrid";
import ProjectFolderCard from "@/components/ProjectFolderCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";
import CrowdFooter from "@/components/CrowdFooter";
import AiChatWidget from "@/components/AiChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] relative selection:bg-white selection:text-black">
      <Navbar />
      <HeroMorph />
      <TechStackGrid />
      <ProjectFolderCard />
      <ExperienceTimeline />
      <ContactSection />
      <CrowdFooter />
      <AiChatWidget />
    </main>
  );
}
