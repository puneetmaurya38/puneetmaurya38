import React from "react";
import './App.css';
import Select from 'react-select';
import { connect } from 'react-redux';
// import { bindActionCreators } from "redux";
import loaderimg from './img/loader.gif';
import citydata from './City.jsx';
import { weatherInfo, forecastWeatherInfo } from './action/index';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      city: 'List of city',
      loader: false,
      prevCityName: '',
      //currTime='',
    }
    
   // console.log(currTime);
  }
 
  componentDidMount() {
   this.showcity();
  }
  showcity = async (e) => {
    const cityName = (e && e.label) ? e.label : 'pune';
    this.setState({ city: cityName })
    this.setState({ prevCityName: cityName })
    if (this.state.prevCityName !== cityName) {
      this.setState({ loader: true })
      const reso = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3fbb2b31fd3e77c536be64abc677a4d1`);
      const data = await reso.json();
      setTimeout(() => { this.setState({ loader: false }) }, 1000)
      if (data) {
        if (data.weather[0] && data.weather[0].description) {
          // this.setState({ des: data.weather[0].description })
          // this.setState({ temp: data.main ? data.main.temp + '°F' : "" })
          this.props.weatherInfo({ temp: data.main.temp, des: data.weather[0].description })

        }
      }
      const reso_forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3fbb2b31fd3e77c536be64abc677a4d1`);
      const data_forecast = await reso_forecast.json();
      if (data_forecast) {
        data_forecast.list.map(() => {
          //this.setState({ fdata: data_forecast.list })
          this.props.forecastWeatherInfo({ fdata: data_forecast.list })
        })
      }
    }
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div className="main_div" style={{ position: 'relative' }}>
          <div>
            <h1>Select City</h1>
            <Select options={citydata} className="select" type="text" placeholder={this.state.city} value={this.state.city} onChange={this.showcity} />
          </div>
          <div style={{ display: 'flex' }}>
            {this.state.loader ? <div className="loader"><img src={loaderimg} /></div> :
              <React.Fragment>
                <div className="card">
                  <h3 className="text">Current Weather Data</h3>
                  <p>{this.state.city === 'List of city' ? " " : this.state.city}</p>
                  <p>{this.props.des}</p>
                  <p>{this.props.temp}</p>
                </div>
                <div className="card" id="forecast">
                  <h3>5-Day Forecast</h3>
                  {
                    this.props.fdata && this.props.fdata.map((value, index) => {
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
              </React.Fragment>
            }
          </div>
          <button className="aboutbtn" onClick={() => this.setState({ show: !this.state.show })} > About Us</button>
        </div>

        {
          this.state.show &&
          <div className="about">
            <h3>About Us Information</h3>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.</p>

          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state.forecastWeatherInfo.fdata)
  return {
    temp: state.weatherInfo.temp + '°F',
    des: state.weatherInfo.des,
    fdata: state.forecastWeatherInfo.fdata
  };
}
const mapDispatchToProps = {
  weatherInfo, forecastWeatherInfo
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
