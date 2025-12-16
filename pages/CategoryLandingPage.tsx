import React from 'react';
import { ArrowRight, MoveRight, BookOpen } from 'lucide-react';
import { SERVICES, BLOG_POSTS } from '../data';
import { ServiceCategory, SubService } from '../types';

interface CategoryLandingPageProps {
  category: ServiceCategory;
  onNavigateService: (cat: ServiceCategory, s: SubService) => void;
  onReadArticle: (id: string) => void;
  onOpenContact: () => void;
}

export default function CategoryLandingPage({ category, onNavigateService, onReadArticle, onOpenContact }: CategoryLandingPageProps) {
  const services = SERVICES[category];
  const relatedPosts = BLOG_POSTS.filter(post => post.category === category);

  const getCategoryTagline = (cat: ServiceCategory) => {
    switch (cat) {
      case 'Location': return "Rentabilité maximisée, contraintes éliminées.";
      case 'Transaction': return "L'art de vendre au prix parfait.";
      case 'Fiscalité': return "Transformez l'impôt en patrimoine.";
      case 'Gestion': return "Valorisation continue de votre actif.";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      
      {/* Category Hero */}
      <section className="pt-48 pb-24 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-fade-in-up">
            <span className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-4 block">Pôle d'expertise</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-gray-900 mb-8 leading-[0.9]">
              {category}.
            </h1>
            <p className="text-2xl md:text-3xl text-gray-500 font-light leading-relaxed max-w-2xl mb-12">
              {getCategoryTagline(category)}
            </p>
            <button 
              onClick={onOpenContact}
              className="bg-black text-white px-10 py-4 rounded-full font-semibold hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 hover:scale-105 active:scale-95"
            >
              Parler à un expert {category}
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid (The Funnel) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 border-b border-stone-100 pb-8 animate-fade-in delay-200" style={{ animationFillMode: 'both' }}>
             <h2 className="text-3xl font-bold tracking-tight">Nos solutions dédiées</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <button 
                key={service.id}
                onClick={() => onNavigateService(category, service)}
                className="group flex flex-col text-left p-8 rounded-[2.5rem] border border-stone-200 hover:border-black hover:bg-stone-50 transition-all duration-300 h-full animate-fade-in-up"
                style={{ animationDelay: `${idx * 100 + 300}ms`, animationFillMode: 'both' }}
              >
                <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mb-8 text-black group-hover:scale-110 transition-transform duration-300">
                   <ArrowRight className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.label}</h3>
                <p className="text-stone-500 font-light leading-relaxed mb-8 flex-grow">
                   {service.title}
                </p>
                <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                   Découvrir <MoveRight className="w-4 h-4" />
                </span>
              </button>
            ))}
            
            {/* Custom Card for Qualification */}
            <div className="p-8 rounded-[2.5rem] bg-stone-900 text-white flex flex-col justify-center items-start text-left h-full animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                <h3 className="text-2xl font-bold mb-4">Un besoin spécifique ?</h3>
                <p className="text-stone-400 font-light mb-8">
                    Certains projets ne rentrent pas dans des cases. Construisons votre stratégie sur-mesure.
                </p>
                <button onClick={onOpenContact} className="text-white border-b border-white pb-1 font-semibold hover:opacity-80 transition-opacity">
                    Contactez-nous
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content (Siloing) */}
      <section className="py-24 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex items-center gap-4 mb-12 animate-fade-in">
               <BookOpen className="w-6 h-6 text-stone-400" />
               <h2 className="text-2xl font-bold tracking-tight text-gray-900">Le Journal {category}</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {relatedPosts.map((post, idx) => (
               <button 
                key={post.id} 
                onClick={() => onReadArticle(post.id)}
                className="block text-left group animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
               >
                  <div className="aspect-video bg-white rounded-3xl border border-stone-100 mb-6 p-6 flex flex-col justify-between group-hover:shadow-lg transition-all duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{post.readTime}</span>
                      <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center self-end group-hover:bg-black group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                      </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-stone-600 transition-colors">{post.title}</h3>
                  <p className="text-stone-500 font-light text-sm line-clamp-2">{post.excerpt}</p>
               </button>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}