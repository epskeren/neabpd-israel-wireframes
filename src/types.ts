export type PageId =
  | 'home'
  | 'eligibility'
  | 'bpd_info'
  | 'guidance_call'
  | 'course'
  | 'knowledge_center'
  | 'about_donations'
  | 'contact'
  | 'footer_pages';

export interface WireframeSection {
  id: string;
  title: string;
  subtitle?: string;
  order: number;
  proposedHeadings: string[];
  ctas: string[];
  uxNotes: string[];
  approvalsRequired: string[];
  // Structure instructions to render realistic layouts
  layoutType:
    | 'hero'
    | 'cards_grid'
    | 'horizontal_flow'
    | 'split_text_image'
    | 'form_mock'
    | 'faq_accordion'
    | 'impact_stats'
    | 'footer_links'
    | 'interactive_knowledge'
    | 'donations_pricing'
    | 'text_document';
  items?: Array<{
    title: string;
    description?: string;
    iconName?: string;
    cta?: string;
    tag?: string;
  }>;
}

export interface WireframePage {
  id: PageId;
  title: string;
  tagline: string;
  purpose: string;
  targetAudience: string;
  sections: WireframeSection[];
}

export interface ReviewComment {
  id: string;
  pageId: PageId;
  sectionId?: string;
  userName: string;
  content: string;
  rating: number; // 1 to 5 stars
  timestamp: string;
}

export interface CalmTheme {
  id: string;
  name: string;
  primaryClass: string;      // e.g. 'bg-teal-600 text-white'
  secondaryClass: string;    // e.g. 'bg-teal-50 text-teal-800'
  accentBorder: string;      // e.g. 'border-teal-500'
  textColor: string;         // e.g. 'text-teal-900'
  accentText: string;        // e.g. 'text-teal-600'
  focusRing: string;         // e.g. 'focus:ring-teal-500'
  primaryBtn: string;        // e.g. 'bg-teal-600 hover:bg-teal-700 text-white'
  secondaryBtn: string;      // e.g. 'bg-slate-100 hover:bg-slate-200 text-slate-700'
}
