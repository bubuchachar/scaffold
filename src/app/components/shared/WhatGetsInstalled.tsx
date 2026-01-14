import { Layers, List, FileText, Check } from "lucide-react";

interface WhatGetsInstalledProps {
  variant?: "default" | "compact" | "preview";
  showTitle?: boolean;
  projectName?: string;
  workspace?: string;
  phaseCount?: number;
  listCount?: number;
  cardCount?: number;
  roles?: string[];
  className?: string;
}

export const WhatGetsInstalled = ({
  variant = "default",
  showTitle = true,
  projectName,
  workspace,
  phaseCount = 8,
  listCount = 8,
  cardCount = 42,
  roles = ["pm", "uxr", "ui"],
  className = ""
}: WhatGetsInstalledProps) => {
  
  // Generate dynamic description based on roles
  const getRoleDescription = () => {
    const roleNames: { [key: string]: string } = {
      'pm': 'PM',
      'uxr': 'UXR',
      'ui': 'UI'
    };
    
    if (roles.length === 3) {
      return "Tailored to your full team: PM, UXR, UI";
    } else if (roles.length === 2) {
      const names = roles.map(r => roleNames[r]).join(', ');
      return `Tailored to your team: ${names}`;
    } else if (roles.length === 1) {
      return `Focused on ${roleNames[roles[0]]} tasks only`;
    }
    return "Role-based tasks with Definition of Done checklists";
  };
  
  // Compact variant - just the 3 items, no context
  if (variant === "compact") {
    return (
      <div className={`space-y-3 ${className}`}>
        {/* Phases */}
        <div className="flex items-center gap-3 text-sm">
          <Layers className="w-4 h-4 text-[#6A4FFF]" />
          <span className="font-medium text-[#1a2332]">{phaseCount} phases</span>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-3 text-sm">
          <List className="w-4 h-4 text-[#6A4FFF]" />
          <span className="font-medium text-[#1a2332]">{listCount} lists</span>
        </div>

        {/* Cards */}
        <div className="flex items-center gap-3 text-sm">
          <FileText className="w-4 h-4 text-[#6A4FFF]" />
          <span className="font-medium text-[#1a2332]">{cardCount} cards</span>
        </div>
      </div>
    );
  }

  // Preview variant - detailed boxes (used in Preview screen)
  if (variant === "preview") {
    return (
      <div className={className}>
        {showTitle && (
          <h3 className="font-sans font-semibold text-[15px] text-[#4a5568] mb-6 uppercase tracking-wide">
            What Gets Installed
          </h3>
        )}
        
        <div className="space-y-4">
          {/* Phases */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-[#e2e8f0]">
              <Layers className="w-5 h-5 text-[#6A4FFF]" />
            </div>
            <div className="flex-1">
              <p className="font-sans font-semibold text-[16px] text-[#1a2332]">
                {phaseCount} phases
              </p>
              <p className="font-sans text-[13px] text-[#4a5568]">
                Kickoff → Frame → Research → Synthesis → Define → UI System → Prototype → Testing
              </p>
            </div>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-[#e2e8f0]">
              <List className="w-5 h-5 text-[#6A4FFF]" />
            </div>
            <div className="flex-1">
              <p className="font-sans font-semibold text-[16px] text-[#1a2332]">
                {listCount} lists
              </p>
              <p className="font-sans text-[13px] text-[#4a5568]">
                One list per phase for organized workflow
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-[#e2e8f0]">
              <FileText className="w-5 h-5 text-[#6A4FFF]" />
            </div>
            <div className="flex-1">
              <p className="font-sans font-semibold text-[16px] text-[#1a2332]">
                {cardCount} cards
              </p>
              <p className="font-sans text-[13px] text-[#4a5568]">
                {getRoleDescription()}
              </p>
            </div>
          </div>
        </div>

        {/* Decision Log Note */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#10D48E]/5 border border-[#10D48E]/20 mt-4">
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-[#10D48E] stroke-[3]" />
          </div>
          <div className="flex-1">
            <p className="font-sans text-[14px] text-[#4a5568] leading-relaxed">
              <span className="font-semibold text-[#1a2332]">Decision Log included:</span> Track all major decisions with timestamps and rationale
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default variant - with board name and workspace context
  return (
    <div className={`bg-white rounded-xl border border-[#e2e8f0] p-6 ${className}`}>
      {showTitle && (
        <h3 className="font-sans font-semibold text-[16px] text-[#1a2332] mb-4">
          What Gets Installed
        </h3>
      )}

      {/* Board Name (if provided) */}
      {projectName && (
        <div className="mb-4 pb-4 border-b border-[#e2e8f0]">
          <p className="text-[13px] text-[#4a5568] mb-1">Board name</p>
          <p className="font-semibold text-[15px] text-[#1a2332]">{projectName}</p>
        </div>
      )}

      {/* Workspace (if provided) */}
      {workspace && (
        <div className="mb-4 pb-4 border-b border-[#e2e8f0]">
          <p className="text-[13px] text-[#4a5568] mb-1">Workspace</p>
          <p className="font-semibold text-[15px] text-[#1a2332]">{workspace}</p>
        </div>
      )}

      {/* Includes Section */}
      <div className="space-y-3">
        <p className="text-[13px] text-[#4a5568] uppercase tracking-wide font-semibold mb-3">
          Includes
        </p>

        {/* Phases */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#6A4FFF]/10 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-[#6A4FFF]" />
          </div>
          <div>
            <p className="font-medium text-[14px] text-[#1a2332]">{phaseCount} phases</p>
            <p className="text-[12px] text-[#4a5568]">Kickoff → Testing</p>
          </div>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#6A4FFF]/10 flex items-center justify-center shrink-0">
            <List className="w-4 h-4 text-[#6A4FFF]" />
          </div>
          <div>
            <p className="font-medium text-[14px] text-[#1a2332]">{listCount} lists</p>
            <p className="text-[12px] text-[#4a5568]">One per phase</p>
          </div>
        </div>

        {/* Cards */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#6A4FFF]/10 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-[#6A4FFF]" />
          </div>
          <div>
            <p className="font-medium text-[14px] text-[#1a2332]">{cardCount} cards</p>
            <p className="text-[12px] text-[#4a5568]">With DoD checklists</p>
          </div>
        </div>

        {/* Decision Log */}
        <div className="flex items-center gap-3 pt-2 mt-2 border-t border-[#e2e8f0]">
          <div className="w-8 h-8 rounded-lg bg-[#10D48E]/10 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-[#10D48E]" />
          </div>
          <div>
            <p className="font-medium text-[14px] text-[#1a2332]">Decision Log</p>
            <p className="text-[12px] text-[#4a5568]">Track key decisions</p>
          </div>
        </div>
      </div>
    </div>
  );
};
