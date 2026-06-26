import React, { useState, useEffect } from 'react';
import { ReviewComment, PageId, WireframePage } from '../types';
import { MessageSquare, Star, Trash2, Calendar, FileText, Download } from 'lucide-react';

interface FeedbackSystemProps {
  currentPage: WireframePage;
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
}

export const FeedbackSystem: React.FC<FeedbackSystemProps> = ({
  currentPage,
  selectedSectionId,
  onSelectSection
}) => {
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [activeTab, setActiveTab] = useState<'current' | 'all'>('current');

  // Load comments on mount
  useEffect(() => {
    const stored = localStorage.getItem('neabpd_wireframe_comments');
    if (stored) {
      try {
        setComments(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save comments when they change
  const saveComments = (updated: ReviewComment[]) => {
    setComments(updated);
    localStorage.setItem('neabpd_wireframe_comments', JSON.stringify(updated));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: ReviewComment = {
      id: Math.random().toString(36).substring(2, 9),
      pageId: currentPage.id,
      sectionId: selectedSectionId || undefined,
      userName: userName.trim() || 'מבקר אנונימי',
      content: newComment.trim(),
      rating: rating,
      timestamp: new Date().toLocaleString('he-IL')
    };

    const updated = [comment, ...comments];
    saveComments(updated);
    setNewComment('');
    // keep user name for convenience
  };

  const handleDeleteComment = (id: string) => {
    const updated = comments.filter((c) => c.id !== id);
    saveComments(updated);
  };

  const exportToTxt = () => {
    if (comments.length === 0) {
      alert('אין הערות לייצוא עדיין.');
      return;
    }
    const header = `דוח הערות ומשוב ל-Wireframes של אתר NEABPD Israel\nנוצר בתאריך: ${new Date().toLocaleDateString('he-IL')}\n==================================================\n\n`;
    const body = comments
      .map((c, i) => {
        return `${i + 1}. עמוד: ${c.pageId}\n   מקטע: ${c.sectionId || 'עמוד כללי'}\n   מאת: ${c.userName}\n   דירוג: ${'★'.repeat(c.rating)}${'☆'.repeat(5 - c.rating)}\n   תאריך: ${c.timestamp}\n   תוכן המשוב:\n   "${c.content}"\n--------------------------------------------------\n`;
      })
      .join('\n');

    const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NEABPD_Israel_Wireframe_Feedback_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtered comments based on active tab
  const filteredComments = activeTab === 'current'
    ? comments.filter((c) => c.pageId === currentPage.id)
    : comments;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs" id="feedback-system">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3" id="feedback-header">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-blue" />
          <h3 className="font-semibold text-slate-800 text-sm">הערות מעצבים וסוקרים</h3>
        </div>
        {comments.length > 0 && (
          <button
            onClick={exportToTxt}
            className="flex items-center gap-1.5 text-xs text-brand-blue hover:text-brand-blue/80 font-medium transition-colors"
            title="ייצוא הערות לקובץ טקסט"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ייצוא הערות</span>
          </button>
        )}
      </div>

      {/* Select context section banner */}
      {selectedSectionId ? (
        <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-lg p-2.5 mb-4 text-xs text-brand-blue flex justify-between items-center" id="section-feedback-notice">
          <span>
            כותב הערה עבור המקטע: <strong className="font-semibold">{currentPage.sections.find(s => s.id === selectedSectionId)?.title}</strong>
          </span>
          <button
            onClick={() => onSelectSection(null)}
            className="text-[10px] text-brand-blue underline font-medium hover:text-brand-blue/80"
          >
            ביטול מיקוד
          </button>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-2.5 mb-4 text-xs text-slate-600">
          כתיבת הערה כללית לעמוד הנוכחי. לחצו על מקטע מסוים בויירפריים כדי להעיר ספציפית עליו.
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleAddComment} className="space-y-3 mb-5" id="feedback-form">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">שם הכותב/ת</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="לדוג׳: מאבחן מקצועי, מעצב UX"
              className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue bg-slate-50/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">רמת התאמה קלינית/חווייתית</label>
            <div className="flex gap-0.5 mt-1 justify-end">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-0.5 text-amber-400 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-4 h-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">הערה, משוב או תיקון מוצע</label>
          <textarea
            required
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="רשמו כאן תיקוני טקסט, הערות נגישות או דגשים מקצועיים..."
            className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-medium text-xs py-2 rounded-lg transition-colors cursor-pointer"
        >
          שמירת הערת משוב
        </button>
      </form>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 mb-3" id="feedback-tabs">
        <button
          onClick={() => setActiveTab('current')}
          className={`flex-1 pb-2 text-center text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'current'
              ? 'border-brand-blue text-brand-blue'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          הערות לעמוד זה ({comments.filter((c) => c.pageId === currentPage.id).length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 pb-2 text-center text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'all'
              ? 'border-brand-blue text-brand-blue'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          כל ההערות שלי ({comments.length})
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1" id="comments-list">
        {filteredComments.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs" id="no-comments">
            <MessageSquare className="w-8 h-8 mx-auto text-slate-200 mb-1.5" />
            <p>אין הערות רשומות עדיין.</p>
            <p className="text-[10px] mt-1 text-slate-400">הוסיפו הערות כדי לשתף מובנים מקצועיים.</p>
          </div>
        ) : (
          filteredComments.map((comment) => {
            const relativeSection = currentPage.sections.find((s) => s.id === comment.sectionId);
            return (
              <div
                key={comment.id}
                className="bg-slate-50 hover:bg-slate-100/80 p-3 rounded-lg border border-slate-100 text-xs transition-colors relative group"
                id={`comment-card-${comment.id}`}
              >
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="absolute left-2.5 top-2.5 text-slate-300 hover:text-rose-600 transition-colors p-1"
                  title="מחיקת הערה"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="flex justify-between items-start pl-6 mb-1.5">
                  <div>
                    <span className="font-semibold text-slate-700">{comment.userName}</span>
                    <span className="text-slate-400 text-[10px] mx-1.5">•</span>
                    <span className="text-slate-400 text-[10px]">{comment.timestamp}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: comment.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-2 break-words">{comment.content}</p>

                {/* Subtag context info */}
                <div className="flex flex-wrap items-center gap-2 mt-1 pt-1.5 border-t border-slate-200/50 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileText className="w-2.5 h-2.5" />
                    <span>עמוד: {comment.pageId === 'home' ? 'בית' : comment.pageId}</span>
                  </span>
                  {relativeSection && (
                    <span className="bg-brand-blue/5 text-brand-blue px-1.5 py-0.5 rounded-sm">
                      מקטע: {relativeSection.title}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
