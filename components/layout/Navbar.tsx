'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { ServiceCategory, SubService } from '@/types'

interface NavbarProps {
  activePage?: string
}

export default function Navbar({ activePage = 'home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<ServiceCategory | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-b ${
          isScrolled || activePage !== 'home'
            ? 'bg-white/80 backdrop-blur-xl border-stone-200/50 py-4 shadow-sm' 
            : 'bg-white/0 backdrop-blur-none border-transparent py-6'
        }`}
        onMouseLeave={() => setHoveredNav(null)}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
          <Link href="/" className="text-2xl font-bold tracking-tighter z-50 transition-all hover:opacity-70 active:scale-95">
            ZenNest<span className="text-stone-400">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 h-full">
            {(Object.keys(SERVICES) as ServiceCategory[]).map((category) => (
              <div key={category} className="relative h-full flex items-center">
                <Link 
                  href={`/services/${category.toLowerCase()}`}
                  onMouseEnter={() => setHoveredNav(category)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 py-4 relative group ${
                    hoveredNav === category 
                      ? 'text-black' 
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {category} 
                  {/* Underline Animation */}
                  <span className={`absolute bottom-3 left-0 w-full h-0.5 bg-black transform origin-left transition-transform duration-300 ${hoveredNav === category ? 'scale-x-100' : 'scale-x-0'}`}></span>
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
             <Link 
                href="#contact"
                className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-stone-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-stone-900/10"
             >
                Nous contacter
             </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 p-2 text-gray-900 active:scale-95 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mega Menu Dropdown */}
        {hoveredNav && (
          <div 
            className="hidden md:block absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-stone-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] animate-fade-in-up"
            onMouseEnter={() => setHoveredNav(hoveredNav)}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-12 gap-12">
                {/* Intro Side */}
                <div className="col-span-4 pr-12 border-r border-stone-100 animate-fade-in delay-100">
                  <span className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-3 block">Pôle {hoveredNav}</span>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 tracking-tight">{hoveredNav}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">
                    Accédez à l&apos;expertise dédiée. Stratégies, services et accompagnement sur-mesure pour ce pôle.
                  </p>
                  <Link 
                    href={`/services/${hoveredNav.toLowerCase()}`}
                    className="text-xs font-bold uppercase tracking-wide text-black hover:underline underline-offset-4"
                  >
                    Voir la page complète →
                  </Link>
                </div>

                {/* Services Grid */}
                <div className="col-span-8 grid grid-cols-2 gap-6">
                  {SERVICES[hoveredNav].map((service: SubService, idx: number) => (
                    <Link 
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="group p-6 rounded-2xl bg-stone-50/50 hover:bg-stone-100 transition-all hover:shadow-md animate-fade-in-up"
                      style={{ animationDelay: `${100 + idx * 50}ms`, animationFillMode: 'both' }}
                    >
                      <h4 className="text-base font-bold mb-2 text-gray-900 group-hover:underline underline-offset-4">{service.label}</h4>
                      <p className="text-xs font-light text-gray-500 leading-relaxed">{service.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white animate-fade-in">
          <div className="pt-24 px-6 pb-8 overflow-y-auto h-full">
            <nav className="space-y-6">
              {(Object.keys(SERVICES) as ServiceCategory[]).map((category) => (
                <div key={category} className="border-b border-stone-200 pb-6">
                  <Link 
                    href={`/services/${category.toLowerCase()}`}
                    className="text-2xl font-bold mb-4 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                  <div className="space-y-3 ml-4">
                    {SERVICES[category].map((service: SubService) => (
                      <Link 
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="block text-gray-600 hover:text-black transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <Link 
              href="#contact"
              className="mt-8 block w-full bg-black text-white px-6 py-4 rounded-full text-center font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nous contacter
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
