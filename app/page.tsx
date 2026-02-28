'use client'

import { useState } from "react";
import CustomButton from "./components/CustomButton";
import { SearchIcon, Locate } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <section className="flex flex-col items-center justify-center h-dvh bg-linear-to-br from-20% via-60% to-90% from-yellow-100 via-blue-400 to-blue-600">
      <h1 className="text-center mt-auto mb-10">WeaPredict</h1>
      <div className="bg-neutral-400/20 border-2 border-neutral-200/70 p-5 pt-10 rounded-2xl mb-[40dvh]">
        <div className="flex gap-5 flex-col">
          <h2 className="text-center">Input Location to Display</h2>

          <form onSubmit={handleSearch} className="flex flex-col items-center gap-1">
            <input required type="text" value={city} onChange={handleInput} className="bg-neutral-100 h-10 rounded-2xl p-2 w-full"/>
            <CustomButton leftIcon={<SearchIcon />} type="submit">
              Search
            </CustomButton>
          </form>
          <CustomButton leftIcon={<Locate />} type="button" onClick={handleCurrentLocation}>
            Use Current Location
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
