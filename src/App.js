import React from "react";
import './App.css';
import { connect } from 'react-redux';
import loaderimg from './img/loader.gif';
import Header from './Header';
import { weatherInfo, forecastWeatherInfo } from './action/index';
import Aboutus from "./Aboutus";
import Weather_details from "./Weather_details";
import Footer from "./Footer";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      city: 'List of city',
      loader: false,
      prevCityName: '',
    }
    this.showAboutUs = this.showAboutUs.bind(this);
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
      setTimeout(() => { this.setState({ loader: false }) }, 500)
      if (data) {
        if (data.weather[0] && data.weather[0].description) {
          this.props.weatherInfo({ temp: data.main.temp, des: data.weather[0].description })
        }
      }
      const reso_forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3fbb2b31fd3e77c536be64abc677a4d1`);
      const data_forecast = await reso_forecast.json();
      if (data_forecast) {
        data_forecast.list.map(() => {
          this.props.forecastWeatherInfo({ fdata: data_forecast.list })
        })
      }
    }
  }
  showAboutUs() {
    this.setState({ show: !this.state.show })
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div className="main_div" style={{ position: 'relative' }}>
          <Header city={this.state.city} showcity={this.showcity} />
          <div style={{ display: 'flex' }}>
            {this.state.loader ? <div className="loader"><img src={loaderimg} /></div> : <Weather_details city={this.state.city} />}
          </div>
          <Footer showAboutUs={this.showAboutUs} />
        </div>
        {
          this.state.show && <Aboutus />
        }
      </div>
    );
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
