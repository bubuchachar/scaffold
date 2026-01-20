import * as React from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { WizardHeader } from "./WizardHeader";
import { QuestionHeader } from "./QuestionHeader";
import { motion } from "motion/react";

interface RoleOption {
  id: string;
  label: string;
}

const roles: RoleOption[] = [
  { id: "pm", label: "Project Manager (PM)" },
  { id: "uxr", label: "UX Researcher (UXR)" },
  { id: "ui", label: "UI Designer (UI)" },
];

interface WizardStep3Props {
  initialRoles?: string[];
  onNext?: (roles: string[]) => void;
  onBack?: () => void;
}

export const WizardStep3 = ({ initialRoles = [], onNext, onBack }: WizardStep3Props) => {
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>(initialRoles);

  const toggleRole = (roleId: string) => {
    setSelectedRoles((prev) => 
      prev.includes(roleId) 
        ? prev.filter((id) => id !== roleId) 
        : [...prev, roleId]
    );
  };

  const handleNext = () => {
    if (onNext && selectedRoles.length > 0) {
      onNext(selectedRoles);
    }
  };

  // Validation: Check if at least one role is selected
  const isValid = selectedRoles.length > 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a2332] flex flex-col">
      <WizardHeader />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center pt-16">
        {/* Progress Stepper */}
        <QuestionHeader currentStep={3} />

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
              Question 3 of 6
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-bold text-[32px] text-[#1a2332] leading-tight mb-3">
            Which roles are on your team?
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-[16px] text-[#4a5568] leading-relaxed mb-8">
            Select all that apply. We'll install only the cards your team needs.
          </p>

          {/* Checkboxes */}
          <div className="flex flex-col gap-4 mb-10">
            {roles.map((role) => {
              const isSelected = selectedRoles.includes(role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggleRole(role.id)}
                  className={cn(
                    "relative flex items-center w-full p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                    isSelected 
                      ? "border-[#6A4FFF] bg-[#6A4FFF]/5 shadow-[0_0_0_1px_rgba(106,79,255,0.1)]" 
                      : "border-[#e2e8f0] bg-white hover:bg-gray-50"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded border-2 mr-4 flex items-center justify-center transition-colors",
                    isSelected 
                      ? "bg-[#6A4FFF] border-[#6A4FFF]" 
                      : "border-[#cbd5e1] bg-white"
                  )}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </div>
                  <span className={cn(
                    "text-[16px] font-medium font-['Inter',sans-serif]",
                    isSelected ? "text-[#1a2332]" : "text-[#4a5568]"
                  )}>
                    {role.label}
                  </span>
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
              disabled={!isValid}
              className={cn(
                "flex-1 h-[52px] text-[16px] font-semibold rounded-xl transition-all shadow-[0_4px_14px_rgba(106,79,255,0.3)]",
                isValid
                  ? "text-white bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] hover:opacity-90 hover:translate-y-[-1px] cursor-pointer"
                  : "text-[#94a3b8] bg-[#e2e8f0] cursor-not-allowed shadow-none"
              )}
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
