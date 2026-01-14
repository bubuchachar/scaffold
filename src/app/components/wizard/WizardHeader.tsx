export const WizardHeader = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-b border-[#e2e8f0]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF]" />
          <span className="font-serif font-bold text-xl text-[#1a2332] tracking-tight">UX Team Kit</span>
        </div>
        <div className="text-sm font-medium text-[#4a5568]">
          Setup Mode
        </div>
      </div>
    </header>
  );
};
