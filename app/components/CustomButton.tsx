'use client'

import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../utils/utils"
import { ReactNode } from "react"

const buttonVariants = cva(
  "inline-flex gap-2 justify-center items-center rounded-xl border",
  {
    variants: {
      variant: {
        danger: "bg-red-500",
        normal: "bg-blue-400",
        glass: "bg-gray-300/50 hover:bg-gray-400/50 backdrop-blur-xl"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "glass",
      size: "md"
    }
  }
)

interface ButtonProps extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
    leftIcon?: ReactNode,
    rightIcon?: ReactNode
  }

function CustomButton({ className, variant, size, children, leftIcon, rightIcon, onClick, ...props }: ButtonProps) {
  const navigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button 
      className={cn(buttonVariants({ variant, size }), className)} 
      onClick={navigate}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  )
}

export default CustomButton