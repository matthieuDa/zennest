export type ServiceCategory = 'Location' | 'Transaction' | 'Fiscalité' | 'Gestion';

export interface SubService {
  id: string;
  label: string;
  title: string;
  description: string;
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: ServiceCategory;
  readTime: string;
  date: string;
  content?: string;
}

export type PageState = 'home' | 'category-landing' | 'landing' | 'blog-post';