export const WizardHeader = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-b border-[#e2e8f0]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/logo-horizontal.svg" 
            alt="Scaffold" 
            className="h-[40px] w-auto"
          />
        </div>
        <div className="text-sm font-medium text-[#4a5568]">
          Setup Mode
        </div>
      </div>
    </header>
  );
};
