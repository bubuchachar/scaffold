import { WizardHeader } from "./WizardHeader";
import { Button } from "../ui/button";
import { AlertTriangle, RefreshCw, Mail } from "lucide-react";
import { motion } from "motion/react";

export const WizardError = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a2332] pb-20">
      <WizardHeader />
      
      <main className="container mx-auto px-4 pt-24 md:pt-32 flex flex-col items-center">
        
        {/* Error Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.div 
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#dc2626] to-[#b91c1c] flex items-center justify-center shadow-lg shadow-[#dc2626]/20 mb-6"
          >
            <AlertTriangle className="w-10 h-10 text-white stroke-[3]" />
          </motion.div>
          <h1 className="font-serif font-bold text-[32px] text-[#1a2332] leading-tight mb-3">
            We couldn't finish the install
          </h1>
          <p className="font-sans text-[16px] text-[#4a5568] leading-relaxed max-w-lg">
            Your Trello connection worked, but something failed while creating the board.
          </p>
        </motion.div>

        <div className="w-full max-w-[700px] flex flex-col gap-8">
            {/* Error Details Box */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#dc2626]/5 border-2 border-[#dc2626]/20 rounded-xl p-6"
            >
              <span className="block text-[#dc2626] text-sm font-bold tracking-wider uppercase mb-2">
                Error Details
              </span>
              <p className="font-mono text-[14px] text-[#1a2332]">
                Failed to create board. Please check your Trello permissions.
              </p>
            </motion.div>

            {/* Solutions Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-[#e2e8f0]"
            >
              <h2 className="font-serif font-semibold text-[20px] text-[#1a2332] mb-6">
                Quick Fixes
              </h2>
              
              <div className="space-y-6">
                {[
                  { title: "Check Authorization", desc: "Make sure you clicked 'Allow' on Trello's authorization page. If you accidentally clicked 'Deny', try again." },
                  { title: "Verify Account", desc: "Confirm you're logged into the correct Trello account with permission to create boards." },
                  { title: "Clear Cache", desc: "Try clearing your browser cache and cookies, then restart the install process." },
                  { title: "Check Connection", desc: "Verify you have a stable internet connection. Trello's API may also be temporarily unavailable." }
                ].map((fix, i) => (
                  <div key={i} className={`flex gap-4 ${i !== 3 ? "pb-6 border-b border-[#e2e8f0]" : ""}`}>
                    <div className="w-8 h-8 rounded-lg bg-[#6A4FFF]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#6A4FFF] text-[14px] font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-[15px] text-[#1a2332] mb-1">
                        {fix.title}
                      </h3>
                      <p className="font-sans text-[14px] text-[#4a5568] leading-relaxed">
                        {fix.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Common Issues Box */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#f8fafc] rounded-xl p-6 border border-[#e2e8f0]"
            >
              <h3 className="font-sans font-semibold text-[15px] text-[#1a2332] mb-4">
                Common Issues
              </h3>
              
              <div className="space-y-4">
                <div>
                   <span className="font-bold text-[14px] text-[#1a2332]">Authorization cancelled: </span>
                   <span className="text-[14px] text-[#4a5568]">If you closed the Trello window, just click 'Try Again' below.</span>
                </div>
                <div>
                   <span className="font-bold text-[14px] text-[#1a2332]">Token expired: </span>
                   <span className="text-[14px] text-[#4a5568]">Tokens expire after 1 day. Clear browser storage and authorize again.</span>
                </div>
                <div>
                   <span className="font-bold text-[14px] text-[#1a2332]">Permission denied: </span>
                   <span className="text-[14px] text-[#4a5568]">Make sure you have permission to create boards in your workspace. Free accounts work fine.</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-4 flex-col sm:flex-row"
            >
              <Button 
                variant="outline"
                className="flex-1 h-12 text-[16px] font-semibold border-[#e2e8f0] text-[#1a2332] hover:bg-gray-50 hover:text-[#1a2332] rounded-xl"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button 
                className="flex-1 h-12 text-[16px] font-semibold text-white bg-gradient-to-r from-[#8B72FF] to-[#6A4FFF] hover:opacity-90 hover:translate-y-[-1px] transition-all rounded-xl shadow-[0_4px_14px_rgba(106,79,255,0.3)] border-none"
              >
                Retry install
                <RefreshCw className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
        </div>

      </main>
    </div>
  );
};
