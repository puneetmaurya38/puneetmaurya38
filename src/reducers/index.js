import weatherInfo from './WeatherInfo';
import forecastWeatherInfo from './Forecast_weatherInfo';
import {combineReducers} from 'redux';
const rootReducer=combineReducers({ weatherInfo,forecastWeatherInfo })
export default rootReducer;