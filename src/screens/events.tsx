import Image from 'next/image'
import Link from 'next/link'

import { MaterialIcon } from '@/components/material-icon'
import type { Category, Event, Media } from '@/payload-types'

type EventsPageProps = {
  events: Event[]
}

const SIDEBAR_CAP = 3
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://igbocommunitywales.org'

const artifactImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBty-_6hey85S92RPZM21EuzJ-GzIyBrPgy60bsyLjrqjsZyILCwpl8VZ3MxSH17iPqBTG1KxZVXxnSq8Bne9KcwYbw_D3DqvaB-NCO_T_OsClD0vs8WWfEOLuqU-oPA9BLZIRQeqVueYUcQDmGfEEp3YHCDl8xta5SPSJ0qCVkP0fG_k_4Y7deFvntuNAbk7-MaWS-I5FRntio3D3PCujRG4iUbqbHU4OVzfwTjqBUFV-2quwh7iJLE9BrLz-DKs6HQS7X0dkCvQ'
const gatheringImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDGWKuHOhZ0Zm30bcsPqALqK6lnE00UNev_oB4esjsnY3rz3fl27arwgT2uQrjiXF3HxQFjVt2P5fIJ0yHRFtOvDzXmivwQp68W_UHTA3foorTgVKOosct1BJSuXSq_vghHo2iXP9oRlnXCHo__yVdH9V27dXEVHX0s36g-Nr2lpjQGuFno0Fd9GtW3G7SjkYIbvT4rajV2l-iXJkJQzxtICwmOjCC5U3y1eyl7Xee1G2xZebj-6V5IwFgl3lY1dDqElTTGB-J9UA'

