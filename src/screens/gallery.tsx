'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import { MaterialIcon } from '@/components/material-icon'
import type { Category, Gallery, Media } from '@/payload-types'

type PaginationState = { page: number; totalPages: number }

type GalleryPageProps = {
  categories: Category[]
  initialItems: Gallery[]
  initialPagination: PaginationState
}

const PAGE_SIZE = 6

export function GalleryPage({ categories, initialItems, initialPagination }: GalleryPageProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [items, setItems] = useState<Gallery[]>(initialItems)
  const [pagination, setPagination] = useState<PaginationState>(initialPagination)
  const [isFiltering, setIsFiltering] = useState(false)
  const [isPaginating, setIsPaginating] = useState(false)

  const abortRef = useRef<AbortController | null>(null)

  const fetchPage = async (opts: {
    page: number
    categoryId: string | null
    mode: 'filter' | 'paginate'
  }) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    if (opts.mode === 'filter') {
      setIsFiltering(true)
    } else {
      setIsPaginating(true)
    }

    const params = new URLSearchParams({
      depth: '1',
      limit: String(PAGE_SIZE),
      page: String(opts.page),
      sort: '-createdAt',
    })
    if (opts.categoryId) {
      params.set('where[category][equals]', opts.categoryId)
    }

    try {
      const res = await fetch(`/api/gallery?${params.toString()}`, {
        signal: controller.signal,
      })
      if (!res.ok) throw new Error('Failed to load gallery')
      const data: { docs: Gallery[]; page?: number; totalPages?: number } = await res.json()

      if (controller.signal.aborted) return

      setItems(data.docs)
      setPagination({ page: data.page ?? 1, totalPages: data.totalPages ?? 1 })
      setActiveCategoryId(opts.categoryId)
      setIsFiltering(false)
      setIsPaginating(false)
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setIsFiltering(false)
      setIsPaginating(false)
    }
  }

  const handleFilterChange = (categoryId: string | null) => {
    if (categoryId === activeCategoryId || isFiltering) return
    void fetchPage({ page: 1, categoryId, mode: 'filter' })
  }

  const handlePageChange = (delta: 1 | -1) => {
    const { page, totalPages } = pagination
    if (totalPages <= 1 || isPaginating || isFiltering) return
    const nextPage =
      delta === 1 ? (page === totalPages ? 1 : page + 1) : page === 1 ? totalPages : page - 1
    if (nextPage === page) return
    void fetchPage({ page: nextPage, categoryId: activeCategoryId, mode: 'paginate' })
  }

  const spotlightItem = items[0]
  const spotlightImage =
    spotlightItem && typeof spotlightItem.image === 'object' ? spotlightItem.image : null

  return (
    <div className="relative">
      <div className="uli-pattern pointer-events-none absolute inset-0 opacity-5" />
      <section className="relative mx-auto max-w-container-max px-margin-desktop py-16 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 block font-label-md text-label-md uppercase tracking-widest text-secondary">
            Our Visual Journey
          </span>
          <h1 className="mb-6 font-display-lg text-display-lg text-primary">
            Preserving Heritage, Capturing Moments
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Explore the vibrant tapestry of Igbo culture in Wales through our curated collection of
            community events, festivals, and personal achievements.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-container-max px-margin-desktop pb-12">
        <div className="flex flex-wrap justify-center gap-4">
          <FilterChip
            label="All Moments"
            active={activeCategoryId === null}
            onClick={() => handleFilterChange(null)}
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              label={cat.name}
              active={activeCategoryId === cat.id}
              onClick={() => handleFilterChange(cat.id)}
            />
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-container-max overflow-hidden px-margin-desktop pb-24">
        <div
          className={`grid gap-gutter transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 ${
            isPaginating ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {isFiltering
            ? Array.from({ length: items.length < PAGE_SIZE ? items.length : PAGE_SIZE }).map(
                (_, i) => <GallerySkeleton key={i} />,
              )
            : items.map((item) => <GalleryCard key={item.id} item={item} />)}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary transition-colors hover:bg-primary hover:text-white ${
              isPaginating ? 'pointer-events-none opacity-50' : ''
            }`}
            type="button"
            onClick={() => handlePageChange(-1)}
            aria-label="Show previous gallery page"
          >
            <MaterialIcon name="chevron_left" className="h-6 w-6" />
          </button>
          <p
            className={`min-w-24 text-center font-label-md text-label-md text-on-surface-variant ${
              isPaginating ? 'opacity-50' : ''
            }`}
          >
            Page {pagination.page} / {pagination.totalPages}
          </p>
          <button
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary transition-colors hover:bg-primary hover:text-white ${
              isPaginating ? 'pointer-events-none opacity-50' : ''
            }`}
            type="button"
            onClick={() => handlePageChange(1)}
            aria-label="Show next gallery page"
          >
            <MaterialIcon name="chevron_right" className="h-6 w-6" />
          </button>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-container py-24">
        <div className="mx-auto grid max-w-container-max items-center gap-16 px-margin-desktop md:grid-cols-2">
          <div className="relative z-10">
            <span className="mb-4 block font-label-md text-label-md uppercase tracking-widest text-secondary">
              Community Spotlight
            </span>
            <blockquote className="mb-8 font-display-lg text-headline-lg italic text-primary">
              &ldquo;Heritage is not what we leave behind, but the roots that anchor our future and
              the wings that carry our dreams.&rdquo;
            </blockquote>
            <p className="font-body-lg text-on-surface-variant">
              Celebrating the timeless beauty and enduring strength of our shared Igbo identity.
            </p>
          </div>
          {spotlightImage?.url ? (
            <div className="relative">
              <div className="hard-shadow relative aspect-[4/5] rotate-3 overflow-hidden rounded-xl transition-transform duration-500 hover:rotate-0">
                <Image
                  src={spotlightImage.url}
                  alt={spotlightImage.alt ?? 'ICW community showcase'}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-lg bg-primary px-6 py-2 font-label-md text-label-md text-on-primary shadow-sm'
          : 'card-border rounded-lg bg-surface-container px-6 py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-primary/5'
      }
    >
      {label}
    </button>
  )
}

function GalleryCard({ item }: { item: Gallery }) {
  const media = typeof item.image === 'object' ? (item.image as Media) : null
  const url = media?.url ?? ''
  const alt = media?.alt ?? item.title ?? ''

  return (
    <div className="hard-shadow group relative aspect-[4/3] overflow-hidden rounded-xl">
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-125"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5">
        {item.title ? (
          <h2 className="mb-1 font-headline-md text-xl text-white">{item.title}</h2>
        ) : null}
        {item.description ? (
          <p className="line-clamp-2 font-body-md text-sm text-white/90">{item.description}</p>
        ) : null}
      </div>
    </div>
  )
}

function GallerySkeleton() {
  return (
    <div className="hard-shadow relative aspect-[4/3] animate-pulse overflow-hidden rounded-xl bg-surface-container-high" />
  )
}
