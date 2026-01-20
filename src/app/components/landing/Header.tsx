// Header.tsx
export const Header = () => {
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('features')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <header className="px-8 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src="/logo-horizontal.svg" 
          alt="Scaffold" 
          className="h-[58px] w-auto"
        />
      </div>
      
      <a 
        href="#features" 
        onClick={scrollToFeatures}
        className="h-12 px-8 text-[16px] font-semibold text-[#4a5568] hover:text-[#1a2332] transition-colors flex items-center cursor-pointer"
      >
        How it works
      </a>
    </header>
  );
};
