import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../utils/utils";

const outerSquareVariants = cva(
  "bg-transparent flex justify-center items-center",
  {
    variants: {
      size: {
        xs: "w-7 h-7",
        md: "w-12 h-12"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const innerCircleVariants = cva(
  "border-6 rounded-[50%] rotate-45",
  {
    variants: {
      variant: {
        pink: "border-pink-300 border-t-pink-500",
        blue: "border-blue-300 border-t-blue-500"
      },
      size: {
        xs: "w-5 h-5",
        md: "w-10 h-10"
      },
      animate: {
        linear: "animate-[spin_2s_linear_infinite]",
        easeIO: "animate-[spin_2s_ease-in-out_infinite]"
      }
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
      animate: "linear"
    }
  }
)

interface SpinnerProps extends React.ComponentProps<'div'>, VariantProps<typeof outerSquareVariants>, VariantProps<typeof innerCircleVariants> {
  innerClassName?: string
}

export default function CustomSpinner({ innerClassName, className, variant, size, animate }: SpinnerProps) {

  return(
    <div className={cn(outerSquareVariants({ size }), className)}>
      <div className={cn(innerCircleVariants({ size, variant, animate }), innerClassName)}>
      </div>
    </div>
  )
}