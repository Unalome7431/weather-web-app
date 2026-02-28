'use client'

import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../utils/utils"
import { ReactNode } from "react"

const buttonVariants = cva(
  "inline-flex gap-2 justify-center items-center rounded-xl shadow-lg active:scale-98",
  {
    variants: {
      variant: {
        danger: "bg-red-500",
        normal: "bg-blue-400",
        glass: "bg-gray-400/30 hover:bg-gray-400/50 backdrop-blur-xl transition-color hover:ease-in-out duration-300 active:transition-none",
        gradient: "gradient-animated hover:gradient-after"
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