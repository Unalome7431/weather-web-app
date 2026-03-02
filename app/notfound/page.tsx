'use client'

import { useRouter } from "next/navigation"
import { Frown } from "lucide-react"
import CustomButton from "../components/CustomButton"

export default function NotFoundPage() {
  const router = useRouter()

  const handleBackButton = () => {
    router.push('/')
  }

  return (
    <div className="bg-layer h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-5">
        <Frown className="size-20 text-highlight"/>
        <div className="flex flex-col gap-2">
          <span className="text-center text-2xl">Location Not Found</span>
          <CustomButton variant="gradient" className="text-main" onClick={handleBackButton}>
            Back
          </CustomButton>
        </div>
      </div>
    </div>
  )
}