import Link from 'next/link'
import { MaterialIcon } from '@/components/material-icon'

const heroImage = '/gallery/Otu Nzuko Ifunanya Igbo Community Wales.jpeg'
const portraits = [
  '/testimonials/Lady Dee.webp',
  '/testimonials/Mazi Ifeany Amaechi.webp',
  '/testimonials/Chinedu Henry Enolue.webp',
]

const services = [
  [
    'school',
    'Development Training',
    'Interactive workshops and skill-building sessions designed to empower individuals for professional growth.',
    'Learn more',
    '/about',
  ],
  [
    'celebration',
    'Cultural Events',
    'Organizing festivals and gatherings that showcase the rich traditions of the Igbo heritage in Cardiff.',
    'Upcoming events',
    '/events',
  ],
  [
    'hub',
    'Networking',
    'Connecting our members with local organizations and businesses to foster collaboration and unity.',
    'Get connected',
    '/contact',
  ],
  [
    'campaign',
    'Advocacy',
    'Representing the Igbo voice at governmental levels and providing essential support for members.',
    'Our voice',
    '/about',
  ],
]

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-outline-variant/20 bg-surface py-24 md:py-32">
        <div className="uli-pattern absolute inset-0 opacity-5" />
        <div className="relative z-10 mx-auto grid max-w-container-max items-center gap-12 px-margin-desktop md:grid-cols-2">
          <div>
            <h1 className="mb-6 font-display-lg text-display-lg leading-tight text-primary">
              Empowering Igbo Communities in Wales
            </h1>
            <p className="mb-10 max-w-lg font-body-lg text-body-lg text-on-surface-variant">
              Building unity and capacity for a stronger, more effective Igbo presence in Wales and
              beyond. Preserving our ancestral heritage while flourishing in a modern society.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-primary px-8 py-4 font-label-md text-label-md text-on-primary shadow-md transition-all hover:opacity-95"
              >
                Empower the Igbo Community
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-secondary px-8 py-4 font-label-md text-label-md text-secondary transition-all hover:bg-secondary-container/10"
              >
                About Us
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="hard-shadow aspect-[4/5] overflow-hidden rounded-xl">
              <img
                className="h-full w-full object-cover"
                src={heroImage}
                alt="Igbo community members in traditional attire"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden max-w-[200px] rounded-lg bg-secondary-container p-6 shadow-lg md:block">
              <p className="font-label-md text-label-md italic text-on-secondary-container">
                "Unity is strength; where there is teamwork and collaboration, wonderful things can
                be achieved."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="mx-auto max-w-container-max px-margin-desktop">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="font-label-md text-label-md tracking-widest text-secondary">
              OUR CORE PURPOSE
            </span>
            <h2 className="mt-2 font-headline-lg text-headline-lg text-primary">
              Championing Empowerment and Equality
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
            <div className="group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-10 md:col-span-8">
              <div className="relative z-10">
                <MaterialIcon name="diversity_3" className="mb-6 h-10 w-10 text-secondary" />
                <h3 className="mb-4 font-headline-md text-headline-md text-primary">
                  Dedicated to Uplifting Lives
                </h3>
                <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
                  We focus on enhancing effectiveness within our community members, ensuring every
                  individual has the tools to succeed and contribute meaningfully to the wider Welsh
                  society.
                </p>
                <ul className="space-y-3">
                  {['Inclusive Community Engagement', 'Equality & Representation'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <MaterialIcon name="check_circle" className="h-5 w-5 text-secondary" />
                      <span className="font-label-md">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute bottom-0 right-0 opacity-10 transition-opacity group-hover:opacity-20">
                <MaterialIcon name="shield" className="h-[200px] w-[200px] text-primary" />
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-primary p-10 text-on-primary md:col-span-4">
              <div>
                <h3 className="mb-4 font-headline-md text-headline-md text-white">
                  Why Choose ICW?
                </h3>
                <p className="font-body-md text-body-md opacity-90">
                  We are the bridge between heritage and the future, providing a safe space for Igbo
                  people to connect, grow, and lead.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                {['Community Collaboration', 'Cultural Preservation'].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="rounded bg-on-primary-container p-2">
                      <MaterialIcon name="groups" className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-label-md text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-container-max px-margin-desktop">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="max-w-xl">
              <span className="font-label-md text-label-md tracking-widest text-secondary">
                WHAT WE PROVIDE
              </span>
              <h2 className="mt-2 font-headline-lg text-headline-lg text-primary">
                Serving the Community with Excellence
              </h2>
            </div>
            <Link
              href="/events"
              className="font-label-md text-label-md text-primary hover:underline decoration-secondary"
            >
              View all programs
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-4">
            {services.map(([icon, title, text, action, href]) => (
              <div
                key={title}
                className="group flex h-full flex-col rounded-lg border border-outline-variant bg-surface-container-lowest p-8 transition-all hover:border-primary"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded bg-surface-container-high transition-colors group-hover:bg-primary">
                  <MaterialIcon
                    name={icon}
                    className="h-6 w-6 text-primary group-hover:text-on-primary"
                  />
                </div>
                <h4 className="mb-3 font-headline-md text-headline-md text-primary">{title}</h4>
                <p className="flex-grow font-body-md text-body-md text-on-surface-variant">
                  {text}
                </p>
                <hr className="my-6 border-outline-variant/30" />
                <Link
                  href={href}
                  className="flex items-center gap-2 font-label-md text-secondary transition-colors hover:text-primary"
                >
                  <span>{action}</span>
                  <MaterialIcon name="arrow_forward" className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-surface-container-highest/30 py-24">
        <div className="uli-pattern absolute inset-0 opacity-5" />
        <div className="relative z-10 mx-auto max-w-container-max px-margin-desktop">
          <div className="mb-16 text-center">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary">
              Community Voices
            </span>
            <h2 className="mt-2 font-headline-lg text-headline-lg text-primary">
              What Our Members Say
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              [
                'Lady Dee Udeze',
                'Community Leader',
                'The Igbo Community in Wales has been a beacon of hope and a platform for us to reconnect with our roots while excelling in our careers.',
              ],
              [
                'Mazi Ifeany Amaechi',
                'Active Member',
                'Building unity is not just a slogan here; it is a lived reality. I feel empowered to represent my culture with pride every single day.',
              ],
              [
                'Chinedu Henry Enolue',
                'Entrepreneur',
                "The networking opportunities provided by ICW have opened doors I didn't know existed. It's truly a family away from home.",
              ],
            ].map(([name, role, quote], index) => (
              <div key={name} className="flex flex-col items-center text-center">
                <div className="mb-6 h-20 w-20 overflow-hidden rounded-full border-2 border-secondary p-1">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={portraits[index]}
                    alt={name}
                  />
                </div>
                <MaterialIcon name="format_quote" className="mb-4 h-10 w-10 text-primary" />
                <p className="mb-6 font-body-md text-body-md italic leading-relaxed text-on-surface-variant">
                  "{quote}"
                </p>
                <p className="font-label-md text-label-md font-bold text-primary">{name}</p>
                <p className="font-label-md text-[12px] uppercase tracking-wider text-secondary">
                  {role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-on-primary">
        <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-12 px-margin-desktop text-center md:flex-row md:text-left">
          <div className="max-w-xl">
            <h2 className="mb-4 font-display-lg text-[32px] text-white md:text-display-lg">
              Join Our Thriving Community
            </h2>
            <p className="font-body-lg text-body-lg opacity-90">
              Ready to take the next step in your journey with us? Be a part of the movement that's
              shaping the future of Igbos in Wales.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-secondary-container px-10 py-4 font-label-md text-label-md text-on-secondary-container shadow-lg transition-all hover:bg-white hover:text-primary"
            >
              Become a Member
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-on-primary px-10 py-4 font-label-md text-label-md text-on-primary transition-all hover:bg-white/10"
            >
              Volunteer Today
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
