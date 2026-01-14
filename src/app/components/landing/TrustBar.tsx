import { Check } from "lucide-react";

export const TrustBar = () => {
  return (
    <section className="pb-24 pt-8 bg-[#f8fafc]">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e2e8f0] p-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left shrink-0">
            <h3 className="font-['Fraunces',serif] font-bold text-2xl text-[#1a2332]">
              What This Installer Does
            </h3>
          </div>
          <div className="h-px w-full md:w-px md:h-12 bg-gray-200 hidden md:block" />
          
          <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
            {[
              "Creates one board with 8 phases",
              "Adds role-based cards with DoD",
              "Invites your team automatically"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#10D48E]/10 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#10D48E] stroke-[3]" />
                </div>
                <span className="font-['Inter',sans-serif] font-medium text-[#4a5568] text-[15px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
