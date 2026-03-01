'use client'

import { useState } from "react";
import { SearchIcon, Locate } from "lucide-react";
import Image from "next/image";
import CustomButton from "../CustomButton";
import { useRouter } from "next/navigation";

export default function Form() {
  const [city, setCity] = useState('')
  const router = useRouter()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/weather?searchCity=${city}`)
  }

  const handleCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        router.push(`/weather?lat=${lat}&lon=${lon}`)
      }, (error) => {
        console.error('Error getting location:', error.message)
      })
    }
  }

  return(
    <div className="bg-main shadow-lg hover:shadow-2xl p-5 pt-2 rounded-2xl hover:scale-102 ease-in transition-all lg:px-5 w-full">
      <div className="flex gap-3 justify-center my-7">
        <Image src="/weather-app-icon/partly-cloudy-day.svg" alt="Logo" width={90} height={90} />
        <h1 className="text-center text-2xl mt-5 font-mulish font-bold">WeaPredict</h1>
      </div>

      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2 w-full">
        <input required value={city} onChange={handleInput} type="text" placeholder="Input Location to Display" className="bg-neutral-200 focus:outline-highlight h-10 rounded-xl p-4 flex-1 shadow-lg text-xs md:text-lg min-w-0"/>
        <CustomButton leftIcon={<SearchIcon />} type="submit" variant="gradient" className="text-main shrink-0 text-xs md:text-lg">
          Search
        </CustomButton>
      </form>
      <CustomButton onClick={handleCurrentLocation} leftIcon={<Locate className="text-highlight"/>} type="button" className="w-full text-xs md:text-lg">
        Use Current Location
      </CustomButton>
    </div>
  )
}