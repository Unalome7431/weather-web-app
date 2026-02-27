import { Suspense } from "react";
import Weather from "../components/weather/Weather";

export default function WeatherPage() {

  return(
    <Suspense>
      <div>
        <Weather />
      </div>
    </Suspense>
  )
}