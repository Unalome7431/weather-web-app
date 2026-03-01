'use client'

import { useSearchParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import Image from "next/image"
import { Cloudy, SunMedium, Droplets, Wind, Sunrise, Sunset } from "lucide-react"
import CustomSpinner from "../CustomSpinner"
import Form from "./Form"

interface WeatherBase {
  cloudcover: number,
  conditions: string,
  datetime: string,
  feelslike: number,
  humidity: number,
  icon: string,
  sunrise: string,
  sunset: string,
  temp: number,
  uvindex: number,
  windspeed: number
}

interface WeatherDays extends WeatherBase {
  description: string,
  tempmin: number,
  tempmax: number,
  hours: WeatherBase[]
}

interface WeatherData {
  address: string,
  timezone: string,
  description: string,
  currentConditions: WeatherBase,
  days: WeatherDays[]
}

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

  return (
    <div className="w-full min-w-3xs max-w-3xl mx-auto flex flex-col items-center gap-3">
      <Form />

      <div className="w-full flex bg-main shadow-lg hover:shadow-2xl p-5 rounded-2xl hover:scale-102 ease-in transition-all lg:px-5">
        <div className="flex flex-col basis-1/2 items-center">
          <span className="font-bold text-xl tn:text-2xl text-center">{searchedCity ? data.address : 'Currect Location'}</span>
          <span className="tn:text-xl text-highlight text-center">{data.currentConditions.conditions}</span>

          <Image src={`/weather-app-icon/${data.currentConditions.icon}.svg`} alt={"weather-icon"} width={0} height={0} className="mt-10 mb-5 size-20 tn:size-25" />
          <span className="tn:text-4xl text-3xl mb-10 font-semibold">{data.currentConditions.temp}ºC</span>

          <span className="w-full bg-neutral-200 rounded-xl p-3 text-justify text-xs tn:text-sm">{data.description}</span>
        </div>
        <div className="border mx-5 border-neutral-300"></div>
        <div className="basis-1/2 flex flex-col">
          <span className="text-xl my-2">Feels like:</span>
          <span className="text-2xl">{data.currentConditions.feelslike}ºC</span>
          <div className="flex flex-col justify-around h-full">
            <div className="flex items-center gap-3">
              <Cloudy className="shrink-0 bg-highlight/30 size-10 tn:size-12 p-1 rounded-2xl text-highlight" />
              <div className="text-md tn:text-xl w-full flex-row justify-between stn:flex">
                <span >Cloudiness:</span>
                <br className="stn:hidden"/>
                <span>{data.currentConditions.cloudcover}%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SunMedium className="shrink-0 bg-highlight/30 size-10 tn:size-12 p-1 rounded-2xl text-highlight" />
              <div className="text-md tn:text-xl w-full flex-row justify-between stn:flex">
                <span >UV Index:</span>
                <br className="stn:hidden"/>
                <span>{data.currentConditions.uvindex < 51 ? 'Low' : 'High'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="shrink-0 bg-highlight/30 size-10 tn:size-12 p-1 rounded-2xl text-highlight" />
              <div className="text-md tn:text-xl w-full flex-row justify-between stn:flex">
                <span >Humidity:</span>
                <br className="stn:hidden"/>
                <span>{data.currentConditions.humidity.toFixed()}%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="shrink-0 bg-highlight/30 size-10 tn:size-12 p-1 rounded-2xl text-highlight" />
              <div className="text-md tn:text-xl w-full flex-row justify-between stn:flex">
                <span >Wind:</span>
                <br className="stn:hidden"/>
                <span>{data.currentConditions.windspeed}km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col bg-main shadow-lg hover:shadow-2xl p-5 rounded-2xl hover:scale-102 ease-in transition-all lg:px-5">
        <span className="font-bold">24-Hour Forecast</span>
        <div className="flex mt-3 overflow-scroll overflow-y-hidden gap-10 pb-2">
          {rolling24HoursData.map(hour => {
            return (
              <div className="flex flex-col items-center">
                <span className="tn:text-lg text-md text-highlight">{hour.datetime.slice(0, -3)}</span>
                <Image src={`/weather-app-icon/${hour.icon}.svg`} alt={"weather-icon"} width={0} height={0} className="my-2 size-10 tn:size-12" />
                <span className="tn:text-lg text-md font-semibold">{hour.temp}ºC</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-full flex flex-col bg-main shadow-lg hover:shadow-2xl p-5 rounded-2xl hover:scale-102 ease-in transition-all lg:px-5">
        <span className="font-bold">7-Day Forecast</span>
        <div className="flex flex-col stn:hidden">
          {data.days.map(day => {
            const dayDate = new Date(day.datetime)
            const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(dayDate)

            return (
              <div className="flex justify-between items-center">
                <span className="tn:text-lg text-md text-highlight">{dayName}</span>
                
                <div className="flex items-center gap-5">
                  <Image src={`/weather-app-icon/${day.icon}.svg`} alt={"weather-icon"} width={0} height={0} className="my-2 size-8 tn:size-10" />
                  <span className="tn:text-lg text-md font-semibold">{day.temp}ºC</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="hidden justify-evenly stn:flex">
          {data.days.map(day => {
            const dayDate = new Date(day.datetime)
            const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'short'}).format(dayDate)

            return (
              <div className="flex flex-col items-center mt-3 gap-1 pb-2">
                <span className="tn:text-lg text-md text-highlight">{dayName}</span>
                <Image src={`/weather-app-icon/${day.icon}.svg`} alt={"weather-icon"} width={0} height={0} className="my-2 size-10 tn:size-12" />
                <span className="tn:text-lg text-md font-semibold">{day.temp}ºC</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-full flex flex-col bg-main shadow-lg hover:shadow-2xl p-5 rounded-2xl hover:scale-102 ease-in transition-all lg:px-5">
        <span className="font-bold">Sun Cycle</span>
        <div className="flex justify-evenly mt-5">
          <div className="flex flex-col gap-4">
            <Sunrise className="size-18 tn:size-20 text-yellow-400" />
            <div className="flex flex-col items-center">
              <span>Sunrise</span>
              <span className="text-xl tn:text-2xl font-semibold">{data.currentConditions.sunrise.slice(0, -3)}</span>
            </div>
          </div>
          <div className="border border-neutral-300"></div>
          <div className="flex flex-col gap-4">
            <Sunset className="size-18 tn:size-20 text-red-400" />
            <div className="flex flex-col items-center">
              <span>Sunset</span>
              <span className="text-xl tn:text-2xl font-semibold">{data.currentConditions.sunset.slice(0, -3)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}