import { Suspense } from "react";
import Weather from "../components/weather/Weather";

export default function WeatherPage() {
  return(
    <Suspense>
      <div className="bg-layer overflow-x-hidden h-screen p-3">
        <Weather />
      </div>
    </Suspense>
  )
}