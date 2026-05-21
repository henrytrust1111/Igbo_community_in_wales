import Link from 'next/link'
import { MaterialIcon } from '@/components/material-icon'

export function Footer() {
  return (
    <footer className="border-t-4 border-primary bg-surface-container-lowest">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-12 px-margin-desktop py-14 md:grid-cols-[1.35fr_0.7fr_1fr] md:py-16">
        <div>
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-5"
            aria-label="Igbo Community Wales home"
          >
            <img src="/images/Wales Logo.png" alt="Igbo Community Wales" className="h-16 w-auto" />
            <span className="leading-tight">
              <span className="block font-label-md text-label-md uppercase tracking-wider text-secondary">
                Igbo Community Wales
              </span>
              <span className="block font-headline-lg text-3xl font-bold text-primary">
                Unity. Heritage. Progress.
              </span>
            </span>
          </Link>
          <p className="max-w-sm font-body-md text-body-md text-on-surface-variant">
            A refined home for Igbo identity in Wales, connecting families, culture and opportunity.
          </p>
        </div>

        <div>
          <h5 className="mb-7 font-label-md text-label-md uppercase tracking-wider text-primary">
            Quick Link
          </h5>
          <ul className="space-y-4">
            {[
              ['Home', '/'],
              ['About Us', '/about'],
              ['Events', '/events'],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  className="font-body-md text-body-md text-on-surface-variant transition-colors hover:text-primary"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-7 font-label-md text-label-md uppercase tracking-wider text-primary">
            Contacts
          </h5>
          <div className="space-y-5">
            <div className="flex items-center gap-5 font-body-md text-body-md text-on-surface-variant">
              <MaterialIcon name="location_on" className="h-5 w-5 shrink-0 text-primary" />
              <span>The Church of Jesus Christ of Latter-Day Saints, Cardiff, CF14 6UH</span>
            </div>
            <div className="flex items-center gap-5 font-body-md text-body-md text-on-surface-variant">
              <MaterialIcon name="mail" className="h-5 w-5 shrink-0 text-primary" />
              <span>igbowales@gmail.com</span>
            </div>
            <div className="flex items-center gap-5 font-body-md text-body-md text-on-surface-variant">
              <MaterialIcon name="phone" className="h-5 w-5 shrink-0 text-primary" />
              <span>+44 7828 859104</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-outline-variant/30">
        <div className="mx-auto grid max-w-container-max items-center gap-6 px-margin-desktop py-8 md:grid-cols-[auto_1fr_auto]">
          <Link
            href="/"
            aria-label="Visit Igbo Community Wales website"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed text-primary"
          >
            <MaterialIcon name="globe" className="h-5 w-5" />
          </Link>
          <p className="text-center font-label-md text-label-md text-on-surface-variant md:col-start-2">
            &copy; 2026 Igbo Community Wales. Powered by{' '}
            <a href="https://www.witboxtech.co.uk/" className="underline hover:text-primary">
              Witbox technology
            </a>
          </p>
          <span aria-hidden="true" className="hidden h-10 w-10 md:block" />
        </div>
      </div>
    </footer>
  )
}
