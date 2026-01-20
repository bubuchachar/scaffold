import { Card } from "../ui/card";

const features = [
  {
    icon: "/icons/proof-of-work.svg", 
    title: "Proof-of-Work Built In",
    description: "Pre-fills Definition of Done + artifact link placeholders for every deliverable. No 'almost done' allowed."
  },
  {
    icon: "/icons/smart-timeline.svg", 
    title: "Smart Timeline",
    description: "Automatically calculates due dates across all phases based on your deadline and intensity level."
  },
  {
    icon: "/icons/role-based.svg", 
    title: "Role-Based Cards",
    description: "Installs cards filtered by your team composition (PM, UXR, UI). Everyone knows what they own."
  }
];

export const FeatureCards = () => {
  return (
    <section id="features" className="py-24 bg-[#f8fafc] -mt-20 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-8 border border-[#e2e8f0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[#6A4FFF]/20 shadow-lg">
                <img 
                  src={feature.icon} 
                  alt="" 
                  className="w-6 h-6"
                />
              </div>
              <h3 className="font-['Fraunces',serif] font-bold text-xl text-[#1a2332] mb-3">
                {feature.title}
              </h3>
              <p className="font-['Inter',sans-serif] text-[15px] leading-relaxed text-[#4a5568]">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
