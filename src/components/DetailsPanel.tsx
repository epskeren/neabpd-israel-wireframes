import React, { useState, useEffect } from 'react';
import { WireframePage, WireframeSection } from '../types';
import { ListOrdered, FileText, MousePointerClick, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';

interface DetailsPanelProps {
  currentPage: WireframePage;
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
  currentPage,
  selectedSectionId,
  onSelectSection
}) => {
  const [activeTab, setActiveTab] = useState<'sections' | 'copy_ctas' | 'ux_notes' | 'approvals'>('sections');

  // Auto-switch tabs to 'copy_ctas' or keep as is when section is selected
  useEffect(() => {
    if (selectedSectionId && activeTab === 'sections') {
      setActiveTab('copy_ctas');
    }
  }, [selectedSectionId]);

  const selectedSection = currentPage.sections.find((s) => s.id === selectedSectionId) || null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-full" id="details-panel">
      {/* Page Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-4 shrink-0" id="details-panel-header">
        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono">מפרט טכני וקליני</span>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-0.5" id="page-technical-title">
          <span>אפיון: {currentPage.title}</span>
          <span className="text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
            {currentPage.sections.length} אזורים מתוכננים
          </span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">{currentPage.tagline}</p>
        <div className="mt-2 text-xs bg-brand-blue/5 p-2 rounded-lg border border-brand-blue/10 text-slate-600">
          <strong className="text-brand-blue block font-semibold mb-0.5">מטרת העל:</strong> {currentPage.purpose}
        </div>
      </div>

      {/* Detail Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 text-xs shrink-0" id="details-tabs">
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex-1 py-2.5 text-center font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'sections'
              ? 'border-brand-blue text-brand-blue bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>סדר ומקטעים</span>
        </button>
        <button
          onClick={() => setActiveTab('copy_ctas')}
          className={`flex-1 py-2.5 text-center font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'copy_ctas'
              ? 'border-brand-blue text-brand-blue bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>כותרות ו-CTA</span>
        </button>
        <button
          onClick={() => setActiveTab('ux_notes')}
          className={`flex-1 py-2.5 text-center font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'ux_notes'
              ? 'border-brand-blue text-brand-blue bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>הנחיות UX</span>
        </button>
        <button
          onClick={() => setActiveTab('approvals')}
          className={`flex-1 py-2.5 text-center font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'approvals'
              ? 'border-brand-blue text-brand-blue bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>אישורים נדרשים</span>
        </button>
      </div>

      {/* Selected section quick-jump panel */}
      {selectedSectionId && (
        <div className="bg-amber-50 border-b border-amber-100/50 px-4 py-2 flex items-center justify-between text-xs text-amber-900 shrink-0">
          <span className="truncate">
            נבחר מקטע: <strong>{selectedSection?.title}</strong>
          </span>
          <button
            onClick={() => onSelectSection(null)}
            className="text-[10px] text-amber-700 hover:text-amber-950 font-bold underline"
          >
            הצג הכל
          </button>
        </div>
      )}

      {/* Tab Contents Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" id="details-tab-content">
        {/* TABS: SECTIONS */}
        {activeTab === 'sections' && (
          <div className="space-y-3" id="sections-tab-view">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">זרימת תוכן בעמוד לפי סדר ההיררכיה</h3>
            <div className="space-y-2.5">
              {currentPage.sections.map((section) => {
                const isSelected = section.id === selectedSectionId;
                return (
                  <button
                    key={section.id}
                    onClick={() => onSelectSection(section.id)}
                    className={`w-full text-right p-3 rounded-lg border text-xs transition-all flex items-start gap-3 group ${
                      isSelected
                        ? 'border-brand-blue bg-brand-blue/5 shadow-xs'
                        : 'border-slate-100 hover:border-slate-300 bg-slate-50/40'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 font-mono text-[10px] group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      {section.order}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 text-sm group-hover:text-brand-blue transition-colors">
                          {section.title}
                        </span>
                        <MousePointerClick className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5 truncate">
                        סוג פריסה: {section.layoutType === 'hero' ? 'כותרת ראשית ומזמינה' : section.layoutType === 'cards_grid' ? 'רשת כרטיסיות' : section.layoutType === 'form_mock' ? 'טופס קלט דינמי' : 'תוכן וקישורים'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TABS: COPY AND CTAS */}
        {activeTab === 'copy_ctas' && (
          <div className="space-y-4" id="copy-tab-view">
            {selectedSection ? (
              <div className="space-y-4">
                {/* Proposed Headings */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    כותרות מוצעות (RTL)
                  </h4>
                  <ul className="space-y-2 list-disc list-inside text-slate-700 font-medium">
                    {selectedSection.proposedHeadings.map((heading, i) => (
                      <li key={i} className="text-sm border-r-2 border-slate-300 pr-2 list-none bg-white p-2 rounded-md shadow-2xs">
                        {heading}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    קריאות לפעולה (CTAs)
                  </h4>
                  {selectedSection.ctas.length > 0 ? (
                    <div className="space-y-1.5">
                      {selectedSection.ctas.map((cta, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-md p-2 flex items-center justify-between">
                          <span className="font-semibold text-slate-800 text-xs">{cta}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                            i === 0 ? 'bg-brand-blue/10 text-brand-blue' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {i === 0 ? 'ראשי' : 'משני'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">לא נדרש כפתור הנעה לפעולה במקטע זה.</p>
                  )}
                </div>

                {/* Copy content placeholders */}
                {selectedSection.items && selectedSection.items.length > 0 && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-500 mb-2">טקסטים ופריטי מידע מוצעים</h4>
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {selectedSection.items.map((item, i) => (
                        <div key={i} className="bg-white p-2 rounded-md border border-slate-100 text-[11px]">
                          <strong className="text-slate-800 block text-xs">{item.title}</strong>
                          {item.description && <p className="text-slate-500 mt-0.5">{item.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                <HelpCircle className="w-10 h-10 mx-auto text-slate-200 mb-2 animate-pulse" />
                <p className="font-semibold text-slate-600 text-sm mb-1">לא נבחר מקטע ספציפי</p>
                <p>לחצו על מקטע כלשהו בוויירפריים בצד ימין כדי לראות את הכותרות והנחיות ה-CTA שלו, או בחרו מהרשימה בטאב הראשון.</p>
              </div>
            )}
          </div>
        )}

        {/* TABS: UX NOTES */}
        {activeTab === 'ux_notes' && (
          <div className="space-y-4" id="ux-tab-view">
            {selectedSection ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 mb-1">הנחיות חוויית משתמש (UX) למקודד ומעצב:</h3>
                <div className="space-y-2">
                  {selectedSection.uxNotes.map((note, i) => (
                    <div key={i} className="bg-brand-blue/5 border border-brand-blue/10 p-3 rounded-lg flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-brand-blue text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-brand-blue leading-relaxed font-semibold">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-700">עקרונות UX כלליים לעמוד זה:</h3>
                <div className="space-y-2">
                  <div className="bg-brand-blue/5 border border-brand-blue/10 p-3 rounded-lg text-xs text-slate-700">
                    <strong className="block text-brand-blue font-semibold mb-1">1. RTL מלא ורספונסיביות קפדנית:</strong>
                    כל הרכיבים חייבים לתמוך ביישור לימין, טיפוגרפיה המונעת קטיעת מילים ארוכות, והתאמה למובייל (טאבלט/טלפון).
                  </div>
                  <div className="bg-brand-blue/5 border border-brand-blue/10 p-3 rounded-lg text-xs text-slate-700">
                    <strong className="block text-brand-blue font-semibold mb-1">2. מקום מרווח ונשימה (Negative Space):</strong>
                    מניעת תחושת דחיסות. בני משפחה במצוקה חווים עומס רגשי - העיצוב חייב להשרות סדר, שקט ואיזון.
                  </div>
                  <div className="bg-brand-blue/5 border border-brand-blue/10 p-3 rounded-lg text-xs text-slate-700">
                    <strong className="block text-brand-blue font-semibold mb-1">3. היררכיה ברורה ללא קישוטי סרק:</strong>
                    אין להשתמש באלמנטים דרמטיים, גימיקים טכנולוגיים או אנימציות מהירות מדי.
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  * לחצו על מקטע ספציפי לקבלת הערות UX המכוונות בדיוק לאותו מקטע.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TABS: LEGAL / CLINICAL APPROVALS */}
        {activeTab === 'approvals' && (
          <div className="space-y-4" id="approvals-tab-view">
            {selectedSection ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5 text-rose-700" id="approval-required-title">
                  <span className="w-2 h-2 rounded-full bg-rose-600 block animate-ping shrink-0" />
                  אישורים מקצועיים ומשפטיים נדרשים למקטע:
                </h3>
                {selectedSection.approvalsRequired.length > 0 ? (
                  <div className="space-y-2">
                    {selectedSection.approvalsRequired.map((app, i) => (
                      <div key={i} className="bg-rose-50 border border-rose-100 p-3 rounded-lg flex items-start gap-2 text-rose-950">
                        <span className="text-rose-600 text-xs font-bold mt-0.5 shrink-0">⚠</span>
                        <p className="text-xs leading-relaxed font-semibold">{app}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg text-center text-xs text-slate-500">
                    מקטע זה מבוסס על תוכן פשוט או מנהלתי ואינו דורש אישור קליני או משפטי חריג.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700">אישור תכנים בעמותה:</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  העבודה מול בני משפחה השרויים במצוקה רגשית גדולה דורשת רגישות אתית ורפואית עליונה. יש לוודא שאין הצגה של סימנים מזהים של פונים בטפסים, וכי כל תוכן פסיכו-חינוכי עובר הגהה של קלינאים מוסמכים בלבד.
                </p>
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-950">
                  <strong className="block text-amber-900 font-semibold mb-1">כלל זהב:</strong>
                  אין להבטיח אבחון, תוצאה טיפולית או מענה מיידי בזמן אמת. תמיד יש להציב את הדיסקליימר המפנה לגורמי חירום רשמיים.
                </div>
                <p className="text-[11px] text-slate-400">
                  * לחצו על מקטעים מסוימים כדי לבדוק אישורים משפטיים וקליניים ספציפיים (לדוגמה: אישור סעיף 46, שמירת CRM, דיסקליימרים).
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Panel Footer */}
      <div className="bg-slate-50 border-t border-slate-100 p-3 text-center text-[10px] text-slate-400 shrink-0 font-mono flex items-center justify-between" id="technical-panel-footer">
        <span>NEABPD Israel © 2026</span>
        <span>גרסת אפיון: v1.2</span>
      </div>
    </div>
  );
};
