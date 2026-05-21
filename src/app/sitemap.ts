import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://igbocommunitywales.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: Array<{
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
  }> = [
    { path: '', changeFrequency: 'monthly', priority: 1.0 },
    { path: 'about', changeFrequency: 'monthly', priority: 0.7 },
    { path: 'events', changeFrequency: 'weekly', priority: 0.9 },
    { path: 'gallery', changeFrequency: 'weekly', priority: 0.8 },
    { path: 'contact', changeFrequency: 'yearly', priority: 0.6 },
  ]

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
