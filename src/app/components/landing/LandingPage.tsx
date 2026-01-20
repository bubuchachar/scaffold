import { useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { FeatureCards } from "./FeatureCards";
import { TrustBar } from "./TrustBar";

interface LandingPageProps {
  onStart?: (projectName: string) => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
  const [projectName, setProjectName] = useState("");
  
  const handleStart = () => {
    if (onStart) {
      onStart(projectName || "Your Project");
    }
  };
  
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-[#8B72FF] selection:text-white">
      <Header />
      <main>
        <Hero 
          projectName={projectName}
          onProjectNameChange={setProjectName}
          onStart={handleStart}
        />
        <FeatureCards />
        <TrustBar />
      </main>
      
      {/* Updated Footer */}
      <footer className="py-12 text-center text-[#4a5568] text-sm font-['Inter',sans-serif] border-t border-[#e2e8f0]">
        <p>&copy; 2026 Scaffold. Built for student UX teams.</p>
      </footer>
    </div>
  );
};