export function EventsPage({ events }: EventsPageProps) {
  const hero = events.find((e) => e.isFeatured) ?? events[0] ?? null
  const sidebar = events.filter((e) => e.id !== hero?.id).slice(0, SIDEBAR_CAP)

  const heroCategoryName =
    hero && typeof hero.category === 'object' ? (hero.category as Category).name : null
  const showFeaturedBadge = Boolean(hero?.isFeatured && heroCategoryName)
  const heroImage =
    hero && typeof hero.featureImage === 'object' ? (hero.featureImage as Media) : null

  return (
    <div className="uli-pattern mx-auto max-w-container-max px-margin-desktop py-12 md:py-20">
      {events.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(events.map((e) => eventToJsonLd(e))),
          }}
        />
      ) : null}
      <div className="mb-12 md:mb-16">
        <h1 className="mb-4 font-display-lg text-display-lg text-primary">Events Dashboard</h1>
        <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Experience the vibrancy of Igbo culture in the heart of Wales. Join us for festivals,
          workshops, and community gatherings.
        </p>
      </div>

      {hero ? (
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          <HeroCard
            event={hero}
            image={heroImage}
            categoryName={heroCategoryName}
            showFeaturedBadge={showFeaturedBadge}
          />
          <Sidebar events={sidebar} />
        </div>
      ) : (
        <EmptyState />
      )}

      <section className="relative mt-20 overflow-hidden border-4 border-primary bg-surface-container-lowest p-12">
        <div className="absolute right-0 top-0 p-4 opacity-10">
          <MaterialIcon name="festival" className="h-[120px] w-[120px]" />
        </div>
        <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 font-headline-lg text-headline-lg text-primary">
              Preserving Heritage, Building Future
            </h2>
            <p className="mb-8 font-body-md text-body-md leading-relaxed text-on-surface-variant">
              Every event is an opportunity to strengthen the ties within our community and share
              our rich Igbo heritage with the wider Welsh landscape.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-label-md text-label-md text-on-primary transition-all hover:bg-primary-container"
              >
                <MaterialIcon name="calendar_add_on" className="h-5 w-5" />
                Sync to My Calendar
              </Link>
              <Link
                href="/gallery"
                className="rounded-lg border border-tertiary px-8 py-4 font-label-md text-label-md text-tertiary transition-all hover:bg-tertiary hover:text-on-tertiary"
              >
                Past Event Gallery
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 w-full overflow-hidden rounded-sm border border-outline-variant/30">
              <Image
                src={artifactImage}
                alt="Cultural artifacts"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 h-48 w-full overflow-hidden rounded-sm border border-outline-variant/30">
              <Image
                src={gatheringImage}
                alt="Community gathering"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function HeroCard({
  event,
  image,
  categoryName,
  showFeaturedBadge,
}: {
  event: Event
  image: Media | null
  categoryName: string | null
  showFeaturedBadge: boolean
}) {
  const rsvpLabel = event.registerCta ?? 'RSVP Now'
  const rsvpHref = event.linkToRegister ?? '/contact'
  const isExternal = rsvpHref.startsWith('http')

  return (
    <section className="group overflow-hidden border border-outline-variant/40 bg-surface-container-lowest md:col-span-12 lg:col-span-8">
      <div className="relative h-[400px] w-full overflow-hidden">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt ?? event.title}
            fill
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-surface-container" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-on-primary">
          {showFeaturedBadge ? (
            <span className="mb-3 inline-flex rounded-sm bg-secondary-container px-3 py-1 font-label-md text-label-md text-on-secondary-container">
              Featured {categoryName}
            </span>
          ) : null}
          <h2 className="mb-2 font-headline-lg text-headline-lg">{event.title}</h2>
          <div className="flex flex-wrap gap-6 font-label-md text-label-md">
            <span className="flex items-center gap-2">
              <MaterialIcon name="calendar_month" className="h-5 w-5" />
              {formatDateRange(event.startDate, event.endDate)}
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon name="schedule" className="h-5 w-5" />
              {formatTimeRange(event.startTime, event.endTime)}
            </span>
            {event.location ? (
              <span className="flex items-center gap-2">
                <MaterialIcon name="location_on" className="h-5 w-5" />
                {event.location}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 border-t-4 border-primary bg-surface-container-low p-8 md:flex-row">
        <p className="flex-1 font-body-md text-body-md text-on-surface-variant">
          {event.description}
        </p>
        <div className="flex shrink-0 gap-4">
          <Link
            href="/contact"
            className="rounded-lg border border-secondary px-6 py-3 font-label-md text-label-md text-secondary transition-all hover:bg-secondary hover:text-on-secondary"
          >
            Learn More
          </Link>
          <Link
            href={rsvpHref}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="rounded-lg bg-primary px-8 py-3 font-label-md text-label-md text-on-primary transition-all hover:bg-primary-container hover:shadow-lg"
          >
            {rsvpLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}

function Sidebar({ events }: { events: Event[] }) {
  return (
    <aside className="space-y-gutter md:col-span-12 lg:col-span-4">
      <div className="border border-tertiary/10 bg-surface-container-highest/50 p-6">
        <h3 className="mb-6 flex items-center gap-2 font-headline-md text-headline-md text-tertiary">
          <MaterialIcon name="event_note" className="h-6 w-6 text-primary" />
          Upcoming Gatherings
        </h3>
        {events.length === 0 ? (
          <p className="font-body-md text-body-md text-on-surface-variant">
            No other upcoming events.
          </p>
        ) : (
          <div className="space-y-6">
            {events.map((event, i) => (
              <SidebarItem
                key={event.id}
                event={event}
                tone={i % 2 === 0 ? 'primary' : 'secondary'}
              />
            ))}
          </div>
        )}
        <div className="mt-8 border-t border-outline-variant/30 pt-6">
          <div className="flex items-start gap-4 rounded-lg bg-tertiary-container/10 p-4">
            <MaterialIcon name="volunteer_activism" className="mt-1 h-6 w-6 text-tertiary" />
            <div>
              <p className="mb-1 text-sm font-label-md text-tertiary">Want to volunteer?</p>
              <p className="mb-2 text-xs text-on-surface-variant">
                Join our committee and help shape these cultural milestones.
              </p>
              <Link
                className="text-xs font-bold uppercase tracking-wider text-tertiary"
                href="/contact"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function SidebarItem({ event, tone }: { event: Event; tone: 'primary' | 'secondary' }) {
  const { day, month } = dayChip(event.startDate)
  const label = event.registerCta ?? 'Register'
  const href = event.linkToRegister ?? '/contact'
  const isExternal = href.startsWith('http')

  return (
    <div className="group">
      <div className="flex gap-4 rounded-lg border border-outline-variant/30 bg-surface p-4 shadow-sm transition-all hover:border-primary">
        <div
          className={
            tone === 'secondary'
              ? 'flex min-w-[64px] flex-col items-center justify-center rounded-lg border border-secondary/10 bg-secondary/5 p-3 text-secondary'
              : 'flex min-w-[64px] flex-col items-center justify-center rounded-lg border border-primary/10 bg-primary/5 p-3 text-primary'
          }
        >
          <span className="text-xl font-bold">{day}</span>
          <span className="font-label-md text-xs">{month}</span>
        </div>
        <div className="flex-1">
          <h4 className="mb-1 font-label-md text-label-md text-on-surface transition-colors group-hover:text-primary">
            {event.title}
          </h4>
          {event.location ? (
            <p className="flex items-center gap-1 text-xs text-on-surface-variant">
              <MaterialIcon name="location_on" className="h-3.5 w-3.5" />
              {event.location}
            </p>
          ) : null}
          <Link
            href={href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="mt-3 inline-block text-xs font-bold text-primary underline decoration-primary/30 hover:decoration-primary"
          >
            {label}
          </Link>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-16 text-center">
      <MaterialIcon name="event_note" className="h-12 w-12 text-on-surface-variant" />
      <h2 className="font-headline-md text-headline-md text-on-surface">No upcoming events yet</h2>
      <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
        Check back soon — new festivals, workshops, and community gatherings are added regularly.
      </p>
    </div>
  )
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatDateRange(startIso: string, endIso?: string | null): string {
  if (!endIso) return formatDate(startIso)
  const start = new Date(startIso)
  const end = new Date(endIso)
  if (start.toDateString() === end.toDateString()) return formatDate(startIso)
  const sameYear = start.getFullYear() === end.getFullYear()
  const sameMonth = sameYear && start.getMonth() === end.getMonth()
  if (sameMonth) {
    return `${start.getDate()} – ${end.getDate()} ${start.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`
  }
  if (sameYear) {
    return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} – ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
  }
  return `${formatDate(startIso)} – ${formatDate(endIso)}`
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function formatTimeRange(startIso: string, endIso?: string | null): string {
  if (!endIso) return formatTime(startIso)
  return `${formatTime(startIso)} - ${formatTime(endIso)}`
}

function dayChip(iso: string): { day: string; month: string } {
  const d = new Date(iso)
  return {
    day: d.getDate().toString(),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
  }
}

function combineDateTime(dateIso: string, timeIso: string): string {
  const d = new Date(dateIso)
  const t = new Date(timeIso)
  d.setUTCHours(t.getUTCHours(), t.getUTCMinutes(), 0, 0)
  return d.toISOString()
}

function absolutize(url: string): string {
  if (url.startsWith('http')) return url
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

function eventToJsonLd(event: Event): Record<string, unknown> {
  const startDate = combineDateTime(event.startDate, event.startTime)
  const endDateIso = event.endDate ?? event.startDate
  const endTimeIso = event.endTime ?? event.startTime
  const endDate = combineDateTime(endDateIso, endTimeIso)

  const image = typeof event.featureImage === 'object' ? (event.featureImage as Media).url : null

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description ?? undefined,
    startDate,
    endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: event.location
      ? {
          '@type': 'Place',
          name: event.location,
        }
      : undefined,
    image: image ? [absolutize(image)] : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'Igbo Community Wales',
      url: SITE_URL,
    },
    offers: event.linkToRegister
      ? {
          '@type': 'Offer',
          url: event.linkToRegister,
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  }
}
