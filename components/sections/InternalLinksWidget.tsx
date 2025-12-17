'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { InternalLink } from '@/types'

interface InternalLinksWidgetProps {
  links: InternalLink[]
}

export default function InternalLinksWidget({ links }: InternalLinksWidgetProps) {
  if (!links || links.length === 0) return null

  const relatedLinks = links.filter(link => link.context === 'related')
  const suggestedLinks = links.filter(link => link.context === 'suggested')

  return (
    <div className="my-16">
      {relatedLinks.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Articles connexes</h3>
          <div className="space-y-3">
            {relatedLinks.map((link, index) => (
              <Link 
                key={index}
                href={`/blog/${link.slug}`}
                className="block bg-stone-50 hover:bg-stone-100 transition-colors rounded-xl p-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 group-hover:text-black">{link.title}</span>
                  <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-black transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {suggestedLinks.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-900">Pour Aller Plus Loin</h3>
          <div className="space-y-3">
            {suggestedLinks.map((link, index) => (
              <Link 
                key={index}
                href={`/blog/${link.slug}`}
                className="block bg-white hover:bg-stone-50 transition-colors rounded-xl p-4 border border-stone-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 group-hover:text-black">{link.title}</span>
                  <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-black transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
