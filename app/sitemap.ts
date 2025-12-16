import { MetadataRoute } from 'next'
import { getAllServices, getAllBlogPosts } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zennest.fr'
  
  // Static pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  // Service pages
  const services = getAllServices()
  Object.values(services).forEach(categoryServices => {
    categoryServices.forEach(service => {
      routes.push({
        url: `${baseUrl}/services/${service.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  })

  // Blog posts
  const posts = getAllBlogPosts()
  posts.forEach(post => {
    routes.push({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return routes
}
