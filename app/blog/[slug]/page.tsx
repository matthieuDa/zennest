import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog'
import BlogPostContent from '@/components/sections/BlogPostContent'

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

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} - ZenNest`,
      description: post.excerpt,
      type: 'article',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  )
}
