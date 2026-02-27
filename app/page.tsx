'use client'

import { useState } from "react";
import CustomButton from "./components/CustomButton";
import { SearchIcon } from "lucide-react";
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

  return (
    <section className="flex flex-col h-dvh justify-center items-center">
      <h1 className="bg-blue-500">WeaPredict</h1>

      <div className="bg-purple-400 flex gap-5 flex-col">
        <h2 className="bg-orange-400 text-center">Input Location to Display</h2>

        <form onSubmit={handleSearch} className="inline-flex items-center gap-2">
          <input required type="text" value={city} onChange={handleInput} />
          <CustomButton size="icon" type="submit">
            <SearchIcon />
          </CustomButton>
          <CustomButton>
            Use Current Location
          </CustomButton>
        </form>
      </div>
    </section>
  );
}
