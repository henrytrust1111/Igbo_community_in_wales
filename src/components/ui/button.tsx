import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_18px_45px_rgba(176,26,49,0.22)] hover:-translate-y-0.5 hover:bg-primary/92',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[0_18px_45px_rgba(15,64,43,0.18)] hover:-translate-y-0.5 hover:bg-secondary/92',
        outline:
          'border bg-background/70 text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card',
        ghost: 'text-foreground hover:bg-muted hover:text-primary',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4',
        lg: 'h-12 px-7 text-base',
        icon: 'size-11 px-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button }
