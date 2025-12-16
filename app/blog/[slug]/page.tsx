import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog'
import BlogPostContent from '@/components/sections/BlogPostContent'
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/jsonld'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map(post => ({ slug: post.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    }
  }

  const metaDescription = post.metaDescription || post.excerpt;
  const ogImage = post.ogImage || '/images/blog/default-og.png';

  return {
    title: post.title,
    description: metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} - ZenNest`,
      description: metaDescription,
      type: 'article',
      url: `https://zennest.fr/blog/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'ZenNest',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://zennest.fr/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const articleSchema = generateArticleSchema(post, slug);
  const faqSchema = generateFAQSchema(post.faqItems);
  const breadcrumbSchema = generateBreadcrumbSchema(post, slug);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <main className="flex-grow">
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  )
}
