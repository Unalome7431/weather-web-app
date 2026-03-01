'use client'

import { useState } from "react";
import CustomButton from "./components/CustomButton";
import { SearchIcon, Locate } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
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

  return (
    <section className="flex flex-col items-center justify-center h-screen overflow-hidden bg-layer">
      <div className="bg-main shadow-lg hover:shadow-2xl p-5 pt-10 rounded-2xl hover:scale-102 ease-in transition-all lg:px-5">
        <div className="flex gap-3 justify-center mb-10">
          <Image src="/weather-app-icon/partly-cloudy-day.svg" alt="Logo" width={100} height={100} />
          <h1 className="text-center text-3xl mt-5 font-mulish font-bold">WeaPredict</h1>
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-1 mb-2 w-80 md:w-100">
          <input required type="text" placeholder="Input Location to Display" value={city} onChange={handleInput} className="bg-neutral-200 focus:outline-highlight h-10 rounded-xl p-4 w-full shadow-lg text-sm md:text-lg"/>
          <CustomButton leftIcon={<SearchIcon />} type="submit" variant="gradient" className="text-main">
            Search
          </CustomButton>
        </form>
        <CustomButton leftIcon={<Locate className="text-highlight"/>} type="button" onClick={handleCurrentLocation} className="w-full">
          Use Current Location
        </CustomButton>
      </div>
    </section>
  );
}
