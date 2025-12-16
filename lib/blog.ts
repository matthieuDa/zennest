import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types';

const BLOG_POSTS_DIR = path.join(process.cwd(), 'blog-posts');

export interface BlogPostMetadata {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  metaDescription?: string;
  ogImage?: string;
  keywords?: string[];
  faqItems?: Array<{ question: string; answer: string }>;
  internalLinks?: Array<{ title: string; slug: string; context: 'related' | 'suggested' }>;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_POSTS_DIR).filter(file => file.endsWith('.mdx'));
  
  const posts = files.map(file => {
    const filePath = path.join(BLOG_POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const metadata = data as BlogPostMetadata;
    const slug = file.replace('.mdx', '');

    return {
      id: slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      category: metadata.category,
      readTime: metadata.readTime,
      date: metadata.date,
      content: content,
    } as BlogPost;
  });

  // Trier par date (plus récent en premier)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_POSTS_DIR, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const metadata = data as BlogPostMetadata;

    return {
      id: slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      category: metadata.category,
      readTime: metadata.readTime,
      date: metadata.date,
      content: content,
      metaDescription: metadata.metaDescription,
      ogImage: metadata.ogImage,
      keywords: metadata.keywords,
      faqItems: metadata.faqItems,
      internalLinks: metadata.internalLinks,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.category === category);
}
