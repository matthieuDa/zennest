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

/**
 * Get related posts based on category and keywords similarity
 * @param currentPost The current post to find related posts for
 * @param limit Maximum number of related posts to return
 * @returns Array of related posts sorted by relevance
 */
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
  
  // Calculate relevance score for each post
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Same category gets highest priority (50 points)
    if (post.category === currentPost.category) {
      score += 50;
    }
    
    // Check keyword overlap (5 points per matching keyword)
    if (currentPost.keywords && post.keywords) {
      const currentKeywords = new Set(currentPost.keywords.map(k => k.toLowerCase()));
      const matchingKeywords = post.keywords.filter(k => 
        currentKeywords.has(k.toLowerCase())
      );
      score += matchingKeywords.length * 5;
    }
    
    // Check if current post links to this post (30 points)
    if (currentPost.internalLinks) {
      const linkedSlugs = currentPost.internalLinks.map(link => link.slug);
      if (linkedSlugs.includes(post.id)) {
        score += 30;
      }
    }
    
    // Check if the other post links back to current post (20 points)
    if (post.internalLinks) {
      const linkedSlugs = post.internalLinks.map(link => link.slug);
      if (linkedSlugs.includes(currentPost.id)) {
        score += 20;
      }
    }
    
    return { post, score };
  });
  
  // Sort by score (descending) and return top N
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
