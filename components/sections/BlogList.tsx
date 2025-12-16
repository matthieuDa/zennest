'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { Clock, Calendar } from 'lucide-react'

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(posts.map(post => post.category))
    return ['all', ...Array.from(cats)]
  }, [posts])

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return posts
    return posts.filter(post => post.category === selectedCategory)
  }, [posts, selectedCategory])

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {category === 'all' ? 'Tous les articles' : category}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-8 text-sm text-stone-500">
        {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
        {selectedCategory !== 'all' && ` dans ${selectedCategory}`}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group"
          >
            <article className="h-full bg-white border border-stone-200 rounded-2xl p-6 hover:border-black transition-colors">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black line-clamp-2">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-stone-600 font-light text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-stone-500 text-lg">
            Aucun article trouvé dans cette catégorie.
          </p>
        </div>
      )}
    </div>
  )
}
