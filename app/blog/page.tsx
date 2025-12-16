import { getAllBlogPosts } from '@/lib/blog'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BlogList from '@/components/sections/BlogList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - ZenNest',
  description: 'Stratégies fiscales et patrimoniales pour investisseurs immobiliers avisés.',
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <div className="min-h-screen bg-white pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Blog ZenNest
              </h1>
              <p className="text-xl text-stone-500 font-light max-w-2xl">
                Stratégies fiscales, optimisation patrimoniale et décryptage des dispositifs immobiliers français.
              </p>
            </div>

            {/* Blog List with Filtering */}
            <BlogList posts={posts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
