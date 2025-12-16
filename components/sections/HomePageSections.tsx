'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, ShieldCheck, TrendingUp, CheckCircle2, 
  Key, Scale, Briefcase, Building2, Check
} from 'lucide-react'
import { ServiceCategory } from '@/types'

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-stone-50/40 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Copy */}
          <div className="lg:col-span-8 animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 mb-8 leading-[0.95]">
              L&apos;immobilier.<br />
              <span className="text-stone-400">Dans votre camp.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-xl mb-12 delay-100 animate-fade-in-up" style={{ animationFillMode: 'both' }}>
              Le représentant exclusif des propriétaires exigeants. <br/>
              Valorisation, Fiscalité, Gestion. Vos intérêts, rien d&apos;autre.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12 delay-200 animate-fade-in-up" style={{ animationFillMode: 'both' }}>
              <Link 
                href="#contact"
                className="bg-gray-900 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-stone-900/10 flex items-center justify-center gap-3"
              >
                Nous contacter <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/services/trans-vendre"
                className="bg-white text-gray-900 border border-stone-200 px-10 py-5 rounded-full font-semibold text-lg hover:bg-stone-50 transition-colors"
              >
                Notre expertise
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 text-sm font-medium text-gray-900 delay-300 animate-fade-in-up" style={{ animationFillMode: 'both' }}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center">
                  <Check className="w-3 h-3 text-black" strokeWidth={3} />
                </div> 
                Pas de rétrocommissions
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center">
                  <Check className="w-3 h-3 text-black" strokeWidth={3} />
                </div> 
                Expertise 360°
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center">
                  <Check className="w-3 h-3 text-black" strokeWidth={3} />
                </div> 
                Transparence totale
              </div>
            </div>
          </div>

          {/* Right: Abstract Visual */}
          <div className="hidden lg:block lg:col-span-4 relative h-full min-h-[500px] animate-fade-in delay-500">
            <div className="absolute top-10 right-0 w-80 h-96 bg-stone-200 rounded-[3rem] -rotate-6 z-10 overflow-hidden hover:rotate-0 transition-all duration-700 ease-out">
              <Image 
                src="https://picsum.photos/600/800?grayscale" 
                alt="Interior" 
                width={600}
                height={800}
                className="w-full h-full object-cover opacity-80 mix-blend-multiply hover:scale-110 transition-transform duration-700" 
              />
            </div>
            <div className="absolute top-20 right-20 w-80 h-96 bg-stone-900 rounded-[3rem] -z-10"></div>
            
            {/* Float Card */}
            <div className="absolute bottom-20 -left-10 bg-white p-6 rounded-3xl shadow-xl z-20 max-w-xs border border-stone-100 animate-fade-in-up delay-700" style={{ animationFillMode: 'both' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Performance</p>
                  <p className="font-bold text-gray-900">+12% Rentabilité</p>
                </div>
              </div>
              <p className="text-xs text-stone-500 font-light">Moyenne constatée après optimisation LMNP sur nos 50 derniers dossiers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesSection() {
  const categories = [
    {
      id: 'loc-saisonnier',
      category: 'Location' as ServiceCategory,
      icon: Key,
      title: 'Gestion &\nRevenus',
      description: 'Transformez votre bien en actif passif. Conciergerie de luxe ou longue durée sécurisée.',
      features: ['Bail Mobilité', 'Saisonnière', 'Garantie Impayés']
    },
    {
      id: 'fisc-lmnp',
      category: 'Fiscalité' as ServiceCategory,
      icon: Scale,
      title: 'Fiscalité &\nPatrimoine',
      description: 'Ne laissez pas l\'impôt grignoter votre rendement. Structures optimisées et stratégies LMNP.',
      features: ['LMNP Réel', 'Holding / SCI', 'Succession']
    },
    {
      id: 'trans-vendre',
      category: 'Transaction' as ServiceCategory,
      icon: Briefcase,
      title: 'Vente &\nAcquisition',
      description: 'Accédez au marché caché. Vendez au prix fort ou achetez les perles rares avant diffusion.',
      features: ['Estimation Précise', 'Off-Market', 'Chasse Immo']
    },
    {
      id: 'gest-travaux',
      category: 'Gestion' as ServiceCategory,
      icon: Building2,
      title: 'Travaux &\nValorisation',
      description: 'Rénover pour mieux louer ou mieux vendre. Pilotage intégral de vos chantiers.',
      features: ['Rénovation DPE', 'Architecture d\'intérieur', 'Suivi Chantier']
    }
  ]

  return (
    <section className="py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:text-center max-w-2xl md:mx-auto animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Quelle est votre priorité ?</h2>
          <p className="text-gray-500 font-light text-lg">Choisissez votre pôle d&apos;intérêt pour accéder à nos experts dédiés et nos stratégies exclusives.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <Link 
                key={cat.id}
                href={`/services/${cat.id}`}
                className="group cursor-pointer relative bg-stone-50 rounded-[2.5rem] p-8 hover:bg-stone-900 hover:text-white transition-all duration-500 border border-stone-100 flex flex-col justify-between min-h-[400px] hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up" 
                style={{ animationDelay: `${100 + idx * 100}ms`, animationFillMode: 'both' }}
              >
                <div>
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 text-black shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 whitespace-pre-line">{cat.title}</h3>
                  <p className="text-sm font-light leading-relaxed opacity-70 mb-8">
                    {cat.description}
                  </p>
                  <ul className="space-y-3 text-xs font-medium uppercase tracking-wide opacity-50 group-hover:opacity-80">
                    {cat.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-current"></div> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-8 border-t border-stone-200/20 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest">Explorer</span>
                  <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function PhilosophySection() {
  const values = [
    { 
      icon: <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />, 
      title: "Alignement Total", 
      desc: "Nous ne sommes pas un intermédiaire. Nous sommes votre bras droit. Si une action ne vous profite pas, nous ne la proposons pas." 
    },
    { 
      icon: <TrendingUp className="w-7 h-7" strokeWidth={1.5} />, 
      title: "Expertise Agrégée", 
      desc: "Fiscalité, travaux, juridique. Nous activons les meilleurs experts externes uniquement quand c'est nécessaire." 
    },
    { 
      icon: <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />, 
      title: "Zéro Friction", 
      desc: "Une seule interface, un seul interlocuteur dédié. Nous absorbons la complexité administrative pour vous rendre votre temps." 
    }
  ]

  return (
    <section className="py-32 bg-stone-50/50 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Transparence radicale.</h2>
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-3xl leading-relaxed">
            Le marché est opaque. Nous sommes la lumière. Pas de frais cachés, pas de rétrocommissions. 
            Une seule boussole : votre rentabilité.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          {values.map((item, idx) => (
            <div key={idx} className="group animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] border border-stone-50 text-stone-600 group-hover:scale-110 transition-transform duration-500 ease-out group-hover:border-stone-200">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 tracking-tight">{item.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed text-[15px] max-w-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
