'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, Calendar, MessageSquare } from 'lucide-react'
import { BlogPost } from '@/types'
import ReactMarkdown from 'react-markdown'
import FAQAccordion from './FAQAccordion'
import InternalLinksWidget from './InternalLinksWidget'
import Breadcrumb from './Breadcrumb'
import TableOfContents from './TableOfContents'
import ScrollDepthTracker from '../analytics/ScrollDepthTracker'
import RelatedPosts from './RelatedPosts'

interface BlogPostContentProps {
  post: BlogPost
  relatedPosts?: BlogPost[]
}

// Helper function to create slug from heading text
const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

// Custom components for markdown rendering with IDs for headings
const MarkdownComponents = {
  h2: ({ node, children, ...props }: any) => {
    const text = typeof children === 'string' ? children : children?.[0] || ''
    const id = createSlug(text)
    return <h2 id={id} className="text-3xl font-bold mb-6 mt-8 text-gray-900" {...props}>{children}</h2>
  },
  h3: ({ node, children, ...props }: any) => {
    const text = typeof children === 'string' ? children : children?.[0] || ''
    const id = createSlug(text)
    return <h3 id={id} className="text-2xl font-bold mb-4 mt-6 text-gray-900" {...props}>{children}</h3>
  },
  h4: ({ node, ...props }: any) => <h4 className="text-lg font-bold mb-3 text-gray-900" {...props} />,
  p: ({ node, ...props }: any) => <p className="text-gray-600 font-light leading-loose mb-6" {...props} />,
  ul: ({ node, ...props }: any) => <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700" {...props} />,
  ol: ({ node, ...props }: any) => <ol className="list-decimal pl-5 space-y-2 mb-6 text-gray-700" {...props} />,
  li: ({ node, ...props }: any) => <li className="mb-2" {...props} />,
  strong: ({ node, ...props }: any) => <strong className="font-semibold text-black" {...props} />,
  blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-black pl-6 py-2 my-6 bg-stone-50 italic text-gray-700" {...props} />,
  table: ({ node, ...props }: any) => <div className="overflow-x-auto my-8"><table className="min-w-full border-collapse border border-stone-200" {...props} /></div>,
  thead: ({ node, ...props }: any) => <thead className="bg-stone-100" {...props} />,
  tbody: ({ node, ...props }: any) => <tbody {...props} />,
  tr: ({ node, ...props }: any) => <tr className="border-b border-stone-200" {...props} />,
  th: ({ node, ...props }: any) => <th className="px-4 py-3 text-left font-bold text-gray-900 border border-stone-200" {...props} />,
  td: ({ node, ...props }: any) => <td className="px-4 py-3 text-gray-600 border border-stone-200" {...props} />,
  div: ({ node, ...props }: any) => <div {...props} />,
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 animate-fade-in">
      {/* Scroll Depth Tracker */}
      <ScrollDepthTracker articleTitle={post.title} />
      
      {/* Progress bar placeholder (visual only) */}
      <div className="fixed top-0 left-0 h-1 bg-stone-100 w-full z-40">
        <div className="h-full bg-black w-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        
        {/* Main Content */}
        <div className="lg:col-span-8 lg:col-start-2">
          
          {/* Breadcrumb */}
          <div className="animate-fade-in mb-4">
            <Breadcrumb category={post.category} title={post.title} />
          </div>

          {/* Header */}
          <div className="mb-12 animate-fade-in-up">
            <div className="flex items-center gap-4 text-stone-500 text-sm mb-6 font-medium">
              <span className="uppercase tracking-widest text-black border-b border-black pb-0.5">{post.category}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter leading-[1.05] mb-8">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-stone-500 font-light leading-relaxed border-l-4 border-black pl-6 italic">
              {post.excerpt}
            </p>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-stone-100 mb-12"></div>

          {/* Content Body */}
          <article className="max-w-none animate-fade-in-up delay-100">
            <ReactMarkdown components={MarkdownComponents}>
              {post.content || ''}
            </ReactMarkdown>
          </article>

          {/* Internal Links Widget */}
          {post.internalLinks && post.internalLinks.length > 0 && (
            <InternalLinksWidget links={post.internalLinks} />
          )}

          {/* FAQ Section */}
          {post.faqItems && post.faqItems.length > 0 && (
            <FAQAccordion items={post.faqItems} />
          )}

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}

          {/* Bottom CTA (Mobile/Desktop) */}
          <div className="mt-20 p-8 bg-stone-50 rounded-3xl border border-stone-100 text-center md:text-left flex flex-col md:flex-row items-center gap-8 justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Besoin d&apos;une analyse personnalisée ?</h3>
              <p className="text-stone-500">Nos experts immobiliers étudient votre dossier gratuitement.</p>
            </div>
            <Link 
              href="#contact"
              className="bg-black text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex-shrink-0 whitespace-nowrap"
            >
              Réserver un audit
            </Link>
          </div>
        </div>

        {/* Sticky Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-3 relative">
          <div className="space-y-6 animate-fade-in delay-500">
            {/* Table of Contents */}
            {post.content && <TableOfContents content={post.content} />}
            
            <div className="sticky top-32 space-y-6">
              <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-xl">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">Une question ?</h4>
              <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                Cet article soulève des points importants pour votre patrimoine. Discutons-en.
              </p>
              <Link 
                href="#contact"
                className="w-full block bg-white text-black py-3 rounded-xl font-bold text-sm hover:bg-stone-200 transition-colors text-center"
              >
                Nous contacter
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-100">
              <h5 className="font-bold mb-4 text-sm uppercase tracking-widest text-stone-400">Partager</h5>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors flex items-center justify-center text-stone-600">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
