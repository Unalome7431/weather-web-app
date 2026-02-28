export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  const locationIdentifier = lat && lon
    ? `${lat},${lon}`
    : city

  if (!locationIdentifier) {
    return Response.json(
      { error: 'Please provide a location' },
      { status: 400 }
    )
  }

  const API_KEY = process.env.WEATHER_API_KEY

  if (!API_KEY) {
    console.error('WEATHER_API_KEY is not defined in environment variables')
    return Response.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationIdentifier}?unitGroup=metric&key=${API_KEY}&contentType=json`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Weather API error:', errorText)
      return Response.json(
        { error: `Weather API returned ${response.status}: ${response.statusText}` },
        { status: response.status }
      )
    }

    const weatherData = await response.json()
    return Response.json(weatherData)

  } catch (error) {
    console.error('Fetch error:', error)
    return Response.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}