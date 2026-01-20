import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { WizardHeader } from "./WizardHeader";
import { QuestionHeader } from "./QuestionHeader";
import { motion } from "motion/react";

interface WizardStep2Props {
  initialDate?: Date;
  onNext?: (date: Date | undefined) => void;
  onBack?: () => void;
}

export const WizardStep2 = ({ initialDate, onNext, onBack }: WizardStep2Props) => {
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  const handleNext = () => {
    if (onNext && date) {
      onNext(date);
    }
  };

  // Validation: Check if a date is selected
  const isValid = date !== undefined;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a2332] flex flex-col">
      <WizardHeader />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center pt-16">
        {/* Question Header */}
        <QuestionHeader currentStep={2} />

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
              Question 2 of 6
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-bold text-[32px] text-[#1a2332] leading-tight mb-3">
            When's your deadline?
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-[16px] text-[#4a5568] leading-relaxed mb-8">
            Pre-fills suggested due dates across the board (you can change them anytime).
          </p>

          {/* Date Input */}
          <div className="mb-10">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-auto py-4 px-4 text-left font-normal text-[16px] rounded-xl border-2 border-[#e2e8f0] hover:bg-white hover:border-[#6A4FFF] transition-all duration-200 focus:border-[#6A4FFF] focus:ring-4 focus:ring-[#6A4FFF]/10 shadow-none justify-start",
                    !date && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5 opacity-50" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="rounded-xl border border-gray-100 shadow-xl"
                  classNames={{
                    day_selected: "bg-[#6A4FFF] text-white hover:bg-[#6A4FFF] hover:text-white focus:bg-[#6A4FFF] focus:text-white",
                    day_today: "bg-gray-100 text-[#1a2332]",
                  }}
                />
              </PopoverContent>
            </Popover>
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
