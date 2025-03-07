import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-aleo relative overflow-hidden transition-all duration-300 hover:border-b-4 hover:border-darkpurple-500",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-t from-teal-500 to-white text-darkpurple-500 shadow hover:opacity-75",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        getstarted:
          "bg-gradient-to-t from-teal-500 to-white text-darkpurple-500 shadow before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:200%_200%] before:bg-[position:200%_0] before:bg-no-repeat before:transition-all before:duration-500 before:ease-in-out hover:before:bg-[position:-100%_0]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-10",
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
