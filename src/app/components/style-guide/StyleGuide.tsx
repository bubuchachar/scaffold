import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Copy,
  FileText,
  GripVertical,
  Layers,
  List,
  Loader2,
  Mail,
  Minus,
  MoreHorizontal,
  PanelLeft,
  RefreshCw,
  Search,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { cn } from "../ui/utils";

export const StyleGuide = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains('dark') || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0F1117] font-sans text-[#1a2332] dark:text-[#F3F4F6] p-8 md:p-16 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="fixed top-8 right-8 z-50">
        <Button
          onClick={toggleTheme}
          variant="outline"
          className="rounded-full w-12 h-12 p-0 bg-white dark:bg-[#1A1D2E] border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-[#252836] transition-all"
        >
          {isDark ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-[#1a2332]" />}
        </Button>
      </div>
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="font-serif text-5xl font-bold text-[#1a2332] dark:text-white">Design System</h1>
          <p className="text-[#64748b] text-lg max-w-2xl">
            This style guide defines the visual language for the UX Team Kit Installer.
            It reflects the refined editorial aesthetic used in the setup wizard.
          </p>
        </div>

        <Separator />

        {/* Colors */}
        <section className="space-y-8">
          <h2 className="font-serif text-3xl font-bold text-[#1a2332] dark:text-white">Color Palette</h2>
          
          {/* Shared / Core Colors */}
          <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ColorCard 
                name="Navy (Primary)" 
                hex="#1a2332" 
                bg="bg-[#1a2332]" 
              />
               <ColorCard 
                name="Slate Dark" 
                hex="#4a5568" 
                bg="bg-[#4a5568]" 
              />
              <ColorCard 
                name="Slate Light" 
                hex="#64748b" 
                bg="bg-[#64748b]" 
              />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ColorCard 
                name="Purple (Brand)" 
                hex="#6A4FFF" 
                bg="bg-[#6A4FFF]" 
              />
              <ColorCard 
                name="Purple Dark" 
                hex="#5841CC" 
                bg="bg-[#5841CC]" 
              />
              <ColorCard 
                name="Purple Light" 
                hex="#8B72FF" 
                bg="bg-[#8B72FF]" 
              />
              <div className="bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] rounded-xl p-6 shadow-md text-white flex flex-col justify-end h-32">
                  <span className="font-bold">Primary Gradient</span>
                  <span className="text-sm opacity-80">#8B72FF to #6A4FFF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ColorCard 
                name="Mint (Brand)" 
                hex="#10D48E" 
                bg="bg-[#10D48E]" 
              />
              <ColorCard 
                name="Mint Medium" 
                hex="#7EDDA1" 
                bg="bg-[#7EDDA1]" 
              />
              <ColorCard 
                name="Mint Soft" 
                hex="#ADEBB3" 
                bg="bg-[#ADEBB3]" 
              />
            </div>
          </div>

          <Separator />

          {/* Light Mode */}
          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-[#64748b] uppercase tracking-wider">Light Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ColorCard 
                name="Page Background" 
                hex="#f8fafc" 
                bg="bg-[#f8fafc]" 
                border
              />
              <ColorCard 
                name="White" 
                hex="#ffffff" 
                bg="bg-white" 
                border
              />
              <ColorCard 
                name="Muted" 
                hex="#ececf0" 
                bg="bg-[#ececf0]" 
                border
              />
               <ColorCard 
                name="Muted Foreground" 
                hex="#717182" 
                bg="bg-[#717182]" 
              />
               <ColorCard 
                name="Destructive (Error)" 
                hex="#d4183d" 
                bg="bg-[#d4183d]" 
              />
            </div>
          </div>

          <Separator />

          {/* Dark Mode */}
          <div className="space-y-4">
             <h3 className="font-sans font-semibold text-[#64748b] uppercase tracking-wider">Dark Mode</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ColorCard 
                name="Background" 
                hex="#0F1117" 
                bg="bg-[#0F1117]" 
              />
               <ColorCard 
                name="Card Surface" 
                hex="#1A1D2E" 
                bg="bg-[#1A1D2E]" 
              />
              <ColorCard 
                name="Muted" 
                hex="#252836" 
                bg="bg-[#252836]" 
              />
               <ColorCard 
                name="Muted Foreground" 
                hex="#9CA3AF" 
                bg="bg-[#9CA3AF]" 
              />
              <ColorCard 
                name="Destructive (Error)" 
                hex="#F87171" 
                bg="bg-[#F87171]" 
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* Typography */}
        <section className="space-y-8">
          <h2 className="font-serif text-3xl font-bold text-[#1a2332] dark:text-white">Typography</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="border-b pb-2 mb-4">
                <span className="text-sm font-semibold text-[#64748b] uppercase tracking-wider">Display Font: Fraunces</span>
              </div>
              <h1 className="font-serif text-6xl font-bold text-[#1a2332] dark:text-white">Heading 1 (60px)</h1>
              <h2 className="font-serif text-5xl font-bold text-[#1a2332] dark:text-white">Heading 2 (48px)</h2>
              <h3 className="font-serif text-[32px] font-bold text-[#1a2332] dark:text-white leading-tight">Heading 3 (32px)</h3>
              <h4 className="font-serif text-2xl font-bold text-[#1a2332] dark:text-white">Heading 4 (24px)</h4>
            </div>

            <div className="space-y-6">
              <div className="border-b pb-2 mb-4">
                <span className="text-sm font-semibold text-[#64748b] uppercase tracking-wider">Body Font: Inter</span>
              </div>
              <div>
                <p className="font-sans text-[16px] font-semibold text-[#1a2332] dark:text-white mb-1">UI Label Semibold (16px)</p>
                <p className="font-sans text-[16px] text-[#4a5568] dark:text-gray-300">UI Body Regular (16px) - Used for subtitles and form inputs.</p>
              </div>
              <div>
                 <p className="font-sans text-[14px] text-[#64748b] dark:text-gray-400">Small Text (14px) - Used for descriptions and helpers.</p>
              </div>
              <div>
                 <span className="text-[#6A4FFF] text-sm font-bold tracking-wider uppercase">Eyebrow / Step Label</span>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Brand Identity */}
        <section className="space-y-8">
          <h2 className="font-serif text-3xl font-bold text-[#1a2332] dark:text-white">Brand Identity</h2>
          
          <div className="bg-white p-12 rounded-2xl border border-[#e2e8f0] flex flex-col items-center justify-center space-y-12">
            
            {/* Main Logo Composition */}
            <div className="flex items-center gap-3 scale-150 origin-center">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF]" />
              <span className="font-serif font-bold text-xl text-[#1a2332] tracking-tight">UX Team Kit</span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 w-full pt-8 border-t border-gray-100">
              
              {/* Mark Specs */}
              <div className="space-y-4">
                <h3 className="font-sans font-semibold text-[#1a2332]">Logomark Specs</h3>
                <div className="flex items-center gap-8">
                  <div className="relative">
                     <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF]" />
                     {/* Dimension lines would go here conceptually */}
                  </div>
                  <div className="text-sm text-[#64748b] space-y-1 font-mono">
                    <p>Height: 28px (Mobile) / 32px (Desktop)</p>
                    <p>Radius: 6px</p>
                    <p>Gradient: -45deg</p>
                    <p>Start: #8B72FF</p>
                    <p>End: #6A4FFF</p>
                  </div>
                </div>
              </div>

              {/* Type Specs */}
              <div className="space-y-4">
                <h3 className="font-sans font-semibold text-[#1a2332]">Logotype Specs</h3>
                <div className="space-y-2">
                  <span className="font-serif font-bold text-3xl text-[#1a2332] tracking-tight">UX Team Kit</span>
                  <div className="text-sm text-[#64748b] space-y-1 font-mono mt-2">
                    <p>Font: Fraunces</p>
                    <p>Weight: Bold (700)</p>
                    <p>Tracking: -0.025em (tight)</p>
                    <p>Color: #1a2332</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <Separator />

        {/* Components */}
        <section className="space-y-8">
          <h2 className="font-serif text-3xl font-bold text-[#1a2332] dark:text-white">Components</h2>

          {/* Buttons */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#1a2332]">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
                <Button className="h-[52px] px-8 text-[16px] font-semibold text-white bg-gradient-to-br from-[#8B72FF] to-[#6A4FFF] hover:opacity-90 hover:translate-y-[-1px] transition-all rounded-xl shadow-[0_4px_14px_rgba(106,79,255,0.3)]">
                  Primary Button
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button variant="outline" className="h-[52px] px-8 text-[16px] font-semibold text-[#4a5568] border-2 border-[#e2e8f0] hover:bg-gray-50 hover:text-[#1a2332] rounded-xl">
                  Secondary Button
                </Button>

                <Button variant="outline" className="h-auto py-4 px-4 text-left font-normal text-[16px] rounded-xl border-2 border-[#e2e8f0] hover:bg-white hover:border-[#6A4FFF] transition-all duration-200 shadow-none justify-start w-[240px]">
                  <Calendar className="mr-3 h-5 w-5 opacity-50" />
                  <span>Select a date</span>
                </Button>
            </div>
          </div>

          {/* Form Elements */}
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Selection Cards */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#1a2332]">Selection Cards</h3>
              
              {/* Radio Selected */}
              <div className="relative flex items-start w-full p-5 rounded-xl border-2 border-[#6A4FFF] bg-[#6A4FFF]/5 dark:bg-[#6A4FFF]/10 shadow-[0_0_0_1px_rgba(106,79,255,0.1)]">
                <div className="w-5 h-5 rounded-full border-2 border-[#6A4FFF] mr-4 mt-1 flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6A4FFF]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold font-sans text-[#1a2332] dark:text-white mb-1">Radio Option Selected</h3>
                  <p className="text-[14px] font-normal font-sans text-[#4a5568] dark:text-gray-300 leading-relaxed">
                    This is how a selected option looks.
                  </p>
                </div>
              </div>

              {/* Radio Default */}
              <div className="relative flex items-start w-full p-5 rounded-xl border-2 border-[#e2e8f0] dark:border-gray-700 bg-white dark:bg-[#1A1D2E]">
                <div className="w-5 h-5 rounded-full border-2 border-[#cbd5e1] dark:border-gray-600 bg-white dark:bg-[#1A1D2E] mr-4 mt-1 flex items-center justify-center shrink-0">
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold font-sans text-[#1a2332] dark:text-white mb-1">Radio Option Default</h3>
                  <p className="text-[14px] font-normal font-sans text-[#64748b] dark:text-gray-400 leading-relaxed">
                    This is how an unselected option looks.
                  </p>
                </div>
              </div>

              {/* Checkbox Selected */}
               <div className="relative flex items-center w-full p-4 rounded-xl border-2 border-[#6A4FFF] bg-[#6A4FFF]/5 dark:bg-[#6A4FFF]/10 shadow-[0_0_0_1px_rgba(106,79,255,0.1)]">
                  <div className="w-5 h-5 rounded border-2 border-[#6A4FFF] bg-[#6A4FFF] mr-4 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <span className="text-[16px] font-medium font-sans text-[#1a2332] dark:text-white">Checkbox Selected</span>
                </div>
            </div>

            {/* Input & Alerts */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#1a2332]">Inputs & Alerts</h3>
              
              {/* Textarea */}
              <Textarea
                placeholder="Enter your text here..."
                className="min-h-[100px] text-[16px] font-normal border-2 border-[#e2e8f0] rounded-xl p-4 focus:border-[#6A4FFF] focus:ring-4 focus:ring-[#6A4FFF]/10 resize-none"
              />

              {/* Privacy Note */}
              <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-4 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-[#d4183d] shrink-0 mt-0.5" />
                <p className="text-[14px] text-[#991b1b] leading-relaxed font-sans">
                  <span className="font-bold">Privacy note:</span> This is an alert box used for important but non-critical information.
                </p>
              </div>

              {/* Stepper Mockup */}
              <div className="flex items-center space-x-2">
                 <div className="w-8 h-1 rounded bg-[#10D48E]" />
                 <div className="w-8 h-1 rounded bg-[#10D48E]" />
                 <div className="w-8 h-1 rounded bg-[#6A4FFF]" />
                 <div className="w-8 h-1 rounded bg-[#e2e8f0]" />
              </div>
              <p className="text-xs text-[#64748b] font-sans">Stepper Progress (Completed, Completed, Active, Pending)</p>

            </div>
          </div>
        </section>

        <Separator />

        {/* Iconography */}
        <section className="space-y-8">
          <h2 className="font-serif text-3xl font-bold text-[#1a2332]">Iconography</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {icons.map(({ name, component: Icon }) => (
              <div key={name} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Icon className="w-8 h-8 text-[#1a2332] mb-3" />
                <span className="text-xs font-mono text-[#64748b]">{name}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

const icons = [
  { name: "AlertCircle", component: AlertCircle },
  { name: "AlertTriangle", component: AlertTriangle },
  { name: "ArrowLeft", component: ArrowLeft },
  { name: "ArrowRight", component: ArrowRight },
  { name: "Calendar", component: Calendar },
  { name: "Check", component: Check },
  { name: "CheckCircle2", component: CheckCircle2 },
  { name: "ChevronDown", component: ChevronDown },
  { name: "ChevronLeft", component: ChevronLeft },
  { name: "ChevronRight", component: ChevronRight },
  { name: "ChevronUp", component: ChevronUp },
  { name: "Circle", component: Circle },
  { name: "Copy", component: Copy },
  { name: "FileText", component: FileText },
  { name: "GripVertical", component: GripVertical },
  { name: "Layers", component: Layers },
  { name: "List", component: List },
  { name: "Loader2", component: Loader2 },
  { name: "Mail", component: Mail },
  { name: "Minus", component: Minus },
  { name: "MoreHorizontal", component: MoreHorizontal },
  { name: "PanelLeft", component: PanelLeft },
  { name: "RefreshCw", component: RefreshCw },
  { name: "Search", component: Search },
  { name: "X", component: X },
];

const ColorCard = ({ name, hex, bg, border = false }: { name: string, hex: string, bg: string, border?: boolean }) => (
  <div className={`rounded-xl overflow-hidden shadow-sm ${border ? 'border border-gray-200' : ''}`}>
    <div className={`h-24 ${bg} flex items-end p-4`}>
       {/* Swatch */}
    </div>
    <div className="p-4 bg-white">
      <h3 className="font-bold text-[#1a2332] text-sm">{name}</h3>
      <div className="flex justify-between items-center mt-1">
        <span className="text-[#64748b] font-mono text-xs">{hex}</span>
      </div>
    </div>
  </div>
);
