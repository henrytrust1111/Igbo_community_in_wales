import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return { id: { equals: user.id } }
}

const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => user?.role === 'admin'

export const Users: CollectionConfig = {
  slug: 'users',

  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'role'],
    hidden: ({ user }) => user?.role !== 'admin',
  },

  auth: true,

  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user),
  },

  hooks: {
    beforeChange: [
      async ({ req, data, operation }) => {
        if (operation === 'create') {
          const { totalDocs } = await req.payload.find({
            collection: 'users',
            limit: 0,
            depth: 0,
            overrideAccess: true,
          })

          if (totalDocs === 0) {
            data.role = 'admin'
          }
        }

        return data
      },
    ],
  },

  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      access: {
        update: isAdminFieldLevel,
      },
    },
  ],
}
