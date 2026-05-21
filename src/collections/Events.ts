import { slugField, type CollectionConfig } from 'payload'
import type { Event } from '@/payload-types'

export const Events: CollectionConfig = {
  slug: 'events',

  admin: {
    useAsTitle: 'title',
  },

  access: {
    read: () => true,
  },

  timestamps: true,

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    slugField(),

    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },

    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Highlight this event in the featured slot on the events page.',
      },
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'featureImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'linkToRegister',
      type: 'text',
      validate: (value: string | string[] | null | undefined) => {
        if (!value || typeof value !== 'string') {
          return true
        }

        try {
          new URL(value)
          return true
        } catch {
          return 'Please enter a valid URL'
        }
      },
    },

    {
      name: 'registerCta',
      type: 'text',
      admin: {
        description:
          'Label for the register button (e.g. "Register Free", "Book Ticket"). Defaults to "Register" if empty.',
      },
    },

    {
      name: 'location',
      type: 'text',
    },

    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
    },

    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'Leave blank for single-day events.',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
      validate: (value, { siblingData }) => {
        const data = siblingData as Partial<Event>
        if (!value || !data?.startDate) {
          return true
        }

        const startDate = new Date(data.startDate)
        const endDate = new Date(value as string | Date)

        if (endDate < startDate) {
          return 'End date must be on or after start date'
        }

        return true
      },
    },

    {
      name: 'startTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          timeFormat: 'h:mm a',
        },
      },
    },

    {
      name: 'endTime',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          timeFormat: 'h:mm a',
        },
      },
      validate: (value, { siblingData }) => {
        const data = siblingData as { startTime?: string | Date }
        if (!value || !data?.startTime) {
          return true
        }

        const start = new Date(data.startTime as string | Date)
        const end = new Date(value as string | Date)
        const startMinutes = start.getUTCHours() * 60 + start.getUTCMinutes()
        const endMinutes = end.getUTCHours() * 60 + end.getUTCMinutes()

        if (endMinutes <= startMinutes) {
          return 'End time must be after start time'
        }

        return true
      },
    },
  ],
}
