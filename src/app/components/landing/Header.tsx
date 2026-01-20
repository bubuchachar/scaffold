// Header.tsx
export const Header = () => {
  return (
    <header className="px-8 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src="/logo-horizontal.svg" 
          alt="Scaffold" 
          className="h-[58px] w-auto"
        />
      </div>
      
      <button className="h-12 px-8 text-[16px] font-semibold text-white bg-[#1a2332] hover:bg-[#2a3342] rounded-xl transition-colors">
        Get Started
      </button>
    </header>
  );
};
