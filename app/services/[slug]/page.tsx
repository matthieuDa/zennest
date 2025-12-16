import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getServiceBySlug, getCategoryForService, getAllServices } from '@/lib/data'
import ServicePageContent from '@/components/sections/ServicePageContent'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const services = getAllServices()
  const slugs: string[] = []
  
  Object.values(services).forEach(categoryServices => {
    categoryServices.forEach(service => {
      slugs.push(service.id)
    })
  })
  
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  
  if (!service) {
    return {
      title: 'Service non trouvé',
    }
  }

  return {
    title: `${service.label} - ${service.title}`,
    description: service.description,
    openGraph: {
      title: `${service.label} - ZenNest`,
      description: service.description,
    },
  }
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  const category = getCategoryForService(params.slug)
  
  if (!service || !category) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <ServicePageContent service={service} category={category} />
      </main>
      <Footer />
    </>
  )
}
