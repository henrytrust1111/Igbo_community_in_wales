import { MaterialIcon } from '@/components/material-icon'

export function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pattern-bg absolute inset-0 pointer-events-none" />
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
          <div className="h-[250px] overflow-hidden border border-outline-variant grayscale transition-all duration-500 hover:grayscale-0">
            <img
              alt="Map location of Cardiff"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjbeZ0ezDQLJSIucWewcfsKNYNZcwFHnGjX9Lf-X5QWyYbBPUhyV96dyXNj5XBG1Xxr-0VHiH70zLAbqIEsCfodKRAqRp4NNOAGrMFRqJbascJH0WtL-PImT6pOU6YXL25qseRja1QZzLxDnhwRleLMuZA_rlXpPOP0V0yMCcd7L_5LcQUWiHN-vzuwdnzG_SlJCZLlLIQSZIw4QlwQ7tnDrdCuXHJNYfYy7tS1hAku5o41IIh4qovi7gEc1Fe5HiaM5pXdfOj6A"
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="h-full border border-outline-variant bg-surface-container-lowest p-10">
            <h2 className="mb-8 font-headline-lg text-headline-lg text-primary">Send a Message</h2>
            <form className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <label className="space-y-2">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Full Name
                </span>
                <input
                  className="w-full border border-outline-variant bg-surface p-3 outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary"
                  placeholder="Enter your name"
                  type="text"
                />
              </label>
              <label className="space-y-2">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Email Address
                </span>
                <input
                  className="w-full border border-outline-variant bg-surface p-3 outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary"
                  placeholder="name@example.com"
                  type="email"
                />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Inquiry Type
                </span>
                <select className="w-full border border-outline-variant bg-surface p-3 outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary">
                  <option>General Inquiry</option>
                  <option>Membership Application</option>
                  <option>Event Partnership</option>
                  <option>Volunteer Opportunities</option>
                  <option>Cultural Heritage Support</option>
                </select>
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Your Message
                </span>
                <textarea
                  className="w-full border border-outline-variant bg-surface p-3 outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary"
                  placeholder="How can we assist you today?"
                  rows={6}
                />
              </label>
              <div className="md:col-span-2">
                <button
                  className="group flex items-center gap-2 bg-primary px-10 py-4 font-label-md text-label-md text-on-primary transition-all hover:bg-primary-container"
                  type="button"
                >
                  Submit Message
                  <MaterialIcon
                    name="send"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>
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
