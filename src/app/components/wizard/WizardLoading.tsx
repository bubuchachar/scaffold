import { WizardHeader } from "./WizardHeader";
import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";

export const WizardLoading = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a2332] pb-20">
      <WizardHeader />

      <main className="container mx-auto px-4 pt-24 md:pt-32 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        
        {/* Animated Spinner */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border-4 border-[#e2e8f0] border-t-[#6A4FFF]"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-[32px]"
          >
            ⚡
          </motion.div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif font-bold text-[32px] text-[#1a2332] leading-tight mb-3">
            Installing your project kit…
          </h1>
          <p className="font-sans text-[16px] text-[#4a5568] leading-relaxed max-w-md mx-auto">
            This usually takes 30-60 seconds. Refresh-safe: we won't create duplicates.
          </p>
        </div>

        <div className="w-full max-w-[700px] flex flex-col gap-8">
            {/* Status Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-[#e2e8f0]"
            >
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-[#6A4FFF] text-sm font-bold tracking-wider uppercase">
                  Current Step
                </span>
                <p className="font-sans text-[18px] font-semibold text-[#1a2332] leading-snug">
                  Installing cards with definitions of done...
                </p>
                <p className="text-[14px] text-[#94a3b8]">
                  Step 3 of 4
                </p>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-[#e2e8f0] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#8B72FF] to-[#6A4FFF]"
                />
              </div>
            </motion.div>

            {/* Checklist Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#f8fafc] rounded-xl p-6 border border-[#e2e8f0]"
            >
              <h3 className="font-sans font-semibold text-[15px] text-[#1a2332] mb-4">
                Progress
              </h3>
              
              <div className="space-y-3">
                {/* Completed Item 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#10D48E] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <span className="text-[14px] text-[#10D48E] font-medium">
                    Created board…
                  </span>
                </div>

                {/* Completed Item 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#10D48E] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <span className="text-[14px] text-[#10D48E] font-medium">
                    Installing lists…
                  </span>
                </div>

                {/* Active Item 3 */}
                <div className="flex items-center gap-3">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 rounded-full border-2 border-[#e2e8f0] border-t-[#6A4FFF] shrink-0"
                  />
                  <span className="text-[14px] text-[#4a5568]">
                    Adding cards…
                  </span>
                </div>

                {/* Pending Item 4 */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#cbd5e1] shrink-0" />
                  <span className="text-[14px] text-[#94a3b8]">
                    Sending invites…
                  </span>
                </div>
              </div>
            </motion.div>
        </div>

      </main>
    </div>
  );
};
