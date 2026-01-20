import { Button } from "../ui/button";
import { BrowserMockup } from "./BrowserMockup";
import { motion } from "motion/react";

interface HeroProps {
  projectName?: string;
  onProjectNameChange?: (name: string) => void;
  onStart?: () => void;
}

export const Hero = ({ projectName = "", onProjectNameChange, onStart }: HeroProps) => {
  return (
    <section className="pt-20 pb-20 px-6 bg-[#f8fafc] text-center overflow-hidden">
      <div className="container mx-auto max-w-5xl flex flex-col items-center">
        
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#6A4FFF] mb-8"
        >
          <span className="text-white text-xs font-bold tracking-wider uppercase font-['Inter',sans-serif]">
            Setup wizard for student PMs
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-['Fraunces',serif] font-bold text-5xl md:text-[64px] leading-[1.1] text-[#1a2332] mb-6 max-w-4xl tracking-tight"
        >
          Start your UX project in Trello in 6 questions.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-['Inter',sans-serif] text-lg md:text-xl text-[#4a5568] mb-10 max-w-2xl leading-relaxed"
        >
          Stop guessing what to do next. Scaffold installs phases and role-based tasks so you can assign work immediately and get moving.
        </motion.p>

        {/* Time Badge - Moved Up */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-[#4a5568] font-medium font-['Inter',sans-serif] bg-white/60 px-4 py-2 rounded-full border border-[#e2e8f0]/60 mb-12"
        >
          ⏱ 6 questions + 90 seconds = your board is ready
        </motion.div>

        {/* Project Name Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-[600px] flex flex-col items-center mb-16"
        >
          <label className="text-[#1a2332] font-semibold font-['Inter',sans-serif] text-base mb-4">
            What's your project name?
          </label>
          
          <input 
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange?.(e.target.value)}
            placeholder="e.g., Campus Food Delivery App"
            className="w-full p-4 border-2 border-[#e2e8f0] rounded-xl text-base font-['Inter',sans-serif] focus:outline-none focus:border-[#6A4FFF] focus:shadow-[0_0_0_4px_rgba(106,79,255,0.1)] transition-all mb-4 text-[#1a2332] placeholder-[#94a3b8] bg-white"
          />
          
          <Button 
            onClick={onStart}
            className="w-full h-auto py-4 bg-gradient-to-r from-[#8B72FF] to-[#6A4FFF] hover:opacity-90 hover:translate-y-[-1px] transition-all text-white text-lg font-semibold rounded-xl shadow-[0_4px_14px_rgba(106,79,255,0.3)] border-none mb-4"
          >
            Create my Trello board →
          </Button>
          
          <a href="#how-it-works" className="text-[#4a5568] text-sm font-medium font-['Inter',sans-serif] hover:text-[#1a2332] transition-colors cursor-pointer">
            See what gets installed ↓
          </a>
        </motion.div>

        {/* Browser Mockup */}
        <motion.div 
          id="how-it-works"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full relative z-10"
        >
            <BrowserMockup />
        </motion.div>

      </div>
    </section>
  );
};
