import { Suspense } from "react";
import Weather from "../components/weather/Weather";

export default function WeatherPage() {
  return(
    <Suspense>
      <div className="">
        <div className="bg-layer h-full p-3">
          <Weather />
        </div>
      </div>
    </Suspense>
  )
}