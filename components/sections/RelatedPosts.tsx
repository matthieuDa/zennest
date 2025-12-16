import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { ArrowRight, Clock } from 'lucide-react'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="my-16 bg-stone-50 rounded-3xl p-8 md:p-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Articles Connexes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-black transition-colors"
          >
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full uppercase tracking-wider">
                {post.category}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-black line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-stone-600 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
