const forecastWeatherInfo = (state =[], action) => {
    switch (action.type) {
        case "forecast_weather_Info":
            return action.payload
        default: return state;
    }
}
export default forecastWeatherInfo;