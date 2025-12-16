import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection, { ServicesSection, PhilosophySection } from '@/components/sections/HomePageSections'

export default function HomePage() {
  return (
    <>
      <Navbar activePage="home" />
      <main className="flex-grow animate-fade-in">
        <HeroSection />
        <ServicesSection />
        <PhilosophySection />
      </main>
      <Footer />
    </>
  )
}
