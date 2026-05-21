import type { Metadata } from 'next'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { AboutPage } from '@/screens/about'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: { absolute: 'About Us — Our Story, Vision & Leadership · Igbo Community Wales' },
  description:
    'Discover the founders, values and pillars of Igbo Community Wales — preserving heritage, building unity and shaping a thriving Igbo presence in Wales.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'About Us — Our Story, Vision & Leadership',
    description:
      'Discover the founders, values and pillars of Igbo Community Wales — preserving heritage, building unity and shaping a thriving Igbo presence in Wales.',
  },
  twitter: {
    title: 'About Igbo Community Wales',
    description:
      'Discover the founders, values and pillars of Igbo Community Wales — preserving heritage, building unity and shaping a thriving Igbo presence in Wales.',
  },
}

export default async function Page() {
  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: 'gallery',
    depth: 1,
    limit: 10,
    sort: '-createdAt',
  })

  return <AboutPage recentGallery={result.docs} />
}
