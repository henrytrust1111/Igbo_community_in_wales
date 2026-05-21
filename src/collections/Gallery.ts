import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'event', 'updatedAt'],
  },

  access: {
    read: () => true,
  },

  timestamps: true,

  fields: [
    {
      name: 'title',
      type: 'text',
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
      index: true,
    },

    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      hasMany: false,
      index: true,
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
