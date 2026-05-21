import type { Metadata } from 'next'
import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Category, Gallery } from '@/payload-types'
import { GalleryPage } from '@/screens/gallery'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PAGE_SIZE = 6

type GalleryData = {
  categories: Category[]
  initialItems: Gallery[]
  initialPagination: { page: number; totalPages: number }
}

const getGalleryData = cache(async (): Promise<GalleryData> => {
  const payload = await getPayload({ config: await config })

  const usedRefs = await payload.find({
    collection: 'gallery',
    depth: 0,
    pagination: false,
    select: { category: true },
  })

  const usedCategoryIds = Array.from(
    new Set(usedRefs.docs.map((d) => d.category as unknown as string)),
  )

  const categories = usedCategoryIds.length
    ? (
        await payload.find({
          collection: 'categories',
          where: { id: { in: usedCategoryIds } },
          pagination: false,
          sort: 'name',
        })
      ).docs
    : []

  const initial = await payload.find({
    collection: 'gallery',
    depth: 1,
    limit: PAGE_SIZE,
    page: 1,
    sort: '-createdAt',
  })

  return {
    categories,
    initialItems: initial.docs,
    initialPagination: {
      page: initial.page ?? 1,
      totalPages: initial.totalPages ?? 1,
    },
  }
})

export const metadata: Metadata = {
  title: { absolute: 'Gallery — Moments from the Igbo Community in Wales · Igbo Community Wales' },
  description:
    'Photos from Igbo Community Wales events, meetups, climate conversations and cultural celebrations across Cardiff and beyond.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    url: '/gallery',
    title: 'Gallery — Moments from the Igbo Community in Wales',
    description:
      'Photos from Igbo Community Wales events, meetups, climate conversations and cultural celebrations across Cardiff and beyond.',
  },
  twitter: {
    title: 'Gallery — Igbo Community Wales',
    description:
      'Photos from Igbo Community Wales events, meetups, climate conversations and cultural celebrations across Cardiff and beyond.',
  },
}

export default async function Page() {
  const { categories, initialItems, initialPagination } = await getGalleryData()

  return (
    <GalleryPage
      categories={categories}
      initialItems={initialItems}
      initialPagination={initialPagination}
    />
  )
}
