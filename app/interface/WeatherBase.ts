export interface WeatherBase {
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

export interface WeatherDays extends WeatherBase {
  description: string,
  tempmin: number,
  tempmax: number,
  hours: WeatherBase[]
}

export interface WeatherData {
  address: string,
  timezone: string,
  description: string,
  currentConditions: WeatherBase,
  days: WeatherDays[]
}