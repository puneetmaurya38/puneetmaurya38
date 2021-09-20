import React from 'react';
import { weatherInfo, forecastWeatherInfo } from './action/index';
import { connect } from 'react-redux';
import './index.css';

const Weather_details = (props) => {
    return (
        <div className="cards">
           <div className="card">
                  <h3 className="text">Current Weather Data</h3>
                  <p>{props.city === 'List of city' ? " " :props.city}</p>
                  <p>{props.des}</p>
                  <p>{props.temp}</p>
                </div>
                <div className="card" id="forecast">
                  <h3>5-Day Forecast</h3>
                  {
                    props.fdata && props.fdata.map((value, index) => {
                      if (index % 8 === 0) {
                        var dd = parseInt(index / 8) + 1;
                        return (<>
                          <h3>Day {dd}</h3>
                          <p>{value.main.feels_like}°F</p>
                        </>)

                      }
                      else {
                        return (
                          <>
                            <p>{value.main.feels_like}°F</p>
                          </>
                        )
                      }
                    })

                  }

                </div> 
        </div>
    )
}
function mapStateToProps(state) {
    return {
      temp: state.weatherInfo.temp + '°F',
      des: state.weatherInfo.des,
      fdata: state.forecastWeatherInfo.fdata
    };
  }
  const mapDispatchToProps = {
    weatherInfo, forecastWeatherInfo
  }

export default  connect(mapStateToProps, mapDispatchToProps)(Weather_details)
