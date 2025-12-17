'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ServiceCategory, SubService } from '@/types'
import { getAllBlogPosts } from '@/lib/data'
import ContactForm from './ContactForm'

interface ServicePageContentProps {
  service: SubService
  category: ServiceCategory
}

export default function ServicePageContent({ service, category }: ServicePageContentProps) {
  const allPosts = getAllBlogPosts()
  const relatedPosts = allPosts.filter(post => post.category === category || post.category === 'Location')

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      
      {/* LANDING HERO - SUCCINCT & PREMIUM */}
      <section className="pt-40 pb-16 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500">{category}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6 leading-[0.95]">
                {service.title}
              </h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed mb-10 max-w-md">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#contact"
                  className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 active:scale-95 flex items-center justify-center gap-3"
                >
                  Étudier mon bien <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Minimalist Visual Abstract */}
            <div className="relative animate-fade-in delay-200 hidden lg:block">
              <div className="bg-stone-50 rounded-[2rem] p-10 relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4">L&apos;Exigence ZenNest.</h4>
                  <p className="text-stone-600 font-light italic leading-loose text-lg border-l-2 border-black pl-6">
                    &ldquo;{service.content}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT TO BLOG - "ANSWERS" SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Vos questions.<br/>
                <span className="text-stone-400">Nos réponses d&apos;experts.</span>
              </h2>
              <p className="text-lg text-gray-500 font-light">
                Le marché est complexe. Nous avons rédigé ces guides pour vous donner une clarté immédiate sur la réglementation et les opportunités.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {relatedPosts.map((post, idx) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.id}`}
                className="group text-left flex flex-col h-full animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="border-t border-stone-200 pt-6 mb-4 flex justify-between items-center w-full">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-400">{post.readTime}</span>
                  <span className="text-xs font-bold text-stone-300 group-hover:text-black transition-colors">Lire l&apos;article</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:underline decoration-1 underline-offset-4 decoration-stone-300 transition-all leading-tight">
                  {post.title}
                </h3>
                <p className="text-stone-500 text-sm font-light leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-black bg-stone-50 self-start px-4 py-2 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                  Lire <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-20 p-12 bg-stone-900 rounded-[2.5rem] text-white text-center animate-fade-in-up delay-300">
            <h3 className="text-3xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h3>
            <p className="text-stone-400 mb-8 max-w-xl mx-auto">
              Nos experts sont disponibles pour auditer votre situation spécifique en 15 minutes.
            </p>
            <Link 
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-stone-100 transition-all"
            >
              Demander un audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />
    </div>
  )
}
