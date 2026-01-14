import { WizardHeader } from "./WizardHeader";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { motion } from "motion/react";
import { WhatGetsInstalled } from "../shared/WhatGetsInstalled";
import { CompletionBanner } from "./CompletionBanner";
import { getCardCount, getPhaseCount, getListCount } from "../../utils/cardTemplates";

interface WizardPreviewProps {
  projectName?: string;
  workspace?: string;
  roles?: string[];
  onNext?: () => void;
  onBack?: () => void;
}

export const WizardPreview = ({ 
  projectName = "Your Project", 
  workspace = "My Workspace",
  roles = ["pm", "uxr", "ui"], // Default to all roles
  onNext, 
  onBack 
}: WizardPreviewProps) => {
  // Calculate dynamic counts based on selected roles
  const phaseCount = getPhaseCount();
  const listCount = getListCount();
  const cardCount = getCardCount(roles);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a2332] pb-20">
      <WizardHeader />

      <main className="container mx-auto px-4 pt-24 md:pt-32 flex flex-col items-center">
        
        {/* Completion Banner - Simple one-line */}
        <CompletionBanner />

        {/* Preview Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-2xl"
        >
          <h1 className="font-serif font-bold text-[40px] text-[#1a2332] leading-tight mb-3">
            Preview what we'll install
          </h1>
          <p className="font-sans text-[18px] text-[#4a5568] leading-relaxed">
            Here's what we'll create in Trello. No surprises.
          </p>
        </motion.div>

        {/* Preview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-[700px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-[#e2e8f0] mb-8"
        >
          {/* Board Name */}
          <div className="mb-8 pb-8 border-b border-[#e2e8f0]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] flex items-center justify-center shrink-0 shadow-lg shadow-[#6A4FFF]/20">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-sans font-semibold text-[15px] text-[#4a5568] mb-2 uppercase tracking-wide">
                  Board Name
                </h3>
                <p className="font-serif font-bold text-[24px] text-[#1a2332] leading-tight">
                  {projectName}
                </p>
              </div>
            </div>
          </div>

          {/* Workspace */}
          <div className="mb-8 pb-8 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-sans font-semibold text-[15px] text-[#4a5568] uppercase tracking-wide">
                Workspace
              </h3>
            </div>
            <p className="font-sans text-[18px] text-[#1a2332] font-medium">
              {workspace}
            </p>
          </div>

          {/* What Gets Installed */}
          <WhatGetsInstalled 
            variant="preview"
            phaseCount={phaseCount}
            listCount={listCount}
            cardCount={cardCount}
            roles={roles}
          />
        </motion.div>

        {/* Trust Line */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-8 max-w-xl"
        >
          <p className="font-sans text-[14px] text-[#4a5568] leading-relaxed">
            We only create what you request. No reading other boards. Revoke anytime.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full max-w-[700px] flex gap-4 flex-col sm:flex-row"
        >
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex-1 h-[52px] text-[16px] font-semibold text-[#4a5568] border-2 border-[#e2e8f0] hover:bg-gray-50 hover:text-[#1a2332] rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button 
            onClick={onNext}
            className="flex-1 h-[52px] text-[16px] font-semibold text-white bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] hover:opacity-90 hover:translate-y-[-1px] transition-all rounded-xl shadow-[0_4px_14px_rgba(106,79,255,0.3)]"
          >
            Connect Trello & install
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
};
