import React, { Component } from 'react';
import classes from './Weather.module.css';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';
import Config from '../../containers/Config/Config';

class WeatherData extends Component {
    state = {
        showSpinner: true,
        locationAvailable: this.props.location === 'NO_LOCATION' ? false : true,
        dataAvailable: false,
        defaultUnit: true, 
        showErrorMessage: false,
        renderAgain: true,
        currentTemp: null,
        daily: []
    }
    
    getWeatherInfo = (showErrorMessage) => {
        if (showErrorMessage) {
            this.setState({ 
                showSpinner: false,
                showErrorMessage: true,
                renderAgain: false 
            })
        } else {
            const link = `${Config.Proxy}https://api.darksky.net/forecast/${Config.DarkSky.key}/${this.props.location.lat},${this.props.location.lng}?exclude=minutely,hourly,alerts,flags&units=ca`
            axios.get(link)
            .then(res => {
                console.log('darksky response', res)
                if (res.status === 200 && res.data.longitude && res.data.latitude) {
                    this.setState({ 
                        showSpinner: false,
                        dataAvailable: true,
                        showErrorMessage: false,
                        renderAgain: false,
                        currentTemp: res.data.currently.temperature.toFixed(0),
                        daily: [...res.data.daily.data],
                    })
                } else { 
                    this.setState({
                        renderAgain: false, 
                        showSpinner: false, 
                        showErrorMessage: true
                    }) 
                }
            })
            .catch(err => {
                console.log('Weather data not available.', err);
                this.setState({ 
                    renderAgain: false, 
                    showSpinner: false, 
                    showErrorMessage: true
                })
            })
        }  
    }

    changeUnitHandler = () => {
        this.setState(prevState => (
            { defaultUnit: !prevState.defaultUnit }
        ))
    }

    dayFormatter = day => {
        if (day === 0) day = 'Sun';
        if (day === 1) day = 'Mon';
        if (day === 2) day = 'Tue';
        if (day === 3) day = 'Wed';
        if (day === 4) day = 'Thu';
        if (day === 5) day = 'Fri';
        if (day === 6) day = 'Sat';
        return day;
    }

    render() {
        const showSpinner = this.state.showSpinner ? <Spinner darkMode={this.props.darkMode} weather /> : null;
        let weatherHeading = <p className={classes.WeatherHeading} style={{justifyContent: 'center'}}>Current Local Weather</p>;
        let bottomLink = '',   daily = '';
        let errorMessage = (
            <p className={classes.NoData} >
                Weather data not available. Please click
                &nbsp;
                <span className={classes.OtherLinks} onClick={() => this.props.clicked(null)}>here</span>
                &nbsp;
                to get weather information manually.
            </p>
        );

        if (this.state.locationAvailable && this.state.renderAgain) {
            if (this.props.location) {
                if (this.props.location === 'NO_LOCATION') {
                    this.getWeatherInfo(true)
                } else if (this.props.location.lat && this.props.location.lng) {
                    this.getWeatherInfo(false)
                }
            } 
        } 

        if (this.props.location === 'NO_LOCATION') {
            errorMessage = (
                <p className={classes.NoData} >
                    Location access not granted. Please permit location access and reload the page. Or click
                    &nbsp;
                    <span className={classes.OtherLinks} onClick={() => this.props.clicked(null)}>here</span>
                    &nbsp;
                    to get weather information manually.
                </p>
            );
        }

        if (!this.state.showSpinner && this.state.dataAvailable) {
            const locData = {
                lat: this.props.location.lat,
                lng: this.props.location.lng,
                cityName: this.props.location.cityName
            }

            bottomLink = (
                <p className={classes.BottomLink}
                    onClick={() => this.props.clicked(locData)}
                    information={locData.lat + ',' + locData.lng + ',' + this.props.location.cityName}>
                    See more
                </p>
            )

            weatherHeading = (
                <p className={classes.WeatherHeading} style={{justifyContent: 'space-between'}}>
                    <span style={{ fontWeight: 'bold' }}>{this.props.location.cityName}</span>
                    <span className={classes.CurrentTemperature} onClick={this.changeUnitHandler}>
                        <i className="fas fa-exchange-alt" style={{ fontSize: '11px'}}></i>
                        &nbsp;
                        {this.state.defaultUnit ? this.state.currentTemp : Math.round((this.state.currentTemp * 1.8) + 32)}
                        &deg;
                        {this.state.defaultUnit ? 'C' : 'F'}
                    </span>
                </p>
            );

            daily = this.state.daily.map((el, index) => {
                const highTemp = this.state.defaultUnit ? el.temperatureHigh.toFixed(0) : Math.round((el.temperatureHigh * 1.8) + 32);
                const lowTemp = this.state.defaultUnit ? el.temperatureLow.toFixed(0) : Math.round((el.temperatureLow * 1.8) + 32);
                const unit = this.state.defaultUnit ? 'C' : 'F'
                let day = new Date(el.time * 1000).getDay();
                day = this.dayFormatter(day)
                if (index < 6) {
                    return (
                        <div className={classes.DailyWeather} key={day}>
                            <p className={classes.DayInfo}>{day}</p>
                            <p className={classes.TempInfo}>High: {highTemp}&deg;{unit}<br></br>Low: {lowTemp}&deg;{unit}</p>
                        </div>
                    )
                } else return null;
            })
        }

        return (
            <div className={classes.Weather}>
                {showSpinner}
                {weatherHeading}
                {this.state.showErrorMessage ? errorMessage : null}
                <div className={classes.DailyWeatherContainer}>
                    {daily}
                </div>
                {this.state.showErrorMessage ? null : bottomLink}
            </div>
        );
    }
};

export default WeatherData;