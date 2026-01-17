export const BrowserMockup = () => {
  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-[#e2e8f0]">
      {/* Browser Bar */}
      <div className="bg-[#f8fafc] px-4 py-3 border-b border-[#e2e8f0] flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-4 flex-1 max-w-xl mx-auto bg-white h-6 rounded-md border border-[#e2e8f0] flex items-center px-3">
          <span className="text-[#94a3b8] text-xs font-medium">trello.com/b/abc123/campus-food-delivery-app</span>
        </div>
      </div>
      
      {/* Screenshot Placeholder */}
      <div className="bg-[#f4f5f7] aspect-[16/10] w-full relative overflow-hidden flex items-center justify-center">
        
 {/* Real Trello Board Screenshot */}
<img 
  src="public/trello-board-preview.png" 
  alt="Complete UX project board with 8 phases and pre-written tasks"
  className="w-full h-full object-cover"
/>
        
        {/* Subtle gradient overlay (keep for aesthetic) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f5f7]/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};
