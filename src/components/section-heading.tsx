import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title?: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <Badge variant="gold" className="mb-4">
        {eyebrow}
      </Badge>
      {title ? (
        <h2 className="font-serif text-4xl font-bold leading-tight text-balance text-foreground md:text-5xl">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
