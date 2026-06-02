import Image from 'next/image'
import Link from 'next/link'

import { MaterialIcon } from '@/components/material-icon'
import type { Gallery, Media } from '@/payload-types'

const heroImage = '/gallery/Day 5 Climate Conversation ICW Wales.jpeg'

const team = [
  ['Lady Dee Udeze', 'Community Leader', '/teams/Lady Dee.webp'],
  ['Edwina', 'Unity Advocate', '/teams/Edwina.webp'],
  ['Chinwa', 'Cultural Promotion', '/teams/chinwa.webp'],
  ['Madam Susan', 'Welfare & Culture', '/teams/Madam Susan.webp'],
  ['Mazi Obidient', 'Heritage Affairs', '/teams/Mazi Obidient.webp'],
  ['Chidi', 'Friendship & Unity', '/teams/Chidi.webp'],
  ['David Amaechi', 'Chairman Emeritus', '/teams/David Amaechi.webp'],
]

type AboutPageProps = {
  recentGallery: Gallery[]
}

export function AboutPage({ recentGallery }: AboutPageProps) {
  return (
    <>
      <section className="relative mx-auto max-w-container-max overflow-hidden px-margin-desktop py-24">
        <div className="uli-pattern absolute inset-0 -z-10 opacity-5" />
        <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="mb-4 inline-block font-label-md text-label-md tracking-widest text-secondary">
              OUR LEGACY & MISSION
            </span>
            <h1 className="mb-8 font-display-lg text-display-lg leading-tight text-primary">
              Uplifting individuals to be valuable members of the wider community.
            </h1>
            <p className="mb-12 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              Igbo Community Wales (ICW) is more than an association; it is a movement dedicated to
              empowering Igbo people in Wales, enhancing effectiveness, and championing equality
              through cultural preservation and community collaboration.
            </p>
          </div>
          <div className="relative lg:col-span-5">
            <div className="relative aspect-4/5 overflow-hidden border-t-4 border-primary bg-surface-container-high shadow-xl">
              <Image
                src={heroImage}
                alt="Community leaders in traditional Igbo attire"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-margin-desktop py-24">
        <div className="mx-auto max-w-container-max">
          <h2 className="mb-16 text-center font-headline-lg text-headline-lg text-primary">
            The Pillars of Our Heritage
          </h2>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {[
              [
                'diversity_3',
                'Unity and Support',
                'Building a strong, connected network where every member finds a home and a voice within the Welsh landscape.',
                'border-primary',
              ],
              [
                'psychology',
                'Empowerment',
                'Through workshops and skill-building, we equip our members with the tools to thrive professionally and personally.',
                'border-secondary',
              ],
              [
                'history_edu',
                'Cultural Preservation',
                'Preserving the rich traditions of the Igbo people while fostering dialogue with the wider Welsh community.',
                'border-tertiary',
              ],
            ].map(([icon, title, text, border]) => (
              <div
                key={title}
                className={`flex flex-col items-start gap-6 border border-outline-variant ${border} border-t-4 bg-surface p-10 transition-shadow hover:shadow-lg`}
              >
                <MaterialIcon name={icon} className="h-10 w-10 text-secondary" />
                <h3 className="font-headline-md text-headline-md text-tertiary">{title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-container-max px-margin-desktop py-24">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <span className="mb-4 block font-label-md text-label-md uppercase tracking-widest text-secondary">
              Leadership
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Meet Our Visionaries</h2>
            <p className="mt-4 font-body-md text-body-md text-on-surface-variant">
              The dedicated individuals steering Igbo Community Wales toward a future of unity,
              progress, and cultural excellence.
            </p>
          </div>
          <div className="mx-8 hidden h-px grow bg-outline-variant md:block" />
        </div>
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          {team.map(([name, role, image]) => (
            <div key={name} className="group">
              <div className="relative mb-6 aspect-3/4 overflow-hidden border border-outline-variant bg-surface-container transition-colors group-hover:border-primary">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h4 className="font-headline-md text-headline-md text-primary">{name}</h4>
              <p className="mt-1 font-label-md text-label-md uppercase tracking-wider text-secondary">
                {role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {recentGallery.length > 0 ? (
        <section className="bg-surface px-margin-desktop py-24">
          <div className="mx-auto max-w-container-max">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-headline-lg text-headline-lg text-primary">ICW Gallery</h2>
              <div className="mx-auto h-1 w-24 bg-secondary" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {recentGallery.map((item, index) => {
                const media = typeof item.image === 'object' ? (item.image as Media) : null
                const url = media?.url ?? ''
                const alt = media?.alt ?? item.title ?? 'Igbo Community Wales gallery moment'
                const sizes =
                  index === 1 ? '(min-width: 768px) 50vw, 50vw' : '(min-width: 768px) 25vw, 50vw'
                return (
                  <div
                    key={item.id}
                    className={`${index === 1 ? 'md:col-span-2 md:row-span-2' : ''} group relative aspect-square overflow-hidden bg-surface-container-high`}
                  >
                    <Image
                      src={url}
                      alt={alt}
                      fill
                      sizes={sizes}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-margin-desktop py-24">
        <div className="relative mx-auto max-w-container-max overflow-hidden bg-primary px-10 py-20 text-center">
          <div className="uli-pattern absolute inset-0 opacity-10" />
          <div className="relative z-10">
            <h2 className="mb-6 font-headline-lg text-headline-lg text-on-primary">
              Be a Part of Our Growing Legacy
            </h2>
            <p className="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg text-on-primary-container">
              Join us in our mission to empower, unite, and preserve the rich heritage of the Igbo
              people in Wales.
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Link
                href="/contact"
                className="bg-secondary-container px-10 py-4 font-label-md text-label-md text-on-secondary-container transition-all hover:brightness-105"
              >
                Start Your Journey
              </Link>
              <Link
                href="/contact"
                className="border border-on-primary px-10 py-4 font-label-md text-label-md text-on-primary transition-all hover:bg-on-primary hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
