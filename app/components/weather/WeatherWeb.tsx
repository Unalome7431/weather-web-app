import Image from "next/image"
import { Cloudy, SunMedium, Droplets, Wind, Sunrise, Sunset } from "lucide-react"
import { WeatherData, WeatherBase } from "@/app/interface/WeatherBase"
import Form from "./Form"

interface WeatherProps {
  data: WeatherData,
  rolling24HoursData: WeatherBase[],
  uvindex: string
  searchedCity?: string
}

export default function WeatherWeb({ data, rolling24HoursData, uvindex, searchedCity }: WeatherProps) {

  return (
    <div className="lg:grid grid-cols-2 grid-rows-[auto_1fr_auto] hidden gap-6 h-full m-3 mb-10">

      {/* Row 1, Col 1: Form */}
      <Form />

      {/* Row 1, Col 2: Sun Cycle */}
      <div className="flex flex-col bg-main shadow-lg hover:shadow-2xl p-5 rounded-2xl hover:scale-102 ease-in transition-all">
        <span className="font-bold">Sun Cycle</span>
        <div className="flex justify-evenly mt-2 flex-1 items-center">
          <div className="flex flex-col gap-2 items-center">
            <Sunrise className="size-20 text-yellow-400" />
            <div className="flex flex-col items-center">
              <span>Sunrise</span>
              <span className="text-lg font-semibold">{data.currentConditions.sunrise.slice(0, -3)}</span>
            </div>
          </div>
          <div className="border border-neutral-300 self-stretch"></div>
          <div className="flex flex-col gap-2 items-center">
            <Sunset className="size-20 text-red-400" />
            <div className="flex flex-col items-center">
              <span>Sunset</span>
              <span className="text-lg font-semibold">{data.currentConditions.sunset.slice(0, -3)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2, Col 1: Current Weather */}
      <div className="flex bg-main shadow-lg hover:shadow-2xl p-5 rounded-2xl hover:scale-102 ease-in transition-all">
        <div className="flex flex-col basis-1/2 items-center">
          <span className="font-bold text-2xl text-center">{searchedCity ? data.address : 'Currect Location'}</span>
          <span className="text-highlight text-lg text-center">{data.currentConditions.conditions}</span>

          <Image src={`/weather-app-icon/${data.currentConditions.icon}.svg`} alt={"weather-icon"} width={0} height={0} className="mt-9 mb-3 size-22" />
          <span className="text-3xl font-semibold">{data.currentConditions.temp}ºC</span>

          <span className="w-full bg-neutral-200 rounded-xl p-3 text-justify text-[1vw] mt-auto">{data.description}</span>
        </div>
        <div className="border mx-5 border-neutral-300"></div>
        <div className="basis-1/2 flex flex-col">
          <span className="text-xl my-2">Feels like:</span>
          <span className="text-2xl">{data.currentConditions.feelslike}ºC</span>
          <div className="flex flex-col justify-around h-full">
            <div className="flex items-center gap-3">
              <Cloudy className="shrink-0 bg-highlight/30 size-10 p-1 rounded-2xl text-highlight" />
              <div className="text-lg w-full flex-row justify-between flex">
                <span >Cloudiness:</span>
                <span>{data.currentConditions.cloudcover}%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SunMedium className="shrink-0 bg-highlight/30 size-10 p-1 rounded-2xl text-highlight" />
              <div className="text-lg w-full flex-row justify-between flex">
                <span >UV Index:</span>
                <span className="text-end">{uvindex}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="shrink-0 bg-highlight/30 size-10 p-1 rounded-2xl text-highlight" />
              <div className="text-lg w-full flex-row justify-between flex">
                <span >Humidity:</span>
                <span>{data.currentConditions.humidity.toFixed()}%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="shrink-0 bg-highlight/30 size-10 p-1 rounded-2xl text-highlight" />
              <div className="text-lg w-full flex-row justify-between flex">
                <span >Wind:</span>
                <span>{data.currentConditions.windspeed}km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2, Col 2: 7-Day Forecast */}
      <div className="flex flex-col bg-main shadow-lg hover:shadow-2xl p-5 rounded-2xl hover:scale-102 ease-in transition-all">
        <span className="font-bold">7-Day Forecast</span>
        <div className="flex flex-col flex-1 justify-around">
          {data.days.map(day => {
            const dayDate = new Date(day.datetime)
            const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(dayDate)

            return (
              <div className="flex justify-between items-center">
                <span className="text-md text-highlight">{dayName}</span>
                
                <div className="flex items-center gap-5">
                  <Image src={`/weather-app-icon/${day.icon}.svg`} alt={"weather-icon"} width={0} height={0} className="my-2 size-8" />
                  <span className="text-md font-semibold w-15 text-end">{day.temp}ºC</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Row 3, Col span 2: 24-Hour Forecast */}
      <div className="flex flex-col bg-main shadow-lg hover:shadow-2xl p-5 pb-3 rounded-2xl hover:scale-102 ease-in transition-all col-span-2">
        <span className="font-bold">24-Hour Forecast</span>
        <div className="flex mt-3 overflow-x-auto overflow-y-hidden gap-10 pb-2">
          {rolling24HoursData.map(hour => {
            return (
              <div className="flex flex-col items-center">
                <span className="text-sm text-highlight">{hour.datetime.slice(0, -3)}</span>
                <Image src={`/weather-app-icon/${hour.icon}.svg`} alt={"weather-icon"} width={0} height={0} className="my-2 size-10" />
                <span className="text-sm font-semibold">{hour.temp}ºC</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}