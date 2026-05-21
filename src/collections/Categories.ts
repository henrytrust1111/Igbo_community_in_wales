import { slugField, type CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },

  access: {
    read: () => true,
  },

  timestamps: true,

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    slugField({ useAsSlug: 'name' }),

    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
