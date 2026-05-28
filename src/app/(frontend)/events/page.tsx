import type { Metadata } from 'next'
import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Event, Media } from '@/payload-types'
import { EventsPage } from '@/screens/events'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const getUpcomingEvents = cache(async (): Promise<Event[]> => {
  const payload = await getPayload({ config: await config })

  const cutoff = new Date()
  cutoff.setHours(0, 0, 0, 0)
  const cutoffIso = cutoff.toISOString()

  const result = await payload.find({
    collection: 'events',
    where: {
      or: [
        { endDate: { greater_than_equal: cutoffIso } },
        { startDate: { greater_than_equal: cutoffIso } },
      ],
    },
    sort: '-startDate',
    depth: 1,
    pagination: false,
  })

  return result.docs
})

export async function generateMetadata(): Promise<Metadata> {
  const events = await getUpcomingEvents()
  const featured = events.find((e) => e.isFeatured) ?? events[0]
  const featuredImage =
    featured && typeof featured.featureImage === 'object'
      ? (featured.featureImage as Media).url
      : null

  const title = 'Events — Festivals, Workshops & Gatherings in Cardiff'
  const description =
    'Upcoming Igbo Community Wales events in Cardiff — cultural festivals, heritage workshops, networking mixers and family gatherings. RSVP today.'
  const images = featuredImage
    ? [{ url: featuredImage, alt: featured?.title ?? 'Igbo Community Wales event' }]
    : [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Igbo Community Wales' }]

  return {
    title: { absolute: `${title} · Igbo Community Wales` },
    description,
    alternates: { canonical: '/events' },
    openGraph: { url: '/events', title, description, images },
    twitter: { title, description, images: images.map((i) => i.url) },
  }
}

export default async function Page() {
  const events = await getUpcomingEvents()
  return <EventsPage events={events} />
}
