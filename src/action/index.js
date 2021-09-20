export const weatherInfo = (data) => {
    return (
        {
            type: "weather_Info",
            payload: data
        }
    )
}
export const forecastWeatherInfo = (temp) => {
    return (
        {
            type: "forecast_weather_Info",
            payload: temp

        }
    )
}