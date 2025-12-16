import { BlogPost } from '@/types';

export function generateArticleSchema(post: BlogPost, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.ogImage ? `https://zennest.fr${post.ogImage}` : undefined,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'ZenNest',
      url: 'https://zennest.fr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ZenNest',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zennest.fr/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://zennest.fr/blog/${slug}`,
    },
    keywords: post.keywords?.join(', '),
  };
}

export function generateFAQSchema(faqItems?: Array<{ question: string; answer: string }>) {
  if (!faqItems || faqItems.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(post: BlogPost, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://zennest.fr',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://zennest.fr/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://zennest.fr/blog/${slug}`,
      },
    ],
  };
}
