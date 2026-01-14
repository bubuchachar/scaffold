import { Trello, Lock, Check, X, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { WizardHeader } from "./WizardHeader";
import { motion } from "motion/react";
import { useState } from "react";
import { authorizeTrello } from "../../utils/trelloService";

interface WizardTrelloAuthProps {
  onBack?: () => void;
  onAuthorize?: () => void;
}

export const WizardTrelloAuth = ({ onBack, onAuthorize }: WizardTrelloAuthProps) => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthorize = async () => {
    setIsAuthorizing(true);
    setError(null);

    try {
      await authorizeTrello();
      // Authorization successful!
      if (onAuthorize) {
        onAuthorize();
      }
    } catch (err) {
      console.error('Authorization error:', err);
      setError('Failed to authorize with Trello. Please try again.');
      setIsAuthorizing(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a2332] pb-20">
      <WizardHeader />

      <main className="container mx-auto px-4 pt-24 md:pt-32 flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[700px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 md:p-12 border border-[#e2e8f0]"
        >
          {/* Trello Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0079BF] to-[#005A8E] flex items-center justify-center shadow-lg shadow-[#0079BF]/20">
              <Trello className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="font-serif font-bold text-[32px] text-[#1a2332] leading-tight mb-3">
              Connect Trello to install your kit
            </h1>
            <p className="font-sans text-[16px] text-[#4a5568] leading-relaxed max-w-md mx-auto">
              We'll create a board in your selected workspace. That's it.
            </p>
          </div>

          {/* Trust Block - The "Star" Feature */}
          <div className="bg-[#10D48E]/5 border-2 border-[#10D48E]/20 rounded-xl p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-[#1a2332]" />
              <h3 className="font-sans font-semibold text-[15px] text-[#1a2332]">
                What we can do
              </h3>
            </div>
            
            <ul className="space-y-3">
              {[
                "Create a board, lists, and cards you requested",
                "(Optional) Send teammate invites you enter"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 min-w-[18px] flex justify-center">
                     <Check className="w-[18px] h-[18px] text-[#10D48E] stroke-[3]" />
                  </div>
                  <span className="text-[14px] text-[#4a5568] leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#fef2f2] border-2 border-[#fecaca] rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-[#1a2332]" />
              <h3 className="font-sans font-semibold text-[15px] text-[#1a2332]">
                What we never do
              </h3>
            </div>
            
            <ul className="space-y-3">
              {[
                "Read content from your other boards",
                "Edit or delete existing boards",
                "Post messages or DM anyone"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 min-w-[18px] flex justify-center">
                    <X className="w-[18px] h-[18px] text-[#d4183d] stroke-[3]" />
                  </div>
                  <span className="text-[14px] text-[#4a5568] leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[13px] text-[#4a5568] mt-4 mb-8 text-center">
            You can revoke access anytime in your Trello/Atlassian settings.
          </p>

          {/* Steps Section */}
          <div className="bg-[#f8fafc] rounded-xl p-6 mb-10 border border-[#e2e8f0]">
             <h3 className="font-sans font-semibold text-[15px] text-[#1a2332] mb-4">
                What Happens Next
              </h3>
              <div className="space-y-3">
                {[
                  "You'll see Trello's authorization page",
                  "Review permissions and click 'Allow'",
                  "Return here to see your board being created",
                  "Get your board link + Drive blueprint"
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#6A4FFF] flex items-center justify-center shrink-0">
                      <span className="text-white text-[12px] font-bold">{i + 1}</span>
                    </div>
                    <span className="text-[14px] text-[#4a5568] py-0.5">{step}</span>
                  </div>
                ))}
              </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onBack}
              variant="outline" 
              className="flex-1 h-[52px] text-[16px] font-semibold text-[#4a5568] border-2 border-[#e2e8f0] hover:bg-gray-50 hover:text-[#1a2332] rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={handleAuthorize}
              disabled={isAuthorizing}
              className="flex-1 h-[52px] text-[16px] font-semibold text-white bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] hover:opacity-90 hover:translate-y-[-1px] transition-all rounded-xl shadow-[0_4px_14px_rgba(106,79,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAuthorizing ? 'Authorizing...' : 'Authorize with Trello'}
              {!isAuthorizing && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

        </motion.div>
      </main>
    </div>
  );
};
