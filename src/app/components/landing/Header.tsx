import { Button } from "../ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF]" />
          <span className="font-serif font-bold text-2xl text-[#1a2332] tracking-tight">UX Team Kit</span>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-[#1a2332] hover:bg-[#2d3748] text-white font-medium px-6 py-2 rounded-xl h-auto transition-colors">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
