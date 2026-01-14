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
        
        {/* ADD YOUR SCREENSHOT HERE */}
        {/* Uncomment this when you have the screenshot: */}
        {/* <img 
          src="/path-to-your-trello-screenshot.png" 
          alt="UX Team Kit Trello Board"
          className="w-full h-full object-cover"
        /> */}
        
        {/* Placeholder Content (Remove when screenshot added) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          {/* Trello Board Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-[#0079BF] to-[#005A8E] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="13" rx="1" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="9" rx="1" strokeWidth="2" />
            </svg>
          </div>
          
          {/* Instructions */}
          <div className="max-w-md">
            <h3 className="font-serif font-bold text-2xl text-[#1a2332] mb-3">
              Screenshot Placeholder
            </h3>
            <p className="text-[#4a5568] text-base leading-relaxed mb-6">
              Replace this with an actual Trello board screenshot showing the 8 phases, cards, and labels.
            </p>
            
            {/* Specs Box */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#e2e8f0] text-left">
              <p className="text-[#1a2332] font-semibold text-sm mb-2">Screenshot Specs:</p>
              <ul className="text-[#4a5568] text-sm space-y-1">
                <li>• <span className="font-medium">Dimensions:</span> 1600x1000px (16:10 ratio)</li>
                <li>• <span className="font-medium">Format:</span> PNG or JPG</li>
                <li>• <span className="font-medium">Show:</span> Board view with all 8 phases visible</li>
                <li>• <span className="font-medium">Capture:</span> 2-3 cards per phase + labels</li>
                <li>• <span className="font-medium">Zoom:</span> 90-100% (readable card titles)</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Subtle gradient overlay (keep for aesthetic) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f5f7]/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};
