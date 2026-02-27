'use client'

import { useSearchParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import CustomSpinner from "../CustomSpinner"

export default function Weather() {
  const searchParams = useSearchParams()
  const searchedCity = searchParams.get('searchCity')

  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', searchedCity],
    queryFn: async () => {
      const response = await axios.get(`/api/weather?city=${searchedCity}`)
      return response.data
    },
    enabled: !!searchedCity
  })

  if (!searchedCity) return <div>There is no such city</div>
  if (isLoading) return <div> <CustomSpinner /> </div>
  if (error) return <div>Error occured</div>

  return (
    <div>

    </div>
  )
}