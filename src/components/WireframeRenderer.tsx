import React, { useState } from 'react';
import { WireframePage, WireframeSection, CalmTheme } from '../types';
import {
  PhoneCall,
  GraduationCap,
  BookOpen,
  ShieldAlert,
  Video,
  FileText,
  Search,
  CheckCircle2,
  Laptop,
  Smartphone,
  Eye,
  Menu,
  Heart,
  ChevronDown,
  ChevronUp,
  MapPin,
  Lock,
  ArrowRightLeft,
  X
} from 'lucide-react';

interface WireframeRendererProps {
  currentPage: WireframePage;
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
  viewportMode: 'desktop' | 'mobile';
  setViewportMode: (mode: 'desktop' | 'mobile') => void;
  interactiveMode: 'wireframe' | 'interactive';
  setInteractiveMode: (mode: 'wireframe' | 'interactive') => void;
  currentTheme: CalmTheme;
}

export const WireframeRenderer: React.FC<WireframeRendererProps> = ({
  currentPage,
  selectedSectionId,
  onSelectSection,
  viewportMode,
  setViewportMode,
  interactiveMode,
  setInteractiveMode,
  currentTheme
}) => {
  // States for interactive simulations
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Knowledge search & category states
  const [knowledgeSearch, setKnowledgeSearch] = useState('');
  const [selectedKnowledgeCategory, setSelectedKnowledgeCategory] = useState('הכל');

  // Contact / Guidance Form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'הורה',
    contactMethod: 'טלפון',
    message: '',
    agreed: false
  });

  // Donation State
  const [donationTier, setDonationTier] = useState<'once' | 'monthly' | 'scholarship' | null>(null);
  const [donationAmount, setDonationAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donationMethod, setDonationMethod] = useState<'credit' | 'bit' | 'bank'>('credit');
  const [cardNumber, setCardNumber] = useState('');

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to render Lucide Icons by name string
  const renderIcon = (name?: string) => {
    switch (name) {
      case 'PhoneCall':
        return <PhoneCall className={`w-5 h-5 ${currentTheme.accentText}`} />;
      case 'GraduationCap':
        return <GraduationCap className={`w-5 h-5 ${currentTheme.accentText}`} />;
      case 'BookOpen':
        return <BookOpen className={`w-5 h-5 ${currentTheme.accentText}`} />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case 'Video':
        return <Video className="w-5 h-5 text-amber-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-sky-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-slate-500" />;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Simulate auto-reset after 5 secs
      // setFormSubmitted(false);
    }, 10000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      role: 'הורה',
      contactMethod: 'טלפון',
      message: '',
      agreed: false
    });
    setFormSubmitted(false);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSuccess(true);
  };

  const resetDonation = () => {
    setDonationSuccess(false);
    setDonationTier(null);
    setCardNumber('');
  };

  // Filter logic for Knowledge center articles
  const filterArticles = (items: any[]) => {
    if (!items) return [];
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(knowledgeSearch.toLowerCase()) || 
                            (item.description && item.description.toLowerCase().includes(knowledgeSearch.toLowerCase()));
      const matchesCategory = selectedKnowledgeCategory === 'הכל' || 
                              (item.tag && item.tag.includes(selectedKnowledgeCategory)) ||
                              (selectedKnowledgeCategory === 'כלים ומיומנויות' && item.tag === 'כלים ומיומנויות') ||
                              (selectedKnowledgeCategory === 'פגיעה עצמית' && item.tag === 'פגיעה עצמית ואובדנות') ||
                              (selectedKnowledgeCategory === 'סרטונים והרצאות' && item.tag === 'סרטונים והרצאות') ||
                              (selectedKnowledgeCategory === 'DBT' && item.tag === 'DBT ומיומנויות');
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200" id="wireframe-renderer-root">
      {/* Visual Workspace Controls */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0" id="renderer-controls">
        <div className="flex items-center gap-2" id="renderer-toggle-viewports">
          <span className="text-xs font-bold text-slate-400 font-mono">תצוגת מסך:</span>
          <button
            onClick={() => { setViewportMode('desktop'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewportMode === 'desktop'
                ? `${currentTheme.primaryBtn} shadow-xs`
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>מחשב (Desktop)</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewportMode === 'mobile'
                ? `${currentTheme.primaryBtn} shadow-xs`
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>מובייל (Mobile)</span>
          </button>
        </div>

        <div className="flex items-center gap-2" id="renderer-toggle-modes">
          <span className="text-xs font-bold text-slate-400 font-mono">מצב סימולציה:</span>
          <button
            onClick={() => setInteractiveMode('wireframe')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              interactiveMode === 'wireframe'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="מציג תוויות שלבי אפיון והסברים למעצבים"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>תוויות אפיון (Wireframe)</span>
          </button>
          <button
            onClick={() => setInteractiveMode('interactive')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              interactiveMode === 'interactive'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="מאפשר להזין טפסים, לחפש תוכן וללחוץ על כפתורים"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>סימולציה פעילה (RTL)</span>
          </button>
        </div>
      </div>

      {/* Simulator Device Enclosure */}
      <div className="flex-1 overflow-y-auto p-4 flex items-start justify-center wireframe-pattern" id="viewport-canvas-container">
        <div
          id="viewport-frame"
          className={`bg-white transition-all duration-300 shadow-xl border border-slate-300 relative flex flex-col ${
            viewportMode === 'desktop'
              ? 'w-full max-w-5xl min-h-[750px] rounded-lg'
              : 'w-[360px] min-h-[640px] rounded-[36px] border-[12px] border-slate-800 overflow-hidden'
          }`}
          style={{ direction: 'rtl' }}
        >
          {/* Mobile Phone speaker & camera notch */}
          {viewportMode === 'mobile' && (
            <div className="h-6 bg-slate-800 w-full relative flex items-center justify-between px-6 text-[10px] text-white shrink-0 font-mono select-none">
              <span>09:41</span>
              <div className="w-16 h-4 bg-slate-800 rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-slate-700 rounded-full block mr-1" />
                <span className="w-8 h-1 bg-slate-700 rounded-full block" />
              </div>
              <div className="flex gap-1 items-center">
                <span>LTE</span>
                <span className="w-3 h-2 bg-white block rounded-xs" />
              </div>
            </div>
          )}

          {/* Browser Address Bar for Desktop */}
          {viewportMode === 'desktop' && (
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2 shrink-0 font-mono text-xs select-none">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 bg-rose-400 rounded-full block" />
                <span className="w-3 h-3 bg-amber-400 rounded-full block" />
                <span className="w-3 h-3 bg-emerald-400 rounded-full block" />
              </div>
              <div className="flex-1 bg-white border border-slate-200/80 rounded-md py-0.5 px-3 text-slate-400 truncate text-[11px] text-right flex items-center gap-1">
                <span className="text-emerald-600 font-bold">🔒 https://</span>
                <span>www.neabpd.org.il/{currentPage.id === 'home' ? '' : currentPage.id}</span>
              </div>
            </div>
          )}

          {/* SIMULATED WEB SITE APPLICATION */}
          <div className="flex-1 flex flex-col bg-white overflow-y-auto" id="simulated-website-app">
            
            {/* 1. HEADER COMPONENT (Simulating NEABPD Israel Official Header) */}
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 shadow-xs shrink-0 flex justify-between items-center" id="simulated-header">
              {/* Logo container */}
              <div className="flex items-center gap-2 cursor-pointer" id="logo-block">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentTheme.primaryClass}`}>
                  FC
                </div>
                <div>
                  <h1 className="font-extrabold text-sm text-slate-800 tracking-tight leading-none">NEABPD Israel</h1>
                  <span className="text-[9px] text-slate-400 block mt-0.5 font-semibold">עמותה לסיוע וקשרי משפחה</span>
                </div>
              </div>

              {/* Navigation links for Desktop */}
              {viewportMode === 'desktop' && (
                <nav className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                  <span className={`hover:opacity-85 cursor-pointer transition-colors px-1 py-1 text-slate-900 border-b-2 ${currentTheme.accentBorder}`}>בית</span>
                  <span className="hover:opacity-85 cursor-pointer transition-colors px-1 py-1">האם זה מתאים?</span>
                  <span className="hover:opacity-85 cursor-pointer transition-colors px-1 py-1">מידע על BPD</span>
                  <span className={`hover:opacity-85 cursor-pointer transition-colors px-1 py-1 ${currentTheme.accentText}`}>קורס משפחות</span>
                  <span className="hover:opacity-85 cursor-pointer transition-colors px-1 py-1">מרכז ידע</span>
                </nav>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className={`text-[11px] font-bold px-3 py-1.5 rounded-full cursor-pointer transition-all ${currentTheme.primaryBtn}`}>
                  אני רוצה הכוונה
                </button>
                {viewportMode === 'desktop' && (
                  <button className="text-[10px] bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-rose-200">
                    <Heart className="w-3 h-3 fill-rose-600 text-rose-600" />
                    <span>תרומה</span>
                  </button>
                )}
                {viewportMode === 'mobile' && (
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1 text-slate-600 hover:bg-slate-100 rounded-md">
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </header>

            {/* Mobile Menu Dropdown */}
            {viewportMode === 'mobile' && mobileMenuOpen && (
              <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-2.5 z-40 relative text-right text-xs shrink-0">
                <span className="block font-semibold py-1.5 border-b border-slate-200/60 text-slate-800">בית</span>
                <span className="block font-semibold py-1.5 border-b border-slate-200/60 text-slate-600">האם זה מתאים לנו?</span>
                <span className="block font-semibold py-1.5 border-b border-slate-200/60 text-slate-600">BPD ואי-ויסות רגשי</span>
                <span className="block font-semibold py-1.5 border-b border-slate-200/60 text-slate-600">שיחת הכוונה</span>
                <span className="block font-semibold py-1.5 border-b border-slate-200/60 text-slate-600">קורס קשרי משפחה</span>
                <span className="block font-semibold py-1.5 border-b border-slate-200/60 text-slate-600">מרכז ידע</span>
                <button className="w-full bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 mt-2">
                  <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                  <span>לתרומה צנועה לעמותה</span>
                </button>
              </div>
            )}

            {/* Emergency Ribbon warning (Crucial condition - Association is NOT emergency helpline) */}
            <div className="bg-rose-600 text-white text-[10px] py-1.5 px-4 text-center font-bold tracking-tight shrink-0">
              העמותה אינה מוקד חירום. אם ישנו חשש מיידי לחיי אדם, פנו מיידית למד"א (101) או למשטרת ישראל (100).
            </div>

            {/* 2. CORE WIREFRAME CONTENT SECTIONS RENDERER */}
            <main className="flex-1 flex flex-col" id="wireframe-sections-list">
              {currentPage.sections.map((section) => {
                const isSelected = section.id === selectedSectionId;
                const isWireframe = interactiveMode === 'wireframe';

                return (
                  <section
                    key={section.id}
                    id={`viewport-section-${section.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSection(section.id);
                    }}
                    className={`relative py-8 px-4 sm:px-6 border-b transition-all ${
                      isWireframe
                        ? isSelected
                          ? `${currentTheme.secondaryClass} ${currentTheme.accentBorder} ring-2 ring-slate-400/20 border-solid`
                          : 'border-dashed border-slate-300 hover:bg-slate-50/60'
                        : 'border-slate-100'
                    }`}
                  >
                    {/* Wireframe metadata tags & overlays */}
                    {isWireframe && (
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 select-none z-10">
                        <span className="bg-slate-800 text-white font-mono font-bold text-[9px] px-1.5 py-0.5 rounded-sm shadow-xs">
                          מקטע {section.order}
                        </span>
                        <span className={`${currentTheme.primaryClass} text-[9px] px-1.5 py-0.5 rounded-sm shadow-xs font-semibold`}>
                          {section.title}
                        </span>
                        {section.approvalsRequired.length > 0 && (
                          <span className="bg-rose-600 text-white text-[9px] px-1.5 py-0.5 rounded-sm shadow-xs font-bold" title="דורש אישור מקצועי/משפטי">
                            אישור קליני נדרש ⚠
                          </span>
                        )}
                      </div>
                    )}

                    {/* RENDER DYNAMIC COMPONENT BASED ON STRUCTURAL TYPE */}
                    <div className="max-w-4xl mx-auto" id={`layout-wrapper-${section.id}`}>
                      
                      {/* HERO TYPE */}
                      {section.layoutType === 'hero' && (
                        <div className="text-center py-6">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            {section.proposedHeadings[0]}
                          </h2>
                          <p className="text-slate-600 text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
                            {section.items?.[0]?.description}
                          </p>
                          <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {section.ctas.map((cta, i) => (
                              <button
                                key={i}
                                className={`text-xs font-bold px-5 py-2.5 rounded-lg cursor-pointer transition-all ${
                                  i === 0 ? currentTheme.primaryBtn : currentTheme.secondaryBtn
                                }`}
                              >
                                {cta}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-3 italic font-medium">
                            * המענים מותאמים לבני משפחה, אנשים קרובים ושותפים לדרך ללא עלות כספית קבועה.
                          </p>
                        </div>
                      )}

                      {/* TEXT DOCUMENT DOCUMENT TYPE */}
                      {section.layoutType === 'text_document' && (
                        <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-4 sm:p-5">
                          <h3 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                            <span>{section.proposedHeadings[0] || section.items?.[0]?.title}</span>
                          </h3>
                          <p className="text-xs text-amber-900 mt-2 leading-relaxed font-medium">
                            {section.items?.[0]?.description}
                          </p>
                        </div>
                      )}

                      {/* CARDS GRID TYPE */}
                      {section.layoutType === 'cards_grid' && (
                        <div>
                          <div className="text-center mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{section.proposedHeadings[0]}</h3>
                            {section.proposedHeadings[1] && (
                              <p className="text-xs text-slate-500 mt-1">{section.proposedHeadings[1]}</p>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {section.items?.map((item, idx) => (
                              <div
                                key={idx}
                                className={`p-4 rounded-xl border bg-white transition-all ${
                                  isWireframe
                                    ? 'border-slate-200'
                                    : 'border-slate-100 hover:shadow-md hover:border-slate-200'
                                }`}
                              >
                                <div className="flex items-start gap-2.5 mb-2">
                                  {item.iconName ? (
                                    <span className="p-1.5 bg-slate-50 rounded-lg block shrink-0">{renderIcon(item.iconName)}</span>
                                  ) : (
                                    <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                                      section.id.includes('elig') ? 'bg-amber-500' : (currentTheme.id === 'brand-logo' ? 'bg-brand-blue' : 'bg-teal-600')
                                    }`} />
                                  )}
                                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug">{item.title}</h4>
                                </div>
                                {item.description && (
                                  <p className="text-slate-500 text-[11px] leading-relaxed pr-4">{item.description}</p>
                                )}
                                {item.cta && (
                                  <button className={`text-[10px] font-bold mt-3 px-3 py-1.5 rounded-md cursor-pointer ${currentTheme.secondaryBtn}`}>
                                    {item.cta}
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          {section.ctas.length > 0 && (
                            <div className="text-center mt-6">
                              <button className={`text-xs font-bold px-5 py-2 rounded-lg cursor-pointer ${currentTheme.primaryBtn}`}>
                                {section.ctas[0]}
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* HORIZONTAL FLOW TIMELINE TYPE */}
                      {section.layoutType === 'horizontal_flow' && (
                        <div>
                          <div className="text-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900">{section.proposedHeadings[0]}</h3>
                            {section.proposedHeadings[1] && (
                              <p className="text-xs text-slate-500 mt-1">{section.proposedHeadings[1]}</p>
                            )}
                          </div>
                          <div className={`grid ${viewportMode === 'desktop' ? 'grid-cols-5 divide-x divide-x-reverse divide-slate-100' : 'grid-cols-1 gap-4'} bg-slate-50/50 p-4 rounded-xl border border-slate-200/60`}>
                            {section.items?.map((item, idx) => (
                              <div key={idx} className="px-3 py-2 text-right relative">
                                <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center mb-2 shrink-0 ${currentTheme.primaryClass}`}>
                                  {idx + 1}
                                </span>
                                <h4 className="font-bold text-slate-800 text-xs leading-snug">{item.title}</h4>
                                {item.description && (
                                  <p className="text-slate-500 text-[10px] mt-1 leading-normal">{item.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SPLIT TEXT AND WIREFRAME LAYOUT SCHEMATIC IMAGE */}
                      {section.layoutType === 'split_text_image' && (
                        <div className={`grid ${viewportMode === 'desktop' ? 'grid-cols-12' : 'grid-cols-1'} gap-6 items-center`}>
                          <div className={`${viewportMode === 'desktop' ? 'col-span-7' : ''} text-right`}>
                            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                              {section.proposedHeadings[0]}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                              {section.items?.[0]?.description}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2.5">
                              {section.ctas.map((cta, i) => (
                                <button
                                  key={i}
                                  className={`text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-all ${
                                    i === 0 ? currentTheme.primaryBtn : currentTheme.secondaryBtn
                                  }`}
                                >
                                  {cta}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Classic Wireframe Box with Cross lines (X placeholder) representing content images/illustrations */}
                          <div className={`${viewportMode === 'desktop' ? 'col-span-5' : ''}`}>
                            <div className="aspect-video sm:aspect-square bg-slate-100 rounded-xl border border-dashed border-slate-300 relative flex flex-col items-center justify-center overflow-hidden p-4 select-none">
                              {/* X Crossing Lines */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                <div className="w-[141%] h-0.5 bg-slate-900 rotate-45 absolute" />
                                <div className="w-[141%] h-0.5 bg-slate-900 -rotate-45 absolute" />
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono bg-white px-2.5 py-1 rounded-full border shadow-2xs z-10 text-center">
                                סקיצה: איור אווירה רגוע / קהילתי
                              </span>
                              <span className="text-[9px] text-slate-400 mt-2 text-center max-w-xs z-10">
                                (לדוגמה: ייצוג מופשט של מעגל שיח או דלת פתוחה. ללא תמונות פאניקה)
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* INTERACTIVE FORM MOCK COMPONENT */}
                      {section.layoutType === 'form_mock' && (
                        <div className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-2xs">
                          <h3 className="text-lg font-bold text-slate-900 text-center mb-1">{section.proposedHeadings[0]}</h3>
                          <p className="text-xs text-slate-500 text-center mb-5">שירות ללא עלות, דיסקרטי ומאובטח המיועד לבני משפחה</p>

                          {formSubmitted ? (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center" id="form-success-banner">
                              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2 animate-bounce" />
                              <h4 className="text-sm font-bold text-emerald-900">הבקשה שלך התקבלה בהצלחה!</h4>
                              <p className="text-xs text-emerald-700 mt-1 max-w-sm mx-auto leading-relaxed">
                                נציג/ת הסברה של עמותת NEABPD Israel (בני משפחה מנוסים שעברו הכשרה) יחזור אליך בתוך 2-3 ימי עסקים לתיאום מועד לשיחה.
                              </p>
                              <button
                                onClick={resetForm}
                                className={`mt-4 text-xs font-bold ${currentTheme.accentText} hover:opacity-80 underline`}
                              >
                                שליחת טופס נוסף / איפוס
                              </button>
                            </div>
                          ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4" id="wireframe-interactive-form">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs font-semibold text-slate-700 mb-1">שם מלא *</label>
                                  <input
                                    type="text"
                                    required
                                    disabled={interactiveMode === 'wireframe'}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder={interactiveMode === 'wireframe' ? '[שדה טקסט חופשי]' : 'ישראל ישראלי'}
                                    className={`w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 ${currentTheme.focusRing} focus:border-slate-400 bg-white`}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-slate-700 mb-1">מספר טלפון ליצירת קשר *</label>
                                  <input
                                    type="tel"
                                    required
                                    disabled={interactiveMode === 'wireframe'}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder={interactiveMode === 'wireframe' ? '[שדה טלפון]' : '050-1234567'}
                                    className={`w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 ${currentTheme.focusRing} focus:border-slate-400 bg-white`}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs font-semibold text-slate-700 mb-1">כתובת אימייל (אופציונלי)</label>
                                  <input
                                    type="email"
                                    disabled={interactiveMode === 'wireframe'}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder={interactiveMode === 'wireframe' ? '[שדה אימייל]' : 'name@example.com'}
                                    className={`w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 ${currentTheme.focusRing} focus:border-slate-400 bg-white`}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-slate-700 mb-1">אני פונה כ... *</label>
                                  <select
                                    disabled={interactiveMode === 'wireframe'}
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className={`w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 ${currentTheme.focusRing} focus:border-slate-400 bg-white`}
                                  >
                                    <option value="הורה">הורה למתמודד/ת</option>
                                    <option value="בן זוג">בן/בת זוג למתמודד/ת</option>
                                    <option value="אח">אח/אחות</option>
                                    <option value="מתמודד">מתמודד/ת בעצמי</option>
                                    <option value="איש מקצוע">איש מקצוע בתחום הטיפול</option>
                                    <option value="אחר">אחר</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">אופן חזרה מועדף *</label>
                                <div className="flex gap-4">
                                  {['טלפון', 'וואטסאפ הודעה', 'אימייל'].map((method) => (
                                    <label key={method} className="flex items-center gap-1.5 text-xs cursor-pointer">
                                      <input
                                        type="radio"
                                        name="contact_method"
                                        disabled={interactiveMode === 'wireframe'}
                                        checked={formData.contactMethod === method}
                                        onChange={() => setFormData({ ...formData, contactMethod: method })}
                                        className={`${currentTheme.accentText} ${currentTheme.focusRing}`}
                                      />
                                      <span>{method}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">הודעה בקצרה (ללא פירוט רפואי רגיש) *</label>
                                <textarea
                                  required
                                  rows={2}
                                  disabled={interactiveMode === 'wireframe'}
                                  value={formData.message}
                                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                  placeholder={interactiveMode === 'wireframe' ? '[תיבת טקסט מורחב - הסבר קצר על מהות הפנייה]' : 'נא לרשום כאן פרטים כלליים בלבד. אין לשתף מידע רפואי רגיש.'}
                                  className={`w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 ${currentTheme.focusRing} focus:border-slate-400 bg-white`}
                                />
                              </div>

                              <div className="flex items-start gap-2 pt-1.5">
                                <input
                                  type="checkbox"
                                  id="agree_box"
                                  required
                                  disabled={interactiveMode === 'wireframe'}
                                  checked={formData.agreed}
                                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                                  className={`mt-0.5 ${currentTheme.accentText} ${currentTheme.focusRing} rounded-xs`}
                                />
                                <label htmlFor="agree_box" className="text-[11px] text-slate-500 leading-tight cursor-pointer">
                                  אני מאשר/ת שמירה מאובטחת של פרטי הקשר שלי במערכת העמותה בלבד, לשם מענה לפנייה זו, בהתאם ל<strong>מדיניות הפרטיות</strong>.
                                </label>
                              </div>

                              <button
                                type="submit"
                                className={`w-full font-bold text-xs py-2.5 rounded-lg cursor-pointer ${
                                  interactiveMode === 'wireframe'
                                    ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                                    : currentTheme.primaryBtn
                                }`}
                              >
                                {interactiveMode === 'wireframe' ? 'שליחת הבקשה (נעול במצב אפיון)' : 'שליחת בקשת שיחת הכוונה מאובטחת'}
                              </button>
                            </form>
                          )}
                        </div>
                      )}

                      {/* FAQ ACCORDION TYPE */}
                      {section.layoutType === 'faq_accordion' && (
                        <div>
                          <div className="text-center mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{section.proposedHeadings[0]}</h3>
                          </div>
                          <div className="space-y-2 max-w-2xl mx-auto">
                            {section.items?.map((item, idx) => {
                              const isOpen = activeFaq === idx;
                              return (
                                <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                                  <button
                                    onClick={() => {
                                      if (interactiveMode === 'interactive') {
                                        setActiveFaq(isOpen ? null : idx);
                                      }
                                    }}
                                    className="w-full flex items-center justify-between p-4 text-right text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                                  >
                                    <span>{item.title}</span>
                                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                                  </button>
                                  {(isOpen || interactiveMode === 'wireframe') && (
                                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                                      {item.description}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* IMPACT STATS TYPE */}
                      {section.layoutType === 'impact_stats' && (
                        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden select-none">
                          <div className="absolute inset-0 bg-radial-gradient from-slate-800 to-slate-950 opacity-40 pointer-events-none" />
                          <div className="relative text-center mb-6 z-10">
                            <h3 className={`text-base font-bold ${currentTheme.accentText} font-mono tracking-wider`}>{section.proposedHeadings[0]}</h3>
                            <p className="text-xs text-slate-400 mt-1">נתוני פעילות מאושרים של העמותה (הערכים מבוקרים קלינית וחשבונאית)</p>
                          </div>
                          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 text-center z-10">
                            {section.items?.map((item, idx) => (
                              <div key={idx} className="space-y-1">
                                <span className={`block text-2xl sm:text-3xl font-extrabold ${currentTheme.accentText} font-mono`}>{item.title}</span>
                                <span className="block text-[11px] text-slate-400 font-medium">{item.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* INTERACTIVE KNOWLEDGE CENTER TYPE */}
                      {section.layoutType === 'interactive_knowledge' && (
                        <div>
                          {/* Top search & filter panel */}
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-4">
                            <div className="relative">
                              <input
                                type="text"
                                disabled={interactiveMode === 'wireframe'}
                                value={knowledgeSearch}
                                onChange={(e) => setKnowledgeSearch(e.target.value)}
                                placeholder={interactiveMode === 'wireframe' ? '[מנוע חיפוש - נעול במצב אפיון]' : 'חיפוש מאמרים, סרטונים, מיומנויות...'}
                                className={`w-full text-xs pr-9 pl-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 ${currentTheme.focusRing} focus:border-slate-400`}
                              />
                              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                            </div>

                            {/* Horizontal Categories filters */}
                            <div className="flex flex-wrap gap-1.5">
                              {['הכל', 'להבין BPD', 'אי-ויסות רגשי', 'כלים ומיומנויות', 'פגיעה עצמית', 'DBT', 'סרטונים'].map((cat) => (
                                <button
                                  key={cat}
                                  onClick={() => {
                                    if (interactiveMode === 'interactive') {
                                      setSelectedKnowledgeCategory(cat);
                                    }
                                  }}
                                  className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${
                                    selectedKnowledgeCategory === cat
                                      ? 'bg-slate-800 text-white border-slate-800'
                                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                                  }`}
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Articles Grid (Using specific filtered elements based on search state!) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="filtered-articles-grid">
                            {filterArticles(
                              currentPage.sections.find(s => s.id === 'know-grid')?.items || []
                            ).length === 0 ? (
                              <div className="col-span-2 text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-xl">
                                לא נמצאו תוצאות לחיפוש הנוכחי. נסה לבצע חיפוש כללי יותר.
                              </div>
                            ) : (
                              filterArticles(
                                currentPage.sections.find(s => s.id === 'know-grid')?.items || []
                              ).map((art, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                                  <div>
                                    <span className="inline-block text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm font-semibold mb-2">
                                      {art.tag}
                                    </span>
                                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug">{art.title}</h4>
                                    <p className="text-slate-500 text-[11px] mt-1.5 leading-relaxed">{art.description}</p>
                                  </div>
                                  <button className={`text-[10px] font-bold mt-4 px-3 py-1.5 rounded-lg text-center cursor-pointer ${currentTheme.secondaryBtn}`}>
                                    {art.cta}
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* INTERACTIVE DONATIONS TIER SYSTEM */}
                      {section.layoutType === 'donations_pricing' && (
                        <div>
                          <div className="text-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900">{section.proposedHeadings[0]}</h3>
                            <p className="text-xs text-slate-500 mt-1">כל תרומה מאפשרת לנו לפתוח מחזורי סיוע נוספים ורענון מיומנויות</p>
                          </div>

                          {donationSuccess ? (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center max-w-md mx-auto" id="donation-success-panel">
                              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                              <h4 className="text-sm font-bold text-emerald-950">תודה רבה על תרומתך הנדיבה!</h4>
                              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                                קבלה רשמית המוכרת לצרכי החזר מס (לפי סעיף 46) תשלח אליך לדואר האלקטרוני שנמסר. העמותה ובוגרי הקורסים מוקירים את פועלך.
                              </p>
                              <button
                                onClick={resetDonation}
                                className={`mt-4 text-xs font-bold ${currentTheme.accentText} hover:opacity-85 underline`}
                              >
                                ביצוע תרומה נוספת
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {section.items?.map((tier, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                      if (interactiveMode === 'interactive') {
                                        setDonationTier(i === 0 ? 'once' : i === 1 ? 'monthly' : 'scholarship');
                                        setDonationAmount(i === 0 ? '100' : i === 1 ? '50' : '500');
                                      }
                                    }}
                                    className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between h-32 ${
                                      donationTier === (i === 0 ? 'once' : i === 1 ? 'monthly' : 'scholarship')
                                        ? `${currentTheme.accentBorder} ${currentTheme.secondaryClass} ring-2 ring-slate-400/10`
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                                  >
                                    <div>
                                      <span className="block font-bold text-slate-800 text-xs sm:text-sm">{tier.title}</span>
                                      <span className="block text-slate-500 text-[10px] mt-1 leading-normal">{tier.description}</span>
                                    </div>
                                    <span className={`block text-xs font-extrabold ${currentTheme.accentText} mt-2`}>
                                      {i === 0 ? '100 ₪ חד-פעמי' : i === 1 ? '50 ₪ לחודש' : '500 ₪ מלגה'}
                                    </span>
                                  </button>
                                ))}
                              </div>

                              {/* Form details to complete mock donation */}
                              {donationTier && (
                                <form onSubmit={handleDonationSubmit} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3" id="mock-donation-form">
                                  <div className="flex gap-2 mb-2">
                                    <button
                                      type="button"
                                      onClick={() => setDonationMethod('credit')}
                                      className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border ${
                                        donationMethod === 'credit' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'
                                      }`}
                                    >
                                      כרטיס אשראי
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDonationMethod('bit')}
                                      className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border ${
                                        donationMethod === 'bit' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'
                                      }`}
                                    >
                                      Bit מהנייד
                                    </button>
                                  </div>

                                  {donationMethod === 'credit' ? (
                                    <div className="space-y-2">
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">שם התורם/ת</label>
                                          <input required type="text" placeholder="ישראל ישראלי" className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md" />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">סכום התרומה (₪)</label>
                                          <input
                                            type="number"
                                            value={donationAmount}
                                            onChange={(e) => setDonationAmount(e.target.value)}
                                            className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono"
                                          />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-3 gap-2">
                                        <div className="col-span-2">
                                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">מספר כרטיס אשראי (הדמיה)</label>
                                          <input
                                            required
                                            type="text"
                                            placeholder="4580 1234 5678 9012"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">תוקף / CVV</label>
                                          <input required type="text" placeholder="12/28 123" className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono" />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center py-2 space-y-1.5">
                                      <p className="text-xs text-slate-600 font-semibold">תשלום מהיר באפליקציית Bit</p>
                                      <input required type="tel" placeholder="050-1234567" className="text-center text-xs px-3 py-1.5 border border-slate-300 rounded-lg max-w-xs mx-auto block font-mono" />
                                    </div>
                                  )}

                                  <button
                                    type="submit"
                                    className={`w-full py-2 ${currentTheme.primaryBtn} text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1`}
                                  >
                                    <Lock className="w-3.5 h-3.5" />
                                    <span>אישור תרומה מאובטחת בסך {donationAmount} ₪</span>
                                  </button>
                                  <span className="block text-[10px] text-slate-400 text-center mt-1">
                                    הסליקה מאובטחת ועומדת בתקני PCI-DSS. סעיף 46 לפקודת מס הכנסה בתוקף.
                                  </span>
                                </form>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  </section>
                );
              })}
            </main>

            {/* 3. FOOTER COMPONENT */}
            <footer className="bg-slate-900 text-slate-300 px-6 py-10 border-t border-slate-800 shrink-0 select-none" id="simulated-footer">
              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Upper row info */}
                <div className={`flex ${viewportMode === 'desktop' ? 'flex-row items-start justify-between' : 'flex-col items-center text-center'} gap-6`}>
                  <div className="space-y-1.5">
                    <h4 className="text-white font-extrabold text-sm tracking-tight">NEABPD Israel</h4>
                    <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
                      עמותה רשומה ללא כוונת רווח. פועלת לקידום בריאות הנפש והכשרת בני משפחה בישראל.
                    </p>
                  </div>
                  <div className="space-y-1 text-xs">
                    <strong className="text-white block font-semibold mb-1">יצירת קשר</strong>
                    <span className="block text-slate-400">info@neabpd.org.il</span>
                    <span className="block text-slate-400">מענה טלפוני: 05X-XXXXXXX</span>
                  </div>
                </div>

                {/* Statutory Required Footer disclaimers */}
                <div className="border-t border-slate-800 pt-4 text-[10px] text-slate-400 space-y-2 leading-relaxed" id="footer-legals">
                  <p>
                    <strong>הבהרה משפטית:</strong> עמותת NEABPD Israel מופעלת בעיקרה על ידי מתנדבים. החומרים, המיומנויות והמאמרים המוצגים באתר נועדו למטרות ידע ושיפור תקשורת משפחתית בלבד ואינם מהווים תחליף לייעוץ פסיכיאטרי, אשפוזי או קליני פרטני.
                  </p>
                  <p className="text-slate-500">
                    כל הזכויות שמורות לעמותת NEABPD Israel © 2026. עיצוב ו-Wireframes מונשמים מבוססי DBT.
                  </p>
                </div>

                {/* Legal compliance required sub-links */}
                <div className="flex flex-wrap gap-4 pt-1 text-[10px] text-slate-500 font-semibold" id="footer-legal-links">
                  <span className="hover:text-white cursor-pointer transition-colors">מדיניות פרטיות ואבטחה (CRM)</span>
                  <span>•</span>
                  <span className="hover:text-white cursor-pointer transition-colors">הצהרת נגישות תקן AA</span>
                  <span>•</span>
                  <span className="hover:text-white cursor-pointer transition-colors">תקנון ותנאי שימוש</span>
                </div>

              </div>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};
