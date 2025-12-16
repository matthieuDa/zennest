import { BlogPost, SubService, ServiceCategory } from '@/types'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ZenNest',
    url: 'https://zennest.fr',
    logo: 'https://zennest.fr/logo.png',
    description: 'Le représentant exclusif des propriétaires exigeants. Valorisation, Fiscalité, Gestion.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'bonjour@zennest.com',
      contactType: 'customer service',
      availableLanguage: ['French'],
    },
  }
}

export function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: 'ZenNest',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ZenNest',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zennest.fr/logo.png',
      },
    },
    datePublished: post.date,
    dateModified: post.date,
  }
}

export function generateServiceSchema(service: SubService, category: ServiceCategory) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.label,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'ZenNest',
    },
    serviceType: category,
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
