import { Check, Circle, Loader2 } from "lucide-react";
import { cn } from "../ui/utils";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Project", shortLabel: "Project" },
  { id: 2, label: "Deadline", shortLabel: "Deadline" },
  { id: 3, label: "Roles", shortLabel: "Roles" },
  { id: 4, label: "Intensity", shortLabel: "Intensity" },
  { id: 5, label: "Options", shortLabel: "Options" },
  { id: 6, label: "Team", shortLabel: "Team" }
];

export const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="w-full max-w-[700px] mx-auto px-4 mb-12">
      {/* Pipeline Container */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-sans font-semibold text-[14px] text-[#1a2332] mb-1">
              Installation Progress
            </h3>
            <p className="font-sans text-[12px] text-[#4a5568]">
              {currentStep > steps.length 
                ? `Ready to install` 
                : `Step ${currentStep} of ${steps.length}`
              }
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono font-semibold text-[18px] text-[#6A4FFF]">
              {currentStep > steps.length 
                ? "100%" 
                : `${Math.round((currentStep / steps.length) * 100)}%`
              }
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-[#f8fafc] rounded-full mb-8 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8B72FF] to-[#6A4FFF] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>

        {/* Pipeline Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const stepNumber = step.id;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div 
                key={step.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg transition-all duration-300",
                  isActive && "bg-[#6A4FFF]/5 border-2 border-[#6A4FFF]/20",
                  (isCompleted || isUpcoming) && "border-2 border-transparent"
                )}
              >
                {/* Status Icon */}
                <div 
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                    isCompleted && "bg-[#10D48E] text-white shadow-sm",
                    isActive && "bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] text-white shadow-md shadow-[#6A4FFF]/20",
                    isUpcoming && "bg-[#f8fafc] border-2 border-[#e2e8f0] text-[#cbd5e1]"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </div>

                {/* Step Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Status Badge */}
                    <span 
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                        isCompleted && "bg-[#10D48E]/10 text-[#10D48E]",
                        isActive && "bg-[#6A4FFF]/10 text-[#6A4FFF]",
                        isUpcoming && "bg-[#f8fafc] text-[#94a3b8]"
                      )}
                    >
                      {isCompleted ? "Complete" : isActive ? "In Progress" : "Queued"}
                    </span>
                    
                    {/* Step Number */}
                    <span className="text-[11px] font-mono text-[#94a3b8]">
                      {stepNumber}/{steps.length}
                    </span>
                  </div>
                  
                  {/* Step Label */}
                  <p 
                    className={cn(
                      "font-sans font-medium text-[15px] transition-colors duration-300",
                      isCompleted && "text-[#10D48E]",
                      isActive && "text-[#1a2332]",
                      isUpcoming && "text-[#94a3b8]"
                    )}
                  >
                    {step.label}
                  </p>
                </div>

                {/* Completion Time (for completed steps) */}
                {isCompleted && (
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-[#10D48E] font-medium">
                      ✓ Done
                    </span>
                  </div>
                )}

                {/* Active Indicator */}
                {isActive && (
                  <div className="shrink-0">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6A4FFF] animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6A4FFF] animate-pulse delay-75" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6A4FFF] animate-pulse delay-150" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
