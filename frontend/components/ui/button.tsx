import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // extends standard <button> attributes (onClick, disabled, etc)
  VariantProps<typeof buttonVariants> { // allows variant and size props based on cva definitions (utility for defining reusable class variants)
  asChild?: boolean // if true, a button will wrap around another component (you can render buttons as links, spans, etc)
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>( // forwardRef -> enables passing a ref to the button (useful for focusing, animations, etc)
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button" // if asChild is true, the button inherits another component, otherwise it renders as a normal button
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // cn merges class names dynamically
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button" // helps with debugging in react devtools

export { Button, buttonVariants }
