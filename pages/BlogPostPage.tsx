import React from 'react';
import { BLOG_POSTS } from '../data';
import { ArrowLeft, Clock, Calendar, Check, MessageSquare } from 'lucide-react';

interface BlogPostPageProps {
  postId: string | null;
  onBack?: () => void;
  onOpenContact?: () => void;
}

export default function BlogPostPage({ postId, onBack, onOpenContact }: BlogPostPageProps) {
  const post = BLOG_POSTS.find(p => p.id === postId);

  if (!post) return <div className="pt-48 text-center">Article introuvable.</div>;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 animate-fade-in">
      
      {/* Progress bar placeholder (visual only) */}
      <div className="fixed top-0 left-0 h-1 bg-stone-100 w-full z-40">
          <div className="h-full bg-black w-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        
        {/* Main Content */}
        <div className="lg:col-span-8 lg:col-start-2">
            
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
            <article 
                className="prose prose-lg md:prose-xl prose-stone prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:font-light prose-p:leading-loose prose-strong:text-black prose-strong:font-semibold max-w-none animate-fade-in-up delay-100"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {/* Bottom CTA (Mobile/Desktop) */}
            <div className="mt-20 p-8 bg-stone-50 rounded-3xl border border-stone-100 text-center md:text-left flex flex-col md:flex-row items-center gap-8 justify-between">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Besoin d'une analyse personnalisée ?</h3>
                    <p className="text-stone-500">Nos experts immobiliers étudient votre dossier gratuitement.</p>
                </div>
                <button className="bg-black text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex-shrink-0 whitespace-nowrap">
                    Réserver un audit
                </button>
            </div>
        </div>

        {/* Sticky Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-32 space-y-6 animate-fade-in delay-500">
                <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-xl">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Une question ?</h4>
                    <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                        Cet article soulève des points importants pour votre patrimoine. Discutons-en.
                    </p>
                    <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm hover:bg-stone-200 transition-colors">
                        Nous contacter
                    </button>
                </div>

                <div className="p-6 border border-stone-100 rounded-2xl bg-white">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-stone-400 mb-4">Services liés</h4>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm font-medium hover:text-stone-600 cursor-pointer transition-colors">
                            <Check className="w-4 h-4 text-emerald-500" /> Gestion Locative
                        </li>
                        <li className="flex items-center gap-2 text-sm font-medium hover:text-stone-600 cursor-pointer transition-colors">
                            <Check className="w-4 h-4 text-emerald-500" /> Optimisation Fiscale
                        </li>
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}