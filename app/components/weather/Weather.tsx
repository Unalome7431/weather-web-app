'use client'

import { useSearchParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import { WeatherData } from "@/app/interface/WeatherBase"
import CustomSpinner from "../CustomSpinner"
import WeatherPhone from "./WeatherPhone"
import WeatherWeb from "./WeatherWeb"

export default function Weather() {
  const searchParams = useSearchParams()
  const searchedCity = searchParams.get('searchCity')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  const { data, isLoading, error } = useQuery<WeatherData>({
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
  if (!data) return null

  const next2DaysData = [...data.days[0].hours, ...data.days[1].hours]
  const currentHourString = new Date().getHours().toString().padStart(2, '0') + ':00:00'

  const startIndex = next2DaysData.findIndex(h => h.datetime === currentHourString)
  const rolling24HoursData = next2DaysData.slice(startIndex, startIndex + 24)

  let uvindex = ''

  if (data.currentConditions.uvindex < 3) {
    uvindex = 'Low'
  } else if (data.currentConditions.uvindex < 6) {
    uvindex = 'Moderate'
  } else if (data.currentConditions.uvindex < 8) {
    uvindex = 'High'
  } else if (data.currentConditions.uvindex < 11) {
    uvindex = 'Very High'
  } else if (data.currentConditions.uvindex >= 11) {
    uvindex = 'Extreme'
  }
  
  return (
    <>
      <WeatherPhone data={data} rolling24HoursData={rolling24HoursData} uvindex={uvindex} searchedCity={searchedCity ?? undefined} />
      <WeatherWeb data={data} rolling24HoursData={rolling24HoursData} uvindex={uvindex} searchedCity={searchedCity ?? undefined} />
    </>
  )
}