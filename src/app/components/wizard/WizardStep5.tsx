import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { WizardHeader } from "./WizardHeader";
import { QuestionHeader } from "./QuestionHeader";
import { motion } from "motion/react";

interface SeatbeltOption {
  id: string;
  title: string;
  description: string;
}

const options: SeatbeltOption[] = [
  {
    id: "yes",
    title: "Yes, include UI Seatbelt (Recommended)",
    description: "Adds tokens setup, component library, and theme crash test. Prevents technical debt and ensures design system integrity."
  },
  {
    id: "no",
    title: "No, skip it",
    description: "Jump straight from Define to Prototype. Only choose this if your team has strong design systems experience."
  }
];

interface WizardStep5Props {
  initialOptions?: string[];
  onNext?: (options: string[]) => void;
  onBack?: () => void;
}

export const WizardStep5 = ({ initialOptions = ["yes"], onNext, onBack }: WizardStep5Props) => {
  // For this screen it's a single choice, but we store as array for consistency
  const [selectedOption, setSelectedOption] = React.useState<string>(initialOptions[0] || "yes");

  const handleNext = () => {
    if (onNext) {
      onNext([selectedOption]); // Pass as array
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a2332] flex flex-col">
      <WizardHeader />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center pt-16">
        {/* Progress Stepper */}
        <QuestionHeader currentStep={5} />

        {/* Question Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[700px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-[#e2e8f0]"
        >
          {/* Label */}
          <div className="mb-4">
            <span className="text-[#6A4FFF] text-sm font-bold tracking-wider uppercase">
              Question 5 of 6
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-bold text-[32px] text-[#1a2332] leading-tight mb-3">
            Include UI Seatbelt phase?
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-[16px] text-[#4a5568] leading-relaxed mb-8">
            The UI Seatbelt is a design systems check that ensures your tokens cascade properly. Highly recommended for teams new to component-based design.
          </p>

          {/* Radio Options */}
          <div className="flex flex-col gap-4 mb-10">
            {options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={cn(
                    "relative flex items-start w-full p-5 rounded-xl border-2 cursor-pointer transition-all duration-200",
                    isSelected 
                      ? "border-[#6A4FFF] bg-[#6A4FFF]/5 shadow-[0_0_0_1px_rgba(106,79,255,0.1)]" 
                      : "border-[#e2e8f0] bg-white hover:bg-gray-50"
                  )}
                >
                  {/* Radio Circle */}
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 mr-4 mt-1 flex items-center justify-center shrink-0 transition-colors",
                    isSelected 
                      ? "border-[#6A4FFF]" 
                      : "border-[#cbd5e1] bg-white"
                  )}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#6A4FFF]" />}
                  </div>
                  
                  {/* Text Content */}
                  <div>
                    <h3 className={cn(
                      "text-[16px] font-semibold font-['Inter',sans-serif] mb-1",
                      isSelected ? "text-[#1a2332]" : "text-[#1a2332]"
                    )}>
                      {option.title}
                    </h3>
                    <p className={cn(
                      "text-[14px] font-normal font-['Inter',sans-serif] leading-relaxed",
                      isSelected ? "text-[#4a5568]" : "text-[#64748b]"
                    )}>
                      {option.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex-1 h-[52px] text-[16px] font-semibold text-[#4a5568] border-2 border-[#e2e8f0] hover:bg-gray-50 hover:text-[#1a2332] rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={handleNext}
              className="flex-1 h-[52px] text-[16px] font-semibold text-white bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] hover:opacity-90 hover:translate-y-[-1px] transition-all rounded-xl shadow-[0_4px_14px_rgba(106,79,255,0.3)]"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </motion.div>
      </main>
    </div>
  );
};
