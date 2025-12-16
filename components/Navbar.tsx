import React, { useState } from 'react';
import { Menu, X, ArrowRight, MoveRight } from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceCategory, SubService } from '../types';

interface NavbarProps {
  activePage: string;
  isScrolled: boolean;
  onNavigateHome: () => void;
  onNavigateCategory: (cat: ServiceCategory) => void;
  onNavigateService: (cat: ServiceCategory, s: SubService) => void;
  onOpenContact: () => void;
}

export default function Navbar({ activePage, isScrolled, onNavigateHome, onNavigateCategory, onNavigateService, onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<ServiceCategory | null>(null);

  const handleCategoryClick = (cat: ServiceCategory) => {
    setHoveredNav(null);
    setMobileMenuOpen(false);
    onNavigateCategory(cat);
  };

  const handleServiceClick = (cat: ServiceCategory, s: SubService) => {
    setHoveredNav(null);
    setMobileMenuOpen(false);
    onNavigateService(cat, s);
  };

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
          <button onClick={onNavigateHome} className="text-2xl font-bold tracking-tighter z-50 transition-all hover:opacity-70 active:scale-95">
            ZenNest<span className="text-stone-400">.</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 h-full">
            {(Object.keys(SERVICES) as ServiceCategory[]).map((category) => (
              <div key={category} className="relative h-full flex items-center">
                <button 
                  onClick={() => handleCategoryClick(category)}
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
                </button>
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
             <button 
                onClick={onOpenContact}
                className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-stone-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-stone-900/10"
             >
                Nous contacter
             </button>
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
                    Accédez à l'expertise dédiée. Stratégies, services et accompagnement sur-mesure pour ce pôle.
                  </p>
                  <button 
                    onClick={() => handleCategoryClick(hoveredNav)}
                    className="inline-flex items-center text-xs font-semibold text-black border-b border-black pb-0.5 cursor-pointer hover:text-stone-600 hover:border-stone-600 transition-colors group"
                  >
                    Explorer le pôle {hoveredNav} <MoveRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                {/* Links Side */}
                <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-4">
                  {SERVICES[hoveredNav].map((service, idx) => (
                    <button 
                      key={service.id}
                      onClick={() => handleServiceClick(hoveredNav, service)}
                      className="group flex items-start gap-5 p-5 rounded-2xl hover:bg-stone-50 transition-all duration-300 text-left border border-transparent hover:border-stone-100 animate-fade-in"
                      style={{ animationDelay: `${idx * 50 + 100}ms` }}
                    >
                      <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-white group-hover:shadow-sm group-hover:scale-110 transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-900 text-sm mb-1.5 group-hover:translate-x-1 transition-transform">{service.label}</span>
                        <span className="block text-xs text-gray-500 font-light line-clamp-2 leading-relaxed">{service.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* --- MOBILE MENU --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-40 pt-28 px-6 overflow-y-auto md:hidden animate-fade-in">
          <div className="flex flex-col space-y-10 pb-12">
            {(Object.keys(SERVICES) as ServiceCategory[]).map((category, idx) => (
              <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <button 
                    onClick={() => handleCategoryClick(category)}
                    className="text-2xl font-bold text-gray-900 mb-6 tracking-tight text-left w-full hover:text-stone-600 transition-colors"
                >
                    {category}
                </button>
                <div className="space-y-4 pl-4 border-l-2 border-stone-100">
                  {SERVICES[category].map((service) => (
                    <button 
                      key={service.id}
                      onClick={() => handleServiceClick(category, service)}
                      className="block text-left text-gray-600 py-2.5 text-lg font-light hover:text-black transition-colors w-full"
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-8 border-t border-stone-100 animate-fade-in-up delay-400">
                <button 
                    onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg"
                >
                    Nous contacter
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}