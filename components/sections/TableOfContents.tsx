'use client'

import React, { useEffect, useState } from 'react'
import { List } from 'lucide-react'
import { createSlug } from '@/lib/text-utils'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Extract h2 and h3 headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const items: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      // Create a slug from the heading text using the centralized function
      const id = createSlug(text)
      
      items.push({ id, text, level })
    }

    setToc(items)

    // Parallax effect: track scroll with latency
    const handleScroll = () => {
      setScrollY(window.scrollY * 0.85) // 85% scroll speed = parallax effect
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    // Observe all headings after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const headings = document.querySelectorAll('h2[id], h3[id]')
      headings.forEach((heading) => observer.observe(heading))
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [content])

  if (toc.length === 0) return null

  return (
    <div 
      className="hidden lg:block sticky top-32"
      style={{ transform: `translateY(-${scrollY * 0.15}px)` }}
    >
      <div className="bg-stone-50 rounded-2xl p-6 max-w-xs">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-5 h-5 text-gray-900" />
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
            Table des Matières
          </h3>
        </div>
        <nav>
          <ul className="space-y-2 text-sm">
            {toc.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
              >
                <a
                  href={`#${item.id}`}
                  className={`block py-1 transition-colors hover:text-black ${
                    activeId === item.id
                      ? 'text-black font-medium border-l-2 border-black pl-3 -ml-3'
                      : 'text-stone-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(item.id)
                    if (element) {
                      const y = element.getBoundingClientRect().top + window.pageYOffset - 120
                      window.scrollTo({ top: y, behavior: 'smooth' })
                    }
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
