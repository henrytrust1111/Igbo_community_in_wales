import type { Metadata } from 'next'

import { HomePage } from '@/screens/home'

export const metadata: Metadata = {
  description:
    'A home for Igbo identity in Cardiff. Join us for festivals, workshops, networking and community events that empower Igbo families across Wales.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Igbo Community Wales — A Home for Igbo Identity in Cardiff',
    description:
      'A home for Igbo identity in Cardiff. Join us for festivals, workshops, networking and community events that empower Igbo families across Wales.',
  },
}

export default function Page() {
  return <HomePage />
}
