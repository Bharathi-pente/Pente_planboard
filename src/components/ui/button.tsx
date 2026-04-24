import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'bacc'
    | 'bgrn'
    | 'bred'
    | 'bamb'
    | 'bpur'
    | 'bteal'
    | 'bgo'
    | 'bsu'
    | 'outline'
    | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'bacc',
      size = 'md',
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          // Base styles - Apple-inspired
          'inline-flex items-center justify-center rounded-xl font-semibold',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed',
          'active:scale-[0.97] active:transition-transform active:duration-100',
          'relative overflow-hidden',
          'before:absolute before:inset-0 before:transition-opacity before:duration-200',

          // Size variants - refined
          {
            'h-9 px-4 text-xs gap-2 shadow-sm': size === 'sm',
            'h-11 px-5 text-sm gap-2 shadow-sm': size === 'md',
            'h-12 px-7 text-base gap-2.5 shadow-md': size === 'lg',
          },

          // Color variants - Apple-quality gradients and states
          {
            // Accent (Student) - Blue/Purple with subtle gradient
            'bg-gradient-to-b from-[hsl(238,74%,59%)] to-[hsl(238,74%,54%)] text-white hover:from-[hsl(238,74%,54%)] hover:to-[hsl(238,74%,49%)] focus-visible:ring-[hsl(238,74%,59%)] shadow-[0_1px_3px_rgba(99,102,241,0.25)]':
              variant === 'bacc',

            // Green (Faculty) - smooth gradient
            'bg-gradient-to-b from-[hsl(158,64%,52%)] to-[hsl(158,64%,47%)] text-white hover:from-[hsl(158,64%,47%)] hover:to-[hsl(158,64%,42%)] focus-visible:ring-[hsl(158,64%,52%)] shadow-[0_1px_3px_rgba(16,185,129,0.25)]':
              variant === 'bgrn',

            // Red (Supervisor/Danger) - refined gradient
            'bg-gradient-to-b from-[hsl(0,72%,51%)] to-[hsl(0,72%,46%)] text-white hover:from-[hsl(0,72%,46%)] hover:to-[hsl(0,72%,41%)] focus-visible:ring-[hsl(0,72%,51%)] shadow-[0_1px_3px_rgba(239,68,68,0.25)]':
              variant === 'bred',

            // Amber (Warning) - warm gradient
            'bg-gradient-to-b from-[hsl(38,92%,50%)] to-[hsl(38,92%,45%)] text-white hover:from-[hsl(38,92%,45%)] hover:to-[hsl(38,92%,40%)] focus-visible:ring-[hsl(38,92%,50%)] shadow-[0_1px_3px_rgba(245,158,11,0.25)]':
              variant === 'bamb',

            // Purple - rich gradient
            'bg-gradient-to-b from-[hsl(271,81%,56%)] to-[hsl(271,81%,51%)] text-white hover:from-[hsl(271,81%,51%)] hover:to-[hsl(271,81%,46%)] focus-visible:ring-[hsl(271,81%,56%)] shadow-[0_1px_3px_rgba(139,92,246,0.25)]':
              variant === 'bpur',

            // Teal - professional gradient
            'bg-gradient-to-b from-[hsl(173,58%,39%)] to-[hsl(173,58%,34%)] text-white hover:from-[hsl(173,58%,34%)] hover:to-[hsl(173,58%,29%)] focus-visible:ring-[hsl(173,58%,39%)] shadow-[0_1px_3px_rgba(20,184,166,0.25)]':
              variant === 'bteal',

            // Ghost/Outline (bgo) - subtle and clean
            'border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,84%,5%)] hover:bg-[hsl(240,20%,97%)] hover:border-[hsl(214,32%,86%)] focus-visible:ring-[hsl(214,32%,91%)] active:bg-[hsl(240,20%,95%)]':
              variant === 'bgo',

            // Submit/Primary (bsu) - prominent
            'bg-gradient-to-b from-[hsl(238,74%,59%)] to-[hsl(238,74%,54%)] text-white hover:from-[hsl(238,74%,54%)] hover:to-[hsl(238,74%,49%)] shadow-[0_4px_12px_rgba(99,102,241,0.25)] focus-visible:ring-[hsl(238,74%,59%)] hover:shadow-[0_6px_16px_rgba(99,102,241,0.3)]':
              variant === 'bsu',

            // Outline - clear and accessible
            'border-2 border-[hsl(238,74%,59%)] bg-transparent text-[hsl(238,74%,59%)] hover:bg-[hsl(238,94%,96%)] hover:border-[hsl(238,74%,54%)] focus-visible:ring-[hsl(238,74%,59%)]':
              variant === 'outline',

            // Ghost - minimal and clean
            'bg-transparent text-[hsl(222,84%,5%)] hover:bg-[hsl(240,20%,97%)] focus-visible:ring-[hsl(214,32%,91%)] active:bg-[hsl(240,20%,94%)]':
              variant === 'ghost',
          },

          // Full width
          fullWidth && 'w-full',

          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
