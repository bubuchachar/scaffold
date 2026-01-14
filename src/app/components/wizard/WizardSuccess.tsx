import { useState } from "react";
import { WizardHeader } from "./WizardHeader";
import { Button } from "../ui/button";
import { Check, ArrowRight, Copy, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export const WizardSuccess = () => {
  const [copied, setCopied] = useState(false);

  // Simulate invite failures (in real app, this would come from API response)
  const inviteFailures = [
    { email: "john.doe@example.com", reason: "User not found in workspace" },
    { email: "invalid-email", reason: "Invalid email format" }
  ];
  
  // Set to empty array to hide failures: const inviteFailures = [];
  const hasInviteFailures = inviteFailures.length > 0;

  const blueprintText = `Root: /[Project Name]/
├── 00_Admin (agreement, decision log)
├── 01_Frame (problem statement, goals)
├── 02_Research (guides, notes, recordings)
├── 03_Synthesis (affinity, insights)
├── 04_Define (flows, IA)
├── 05_UI_System (tokens, components)
├── 06_Prototype (v1, v2, review notes)
├── 07_Testing (plan, scripts, findings)
└── 08_Delivery (final deck, handoff)

Naming: YYYYMMDD_topic_owner_v01
Example: 20260113_research-goals_sarah_v01`;

  const handleCopy = () => {
    // Fallback copy method for environments where navigator.clipboard is blocked
    const copyToClipboard = (text: string) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Ensure textarea is not visible
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
           toast.error("Failed to copy. Please manually copy the text.");
        }
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        toast.error("Failed to copy. Please manually copy the text.");
      }
      
      document.body.removeChild(textArea);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(blueprintText)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(err => {
            console.error('Async: Could not copy text: ', err);
            // Fallback if async fails (e.g. permission denied)
            copyToClipboard(blueprintText);
          });
    } else {
        copyToClipboard(blueprintText);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a2332] pb-20">
      <WizardHeader />
      
      <main className="container mx-auto px-4 pt-24 md:pt-32 flex flex-col items-center">
        
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#10D48E] to-[#059669] flex items-center justify-center shadow-lg shadow-[#10D48E]/20 mb-6">
            <Check className="w-10 h-10 text-white stroke-[3]" />
          </div>
          <h1 className="font-serif font-bold text-[40px] text-[#1a2332] leading-tight mb-3">
            Installed. Your team can start today.
          </h1>
          <p className="font-sans text-[18px] text-[#4a5568] leading-relaxed">
            Your UX Team Kit is ready. Time to start shipping.
          </p>
        </motion.div>

        {/* Primary CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-[700px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-[#e2e8f0] text-center mb-8 relative overflow-hidden group"
        >
          <div className="flex flex-col items-center relative z-10">
            <span className="text-[#6A4FFF] text-sm font-bold tracking-wider uppercase mb-3">
              Do This First
            </span>
            <h2 className="font-serif font-semibold text-[24px] text-[#1a2332] mb-3">
              Open Your Trello Board
            </h2>
            <p className="font-sans text-[16px] text-[#4a5568] mb-8 max-w-md mx-auto">
              Your board is ready with all phases, cards, and definitions of done.
            </p>
            <Button 
              className="h-auto py-5 px-12 text-[18px] font-semibold text-white bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] hover:opacity-90 hover:translate-y-[-1px] transition-all rounded-xl shadow-[0_4px_14px_rgba(106,79,255,0.3)] w-full sm:w-auto"
            >
              Open Board in Trello
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Invite Failures Alert (Non-blocking) */}
        {hasInviteFailures && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="w-full max-w-[700px] mb-8"
          >
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-semibold text-[16px] text-red-900 mb-1">
                    Some invites couldn't be sent
                  </h3>
                  <p className="font-sans text-[14px] text-red-800 leading-relaxed">
                    Your board is ready, but we couldn't invite these team members. You can add them manually in Trello.
                  </p>
                </div>
              </div>

              {/* Failed Invites List */}
              <div className="bg-white/60 rounded-lg p-4 border border-red-200">
                <div className="space-y-2">
                  {inviteFailures.map((failure, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <span className="text-red-600 font-mono shrink-0">×</span>
                      <div className="flex-1">
                        <p className="font-medium text-red-900">{failure.email}</p>
                        <p className="text-red-700 text-xs">{failure.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Text */}
              <div className="mt-4 pt-4 border-t border-red-200">
                <p className="text-[13px] text-red-800 leading-relaxed">
                  <span className="font-semibold">To add them manually:</span> Open your board → Click "Share" → Enter their email addresses
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Copy Onboarding Message Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-full max-w-[700px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-[#e2e8f0] mb-8"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-semibold text-[20px] text-[#1a2332]">
                Send this to your team
              </h3>
              <Button 
                onClick={() => {
                  const message = `Hey team! 👋

Our project board is ready in Trello. Here's what you need to know:

📋 Board: [Project Name]
🔗 Link: [Trello Board URL]

📌 Ground rules:
• Every card has a Definition of Done checklist
• Paste your artifact link when you finish (Google Drive, Figma, etc.)
• No link = not ready for review yet

🗂️ We have a Decision Log for tracking big calls (why we chose X over Y)

First task: Check the Kickoff phase and claim your cards.

Let's ship this! 🚀`;
                  
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(message)
                      .then(() => {
                        toast.success("Copied to clipboard!");
                      })
                      .catch(() => {
                        // Fallback
                        const textArea = document.createElement("textarea");
                        textArea.value = message;
                        textArea.style.position = "fixed";
                        textArea.style.left = "-9999px";
                        document.body.appendChild(textArea);
                        textArea.select();
                        try {
                          document.execCommand('copy');
                          toast.success("Copied to clipboard!");
                        } catch (err) {
                          toast.error("Failed to copy. Please select and copy manually.");
                        }
                        document.body.removeChild(textArea);
                      });
                  } else {
                    // Fallback for browsers without clipboard API
                    const textArea = document.createElement("textarea");
                    textArea.value = message;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-9999px";
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                      document.execCommand('copy');
                      toast.success("Copied to clipboard!");
                    } catch (err) {
                      toast.error("Failed to copy. Please select and copy manually.");
                    }
                    document.body.removeChild(textArea);
                  }
                }}
                variant="outline"
                className="h-10 px-4 text-[14px] font-semibold border-2 border-[#e2e8f0] hover:bg-gray-50 hover:border-[#6A4FFF] hover:text-[#6A4FFF] rounded-xl transition-all flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy message
              </Button>
            </div>
            
            <div className="bg-[#f8fafc] rounded-xl p-4 border border-[#e2e8f0]">
              <pre className="font-sans text-[13px] text-[#4a5568] leading-relaxed whitespace-pre-wrap">
{`Hey team! 👋

Our project board is ready in Trello. Here's what you need to know:

📋 Board: [Project Name]
🔗 Link: [Trello Board URL]

📌 Ground rules:
• Every card has a Definition of Done checklist
• Paste your artifact link when you finish (Google Drive, Figma, etc.)
• No link = not ready for review yet

🗂️ We have a Decision Log for tracking big calls (why we chose X over Y)

First task: Check the Kickoff phase and claim your cards.

Let's ship this! 🚀`}
              </pre>
            </div>
            
            <p className="text-[13px] text-[#94a3b8] mt-3">
              Replace [Project Name] and [Trello Board URL] with your actual info
            </p>
          </div>
        </motion.div>

        {/* Next Steps Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-[700px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-[#e2e8f0] mb-8"
        >
          <h2 className="font-serif font-semibold text-[24px] text-[#1a2332] mb-8">
            Next Steps
          </h2>
          <div className="space-y-6">
            {[
              { title: "Create your Drive folders", desc: "Use the blueprint below to set up your Google Drive structure. This is where all your artifact links will point." },
              { title: "Share access with your team", desc: "Give all team members Editor permissions on both the Trello board and Drive folders." },
              { title: "Start with Kickoff cards", desc: "Begin with 'Team Operating Agreement' and 'Tool Stack Locked' in the Kickoff phase." },
              { title: "Paste artifact links when done", desc: "Every card has a 'PASTE LINK HERE' placeholder. No link = not done. Keep your team accountable." }
            ].map((step, i) => (
              <div key={i} className={`flex gap-5 ${i !== 3 ? "pb-6 border-b border-[#e2e8f0]" : ""}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-white text-[14px] font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-[16px] text-[#1a2332] mb-1">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14px] text-[#4a5568] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Blueprint Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-[700px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-[#e2e8f0]"
        >
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-serif font-semibold text-[24px] text-[#1a2332] mb-2">
                Google Drive Folder Blueprint
              </h2>
              <p className="font-sans text-[15px] text-[#4a5568]">
                Copy this structure into Google Drive. Use the naming convention to stay organized.
              </p>
            </div>
            
            <div className="bg-[#1a2332] rounded-xl p-6 overflow-x-auto">
              <pre className="font-mono text-[13px] text-[#e2e8f0] leading-relaxed whitespace-pre">
                {blueprintText}
              </pre>
            </div>

            <Button 
              onClick={handleCopy}
              variant="outline"
              className={`w-full h-12 text-[14px] font-semibold border-2 transition-all rounded-xl ${
                copied 
                  ? "border-[#10D48E] text-[#10D48E] bg-[#10D48E]/5 hover:bg-[#10D48E]/10" 
                  : "border-[#e2e8f0] text-[#1a2332] hover:bg-gray-50 hover:border-[#cbd5e1]"
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Copied Blueprint
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Blueprint
                </>
              )}
            </Button>
          </div>
        </motion.div>

      </main>
    </div>
  );
};
