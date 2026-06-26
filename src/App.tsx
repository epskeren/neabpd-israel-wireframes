import { useState, useEffect } from 'react';
import { wireframePages } from './data/wireframeData';
import { WireframeRenderer } from './components/WireframeRenderer';
import { DetailsPanel } from './components/DetailsPanel';
import { FeedbackSystem } from './components/FeedbackSystem';
import { ThemeSelector, calmThemes } from './components/ThemeSelector';
import { PageId, WireframePage } from './types';
import {
  Home,
  HelpCircle,
  ShieldAlert,
  PhoneCall,
  GraduationCap,
  BookOpen,
  Heart,
  MessageSquare,
  FileText,
  Download,
  Info,
  ChevronLeft,
  LifeBuoy,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [currentPageId, setCurrentPageId] = useState<PageId>('home');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [interactiveMode, setInteractiveMode] = useState<'wireframe' | 'interactive'>('wireframe');
  const [currentTheme, setCurrentTheme] = useState(calmThemes[0]);
  const [showWalkthrough, setShowWalkthrough] = useState(true);

  // Load active page details
  const currentPage = wireframePages.find((p) => p.id === currentPageId) || wireframePages[0];

  // Auto-reset selected section when page changes
  useEffect(() => {
    setSelectedSectionId(null);
  }, [currentPageId]);

  // Helper to select icon for each sidebar page
  const getPageIcon = (id: PageId) => {
    switch (id) {
      case 'home':
        return <Home className="w-4 h-4" />;
      case 'eligibility':
        return <HelpCircle className="w-4 h-4" />;
      case 'bpd_info':
        return <ShieldAlert className="w-4 h-4" />;
      case 'guidance_call':
        return <PhoneCall className="w-4 h-4" />;
      case 'course':
        return <GraduationCap className="w-4 h-4" />;
      case 'knowledge_center':
        return <BookOpen className="w-4 h-4" />;
      case 'about_donations':
        return <Heart className="w-4 h-4" />;
      case 'contact':
        return <MessageSquare className="w-4 h-4" />;
      case 'footer_pages':
        return <FileText className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  // Compile and download full project design brief
  const downloadFullBrief = () => {
    const header = `דוח אפיון וסקיצות (Wireframe Brief) - אתר NEABPD Israel\n==================================================\n`;
    const doc = wireframePages
      .map((page) => {
        let pageStr = `📄 עמוד: ${page.title} (${page.id})\n--------------------------------------------------\n`;
        pageStr += `🎯 קהל יעד: ${page.targetAudience}\n`;
        pageStr += `📌 מטרת העל: ${page.purpose}\n\n`;
        
        page.sections.forEach((sec) => {
          pageStr += `   [מקטע ${sec.order}] - ${sec.title}\n`;
          pageStr += `   כותרת מוצעת: ${sec.proposedHeadings.join(' | ')}\n`;
          pageStr += `   הנעה לפעולה (CTA): ${sec.ctas.join(', ') || 'ללא'}\n`;
          pageStr += `   הנחיות חוויית משתמש (UX):\n`;
          sec.uxNotes.forEach((note) => {
            pageStr += `     • ${note}\n`;
          });
          if (sec.approvalsRequired.length > 0) {
            pageStr += `   ⚠️ אישורים קליניים/משפטיים נדרשים:\n`;
            sec.approvalsRequired.forEach((app) => {
              pageStr += `     - ${app}\n`;
            });
          }
          pageStr += `\n`;
        });
        return pageStr + `==================================================\n\n`;
      })
      .join('\n');

    const blob = new Blob([header + doc], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NEABPD_Israel_Web_Wireframe_Specification_Full_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800" style={{ direction: 'rtl' }} id="app-workspace-root">
      {/* Top Application Header Bar */}
      <header className="bg-white text-slate-800 px-6 py-4 border-b border-slate-200 shrink-0 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 z-10" id="app-main-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center font-extrabold text-xl text-white shadow-md shadow-brand-blue/10 italic leading-none shrink-0 select-none">
            N
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <span>NEABPD Israel — כלי אפיון ו-Wireframes אינטראקטיבי</span>
              <span className="bg-brand-blue/5 text-brand-blue text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-brand-blue/10">RTL / עברית</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              תכנון מבני רגיש, אמפתי ומבוסס ראיות (DBT) לבני משפחה של מתמודדים עם אי-ויסות רגשי חמור ו-BPD
            </p>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowWalkthrough(!showWalkthrough)}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              showWalkthrough
                ? 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                : `${currentTheme.primaryBtn} shadow-sm shadow-brand-blue/5`
            }`}
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>{showWalkthrough ? 'הסתרת מדריך קליני' : 'מדריך והסברים קליניים'}</span>
          </button>

          <button
            onClick={downloadFullBrief}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-xs cursor-pointer"
            title="הורדת מסמך האפיון המלא של כל 9 העמודים"
          >
            <Download className="w-3.5 h-3.5" />
            <span>הורדת אפיון מלא לקובץ (Spec)</span>
          </button>
        </div>
      </header>

      {/* Guided Walkthrough Panel (Visible by default) */}
      {showWalkthrough && (
        <div className="bg-white border-b border-slate-200 text-slate-700 px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs transition-all shrink-0 shadow-xs" id="walkthrough-panel">
          <div className="space-y-1.5 border-l border-slate-200 pl-4">
            <h3 className={`font-bold ${currentTheme.accentText} flex items-center gap-1.5`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>1. הבנה מהירה תוך 10 שניות</span>
            </h3>
            <p className="leading-relaxed text-slate-600">
              האתר מעוצב כך שבן משפחה חרד או מבולבל יבין מיד שהוא <strong>לא לבד</strong>, שיש עזרה מתאימה ושקורס קשרי משפחה והכוונה הם עמודי התווך של העמותה.
            </p>
          </div>
          <div className="space-y-1.5 border-l border-slate-200 pl-4">
            <h3 className={`font-bold ${currentTheme.accentText} flex items-center gap-1.5`}>
              <AlertTriangle className="w-4 h-4" />
              <span>2. הצבת גבולות וביטחון (RTL)</span>
            </h3>
            <p className="leading-relaxed text-slate-600">
              האתר <strong>אינו מוקד חירום</strong> ואינו מאבחן קלינית. הצבנו תיבות אזהרה ודיסקליימרים ברורים בראש העמודים ובפוטר למניעת בלבול קריטי.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className={`font-bold ${currentTheme.accentText} flex items-center gap-1.5`}>
              <Info className="w-4 h-4" />
              <span>3. כיצד להשתמש בכלי זה?</span>
            </h3>
            <p className="leading-relaxed text-slate-600">
              עברו בין העמודים בתפריט הימני. לחצו על <strong>מקטע כלשהו בוויירפריים</strong> כדי לצפות בהוראות המעצב, ה-CTAs והאישורים המשפטיים הנדרשים בצידו השמאלי של המסך.
            </p>
          </div>
        </div>
      )}

      {/* Main Core Dashboard Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden" id="app-workspace-body">
        
        {/* RIGHT SIDEBAR: Page Navigation Menu */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-l border-slate-200 p-4 overflow-y-auto shrink-0 flex flex-col gap-4" id="app-sidebar">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block mb-2 font-mono">תפריט עמודי האתר (9 עמודים)</span>
            <div className="space-y-1" id="sidebar-nav-links">
              {wireframePages.map((page) => {
                const isActive = page.id === currentPageId;
                return (
                  <button
                    key={page.id}
                    onClick={() => setCurrentPageId(page.id)}
                    className={`w-full text-right px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 ${
                      isActive
                        ? `${currentTheme.primaryBtn} shadow-md`
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className={`p-1 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {getPageIcon(page.id)}
                    </span>
                    <div className="flex-1 truncate">
                      <span className="block font-bold">{page.title}</span>
                      <span className={`text-[9px] block font-normal truncate mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                        {page.tagline}
                      </span>
                    </div>
                    <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-white/90' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme customizer block */}
          <div className="mt-auto pt-4 border-t border-slate-100" id="sidebar-theme-wrapper">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
          </div>
        </aside>

        {/* WORKSPACE AREA: Visual Wireframe (R/Center) + Technical Specs panel (L) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden" id="workspace-viewport-splitter">
          
          {/* CENTER PANEL: Interactive Wireframe Screen */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col" id="viewport-canvas-panel">
            <div className="flex-1 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col">
              <WireframeRenderer
                currentPage={currentPage}
                selectedSectionId={selectedSectionId}
                onSelectSection={setSelectedSectionId}
                viewportMode={viewportMode}
                setViewportMode={setViewportMode}
                interactiveMode={interactiveMode}
                setInteractiveMode={setInteractiveMode}
                currentTheme={currentTheme}
              />
            </div>
          </div>

          {/* LEFT PANEL: Specifications, Copywriting, Approvals, Feedback comments */}
          <div className="w-full md:w-[380px] lg:w-[440px] p-4 border-t md:border-t-0 md:border-r border-slate-200 overflow-y-auto shrink-0 flex flex-col gap-4 bg-slate-50/50" id="specification-panel">
            
            {/* Technical Detail Sheet */}
            <div className="flex-1 min-h-[350px]">
              <DetailsPanel
                currentPage={currentPage}
                selectedSectionId={selectedSectionId}
                onSelectSection={setSelectedSectionId}
              />
            </div>

            {/* Interactive Feedback & Team Review Persistence System */}
            <div className="shrink-0">
              <FeedbackSystem
                currentPage={currentPage}
                selectedSectionId={selectedSectionId}
                onSelectSection={setSelectedSectionId}
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
