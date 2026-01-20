import * as React from "react";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { WizardHeader } from "./WizardHeader";
import { QuestionHeader } from "./QuestionHeader";
import { motion } from "motion/react";

interface WizardStep6Props {
  initialEmails?: string;
  onNext?: (emails: string) => void;
  onBack?: () => void;
}

export const WizardStep6 = ({ initialEmails = "", onNext, onBack }: WizardStep6Props) => {
  const [emails, setEmails] = React.useState(initialEmails);

  const handleNext = () => {
    if (onNext) {
      // Trim the emails string before passing it
      onNext(emails.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a2332] flex flex-col">
      <WizardHeader />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center pt-16">
        {/* Progress Stepper */}
        <QuestionHeader currentStep={6} />

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
              Question 6 of 6
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-bold text-[32px] text-[#1a2332] leading-tight mb-3">
            Team member emails
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-[16px] text-[#4a5568] leading-relaxed mb-8">
            We'll automatically invite them to your Trello board. Optional—you can add people manually later.
          </p>

          {/* Textarea */}
          <div className="mb-2">
            <Textarea
              placeholder="email1@example.com, email2@example.com"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="min-h-[80px] text-[16px] font-normal border-2 border-[#e2e8f0] rounded-xl p-4 focus:border-[#6A4FFF] focus:ring-4 focus:ring-[#6A4FFF]/10 resize-none"
            />
          </div>

          {/* Helper Text */}
          <p className="font-sans text-[14px] text-[#64748b] mb-8">
            Separate multiple emails with commas. Leave blank to skip auto-invites.
          </p>

          {/* Privacy Note */}
          <div className="mb-10 bg-[#fef2f2] border border-[#fecaca] rounded-xl p-4 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-[#d4183d] shrink-0 mt-0.5" />
            <p className="text-[14px] text-[#991b1b] leading-relaxed">
              <span className="font-bold">Privacy note:</span> We'll only use these emails to send Trello board invitations. If invites fail, you'll see a warning but setup will still complete.
            </p>
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
              Continue to Trello
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
