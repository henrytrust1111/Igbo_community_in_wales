import type { Metadata, Viewport } from 'next'
import React from 'react'

import { MainLayout } from '@/components/layout/main-layout'
import '@/index.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://igbocommunitywales.org'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Igbo Community Wales — A Home for Igbo Identity in Cardiff',
    template: '%s · Igbo Community Wales',
  },
  description:
    'Igbo Community Wales empowers Igbo people in Cardiff and across Wales through cultural events, heritage workshops, networking and advocacy.',
  keywords: [
    'Igbo Community Wales',
    'ICW',
    'Igbo Cardiff',
    'Igbo culture Wales',
    'Igbo events Cardiff',
    'Nigerian community Wales',
    'Igbo heritage UK',
  ],
  applicationName: 'Igbo Community Wales',
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Igbo Community Wales',
    locale: 'en_GB',
    url: SITE_URL,
    title: 'Igbo Community Wales — A Home for Igbo Identity in Cardiff',
    description:
      'Igbo Community Wales empowers Igbo people in Cardiff and across Wales through cultural events, heritage workshops, networking and advocacy.',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Igbo Community Wales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Igbo Community Wales — A Home for Igbo Identity in Cardiff',
    description:
      'Igbo Community Wales empowers Igbo people in Cardiff and across Wales through cultural events, heritage workshops, networking and advocacy.',
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

export const viewport: Viewport = {
  themeColor: '#760000',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
