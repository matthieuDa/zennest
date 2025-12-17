import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { ArrowRight } from 'lucide-react'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold mb-12 text-gray-900">Articles connexes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {posts.map((post, idx) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group text-left flex flex-col h-full animate-fade-in-up"
            style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
          >
            {/* Top Border with Meta */}
            <div className="border-t border-stone-200 pt-6 mb-4 flex justify-between items-center w-full">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                {post.readTime}
              </span>
              <span className="text-xs font-bold text-stone-300 group-hover:text-black transition-colors">
                Lire l'article
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:underline decoration-1 underline-offset-4 decoration-stone-300 transition-all leading-tight">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-stone-500 text-sm font-light leading-relaxed line-clamp-3 mb-6 flex-grow">
              {post.excerpt}
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-2 text-sm font-bold text-black bg-stone-50 self-start px-4 py-2 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
              Lire
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
