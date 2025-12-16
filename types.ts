export type ServiceCategory = 'Location' | 'Transaction' | 'Fiscalité' | 'Gestion';

export type BlogCategory = ServiceCategory | 'Stratégie' | 'Patrimoine' | 'Transmission';

export interface SubService {
  id: string;
  label: string;
  title: string;
  description: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InternalLink {
  title: string;
  slug: string;
  context: 'related' | 'suggested';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  date: string;
  content?: string;
  metaDescription?: string;
  ogImage?: string;
  keywords?: string[];
  faqItems?: FAQItem[];
  internalLinks?: InternalLink[];
}

export type PageState = 'home' | 'category-landing' | 'landing' | 'blog-post';