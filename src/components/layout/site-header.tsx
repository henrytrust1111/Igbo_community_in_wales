'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MaterialIcon } from '@/components/material-icon'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/90 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-container-max items-center justify-between px-margin-desktop py-3">
        <Link href="/" className="block" aria-label="Igbo Community Wales home" onClick={closeMenu}>
          <img
            src="/images/Wales Logo 2.png"
            alt="Igbo Community Wales"
            className="h-20 w-auto md:h-14"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? 'border-b-2 border-primary pb-1 font-label-md text-label-md text-primary'
                    : 'font-label-md text-label-md text-on-surface-variant transition-colors duration-300 hover:text-primary'
                }
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <Link
          href="/contact"
          className="hidden rounded-lg bg-primary px-6 py-2 font-label-md text-label-md text-on-primary transition-all hover:opacity-90 active:scale-95 md:inline-flex"
        >
          Join Us
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-outline-variant text-primary transition-colors hover:bg-primary hover:text-on-primary md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <MaterialIcon name="menu" className="h-6 w-6" />
        </button>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-on-surface/35"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
          <aside className="absolute right-0 top-0 flex h-dvh w-[min(84vw,360px)] flex-col border-l border-outline-variant bg-surface-container-lowest shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/40 px-6 py-4">
              <Link href="/" aria-label="Igbo Community Wales home" onClick={closeMenu}>
                <img
                  src="/images/Wales Logo 2.png"
                  alt="Igbo Community Wales"
                  className="h-16 w-auto"
                />
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed text-primary transition-colors hover:bg-primary hover:text-on-primary"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <MaterialIcon name="close" className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col px-6 py-8">
              <div className="grid gap-3">
                {navItems.map((item) => {
                  const active = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={
                        active
                          ? 'rounded-lg bg-primary px-4 py-3 font-label-md text-label-md text-on-primary'
                          : 'rounded-lg px-4 py-3 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary'
                      }
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="mt-8 rounded-lg bg-primary px-6 py-3 text-center font-label-md text-label-md text-on-primary transition-all hover:opacity-90 active:scale-95"
              >
                Join Us
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  )
}
