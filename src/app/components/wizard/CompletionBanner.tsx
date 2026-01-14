import { Check } from "lucide-react";

export const CompletionBanner = () => {
  return (
    <div className="w-full max-w-[700px] mx-auto px-4 mb-8">
      <div className="flex items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#10D48E] dark:bg-[#3FE39A] flex items-center justify-center shrink-0">
          <Check className="w-5 h-5 text-white stroke-[3]" />
        </div>
        <p className="font-sans font-semibold text-[16px] text-[#10D48E] dark:text-[#3FE39A]">
          All questions complete
        </p>
      </div>
    </div>
  );
};
