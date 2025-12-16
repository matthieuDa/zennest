import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServiceLandingPage from './pages/ServiceLandingPage';
import CategoryLandingPage from './pages/CategoryLandingPage';
import BlogPostPage from './pages/BlogPostPage';
import FunnelModal from './components/FunnelModal';
import { SubService, ServiceCategory, PageState } from './types';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<PageState>('home');
  const [currentService, setCurrentService] = useState<SubService | null>(null);
  const [currentCategory, setCurrentCategory] = useState<ServiceCategory>('Location');
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  
  // UI State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFunnelOpen, setIsFunnelOpen] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Handlers
  const navigateToHome = () => {
    window.scrollTo(0, 0);
    setActivePage('home');
  };

  const navigateToCategory = (category: ServiceCategory) => {
    window.scrollTo(0, 0);
    setCurrentCategory(category);
    setActivePage('category-landing');
  };

  const navigateToService = (category: ServiceCategory, service: SubService) => {
    window.scrollTo(0, 0);
    setCurrentCategory(category);
    setCurrentService(service);
    setActivePage('landing');
  };

  const navigateToBlog = (postId: string) => {
    window.scrollTo(0, 0);
    setCurrentPostId(postId);
    setActivePage('blog-post');
  };

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-stone-200 selection:text-black antialiased min-h-screen flex flex-col">
      
      <Navbar 
        activePage={activePage}
        isScrolled={isScrolled}
        onNavigateHome={navigateToHome}
        onNavigateCategory={navigateToCategory}
        onNavigateService={navigateToService}
        onOpenContact={() => setIsFunnelOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activePage === 'home' && (
            <HomePage 
                onNavigate={navigateToService}
                onNavigateCategory={navigateToCategory}
                onOpenFunnel={() => setIsFunnelOpen(true)}
            />
        )}

        {activePage === 'category-landing' && (
            <CategoryLandingPage 
                category={currentCategory}
                onNavigateService={navigateToService}
                onReadArticle={navigateToBlog}
                onOpenContact={() => setIsFunnelOpen(true)}
            />
        )}
        
        {activePage === 'landing' && currentService && (
          <ServiceLandingPage 
            service={currentService} 
            category={currentCategory} 
            onReadArticle={navigateToBlog}
            onOpenFunnel={() => setIsFunnelOpen(true)}
          />
        )}
        
        {activePage === 'blog-post' && (
            <BlogPostPage 
                postId={currentPostId} 
                onBack={navigateToHome}
                onOpenContact={() => setIsFunnelOpen(true)}
            />
        )}
      </main>

      <Footer onHome={navigateToHome} />

      {/* The Conversion Funnel Overlay */}
      <FunnelModal 
        isOpen={isFunnelOpen} 
        onClose={() => setIsFunnelOpen(false)} 
      />

    </div>
  );
}