import type { Metadata } from 'next'

import { ContactPage } from '@/screens/contact'

export const metadata: Metadata = {
  title: { absolute: 'Contact — Get in Touch with Igbo Community Wales' },
  description:
    'Reach Igbo Community Wales — send a message, ask a question, or join our community of Igbo families and friends in Cardiff and across Wales.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: '/contact',
    title: 'Contact Igbo Community Wales',
    description:
      'Reach Igbo Community Wales — send a message, ask a question, or join our community of Igbo families and friends in Cardiff and across Wales.',
  },
  twitter: {
    title: 'Contact Igbo Community Wales',
    description:
      'Reach Igbo Community Wales — send a message, ask a question, or join our community of Igbo families and friends in Cardiff and across Wales.',
  },
}

export default function Page() {
  return <ContactPage />
}
