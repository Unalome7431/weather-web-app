'use client'

import { useSearchParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import CustomSpinner from "../CustomSpinner"

export default function Weather() {
  const searchParams = useSearchParams()
  const searchedCity = searchParams.get('searchCity')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', searchedCity, lat, lon],
    queryFn: async () => {
      const endpoint = lat && lon
        ? `/api/weather?lat=${lat}&lon=${lon}`
        : `/api/weather?city=${searchedCity}`
      
      const response = await axios.get(endpoint)
      return response.data
    },
    enabled: !!searchedCity || (!!lat && !!lon)
  })

  if (!searchedCity && (!lat && !lon)) return <div>Location not found</div>
  if (isLoading) {
    return (
      <div className="h-dvh flex flex-col gap-2 justify-center items-center"> 
        <CustomSpinner />
        Loading
      </div>
    )
  }
  if (error) return <div>Error occured</div>

  return (
    <div>
      
    </div>
  )
}