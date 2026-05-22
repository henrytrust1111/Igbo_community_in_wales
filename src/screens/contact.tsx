import { ContactForm } from '@/components/contact-form'
import { MaterialIcon } from '@/components/material-icon'

export function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pattern-bg pointer-events-none absolute inset-0" />
      <section className="relative mx-auto max-w-container-max px-margin-desktop pb-16 pt-24 text-center">
        <h1 className="mb-6 font-display-lg text-display-lg text-primary">Get in Touch</h1>
        <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Have questions about our heritage programs or want to get involved? Our team is here to
          help you connect with the Igbo community in Wales.
        </p>
      </section>

      <section className="relative mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-desktop pb-24 lg:grid-cols-12">
        <div className="space-y-gutter lg:col-span-4">
          {[
            [
              'location_on',
              'Our Base',
              'The Church of Jesus Christ of Latter-Day Saints\nCardiff, CF14 6UH\nUnited Kingdom',
              'bg-primary',
              'text-primary',
            ],
            ['call', 'Speak With Us', '+44 7828 859104\n24/7', 'bg-secondary', 'text-secondary'],
            ['mail', 'Direct Email', 'igbowales@gmail.com', 'bg-tertiary', 'text-tertiary'],
          ].map(([icon, title, text, bar, tone]) => (
            <div
              key={title}
              className="group relative overflow-hidden border border-outline-variant bg-surface-container-lowest p-8"
            >
              <div className={`absolute left-0 top-0 h-full w-1 ${bar}`} />
              <div className="flex items-start gap-4">
                <MaterialIcon name={icon} className={`h-8 w-8 ${tone}`} />
                <div>
                  <h3 className="mb-2 font-headline-md text-headline-md">{title}</h3>
                  <p className="whitespace-pre-line leading-relaxed text-on-surface-variant">
                    {text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="h-62.5 overflow-hidden border border-outline-variant grayscale transition-all duration-500 hover:grayscale-0">
            <iframe
              title="Map of Igbo Community Wales — Cardiff CF14 6UH"
              src="https://www.google.com/maps?q=The+Church+of+Jesus+Christ+of+Latter-Day+Saints+Cardiff+CF14+6UH&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="h-full border border-outline-variant bg-surface-container-lowest p-10">
            <h2 className="mb-8 font-headline-lg text-headline-lg text-primary">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="border-y border-outline-variant/30 bg-surface-container-low py-24">
        <div className="mx-auto max-w-container-max px-margin-desktop">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display-lg text-display-lg text-primary">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto h-1 w-24 bg-secondary" />
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[
              [
                'help',
                'What is the purpose of ICW?',
                'Igbo Community Wales is dedicated to empowering Igbo people in Wales, building unity and capacity for a stronger, more effective Igbo presence.',
              ],
              [
                'group_add',
                'How can I get involved?',
                'Join our regular workshops, skill-building sessions, cultural events, or volunteer across committees from event planning to heritage preservation.',
              ],
              [
                'diversity_3',
                'Are non-Igbo members allowed?',
                'Absolutely. We value community collaboration and welcome anyone interested in supporting our mission or participating in cultural celebration events.',
              ],
              [
                'event',
                'What types of events do you hold?',
                'Our calendar features the New Yam Cultural Festival, Language and Heritage Workshops, Community Business Mixers, and End of Year Gala and Awards.',
              ],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="border border-outline-variant bg-surface-container-lowest p-8"
              >
                <h4 className="mb-4 flex items-center gap-3 font-headline-md text-headline-md text-tertiary">
                  <MaterialIcon name={icon} className="h-6 w-6 text-primary" />
                  {title}
                </h4>
                <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
