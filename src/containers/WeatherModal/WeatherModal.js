import React, { Component} from 'react';
import classes from './WeatherModal.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import Config from '../Config/Config';
import Input from '../../components/UI/Input/Input';
import Chart from '../../components/Chart/Chart';

class WeatherModal extends Component {
    state = {
        showSpinner: true,
        dataAvailable: false,
        defaultUnits: true,
        locationProvided: this.props.modalData ? true : false,
        locLat: this.props.modalData ? this.props.modalData.lat : null,
        locLng: this.props.modalData ? this.props.modalData.lat : null,
        renderAgain: true,
        errorMessage: null,
        searchResultData: null,
        externalLink: null,
        detailedDataType: 'hourly',
        modalData: null
    }

    renderWeatherData = (data, cityName) => {
        let link = null;

        if (!this.state.locationProvided) {
            this.setState({ 
                renderAgain: false,
                searchResultData: null,
                showSpinner: false,
                errorMessage: null
            })
            return
        } else if (this.state.locLat && this.state.locLng) {
            link = `${Config.Proxy}https://api.darksky.net/forecast/${Config.DarkSky.key}/${this.props.modalData.lat},${this.props.modalData.lng}?exclude=minutely,alerts,flags&units=ca`;
        }
        
        if (data) {
            link = `${Config.Proxy}https://api.darksky.net/forecast/${Config.DarkSky.key}/${data.lat},${data.lng}?exclude=minutely,alerts,flags&units=ca`;
        }

        if (link) {
            axios.get(link)
            .then(res => {
                if (res.status === 200 && res.data.longitude && res.data.latitude) {
                    this.setState({ 
                        showSpinner: false,
                        locationProvided: true,
                        dataAvailable: true,
                        renderAgain: false,
                        externalLink: `https://darksky.net/forecast/${res.data.latitude},${res.data.longitude}/ca12/en`,
                        modalData: {
                            cityName: data ? cityName : this.props.modalData.cityName,
                            current: res.data.currently,
                            daily: res.data.daily,
                            hourly: res.data.hourly
                        }
                    })
                } else {
                    this.setState({ 
                        renderAgain: false, 
                        searchResultData: null, 
                        locationProvided: true,
                        showSpinner: false, 
                        errorMessage: 'Weather servers not available at the moment, please try again later.'
                    })
                }
            })
            .catch(err => {
                console.log('Weather data not available.', err);
                this.setState({ 
                    renderAgain: false, 
                    locationProvided: true,
                    searchResultData: null, 
                    showSpinner: false, 
                    errorMessage: 'Weather servers not available at the moment, please try again later.' })
            })
        } else {
            this.setState({ 
                renderAgain: false,
                locationProvided: true,
                searchResultData: null, 
                showSpinner: false, 
                errorMessage: null
            })
        }
    }

    prepareForData = (value, name) => {
        this.setState({
            showSpinner: true, 
            dataAvailable: false,
            errorMessage: null,
            searchResultData: null,
            modalData: null
        })
        this.renderWeatherData(value, name);
    }

    getLocationCoords = query => {
        axios.get('https://api.opencagedata.com/geocode/v1/json?key=' + Config.OpenCage.key + '&q=' + query.target.value)
        .then(response => { 
            if (response.data.total_results !== 0) {
                let resData = [];
                resData = response.data.results.map((el, index) => {
                    const loc = {
                        lat: el.geometry.lat,
                        lng: el.geometry.lng
                    }
                    while (index < 5) {
                        return (
                            <p 
                                className={classes.Results} 
                                onClick={() => this.prepareForData(loc, el.formatted)}
                                key={loc.lat + ',' + loc.lng + '-' + index}>
                                {el.formatted}
                            </p>
                        )
                    }
                });
                this.setState({ locationProvided: true, searchResultData: resData, showSpinner: false })
            }

            if (response.status !== 200) {
                this.setState({ 
                    locationProvided: true, 
                    errorMessage: 'Server not available at the moment. Please try again later.', 
                    showSpinner: false, 
                    dataAvailable: false
                })
            }

            if (response.status === 200 && response.data.total_results === 0) {
                this.setState({ 
                    locationProvided: true,
                    errorMessage: 'No location found. Please try another term.', 
                    showSpinner: false,
                    dataAvailable: false
                })
            }
        })
        .catch(err => {
            console.log('Error is: ' + err);
            this.setState({ 
                locationProvided: true,
                showResults: true, 
                error: 'Server not available at the moment. Please try again later.', 
                showSpinner: false, 
                city: null 
            }) 
        });
    }

    unitConverter = (type, value) => {
        if (this.state.defaultUnits && type !== 'string') {
            return Math.round(value);
        } else if (this.state.defaultUnits && type === 'string') {
            return value;
        } else {
            if (type === 'temp') {
                return Math.round((value * 1.8) + 32);
            }
            if (type === 'travel') {
                return Math.round(value / 1.609);
            }
            if (type === 'string') {
                if (value === 'km/h') return 'mph';
                if (value === 'km') return 'mi';
                if (value === 'C') return 'F';
            }
        }
    }

    unitsHandler = () => {
        this.setState({ defaultUnits: !this.state.defaultUnits })
    }

    getDayName = day => {
        switch (day) {
            case 0:
                day = 'Sun';
                break;
            case 1:
                day = 'Mon';
                break;
            case 2:
                day = 'Tue';
                break;
            case 3:
                day = 'Wed';
                break;
            case 4:
                day = 'Thu';
                break;
            case 5:
                day = 'Fri';
                break;
            case 6:
                day = 'Sat';
                break;
            default:
                break;
        }
        return day;
    }

    get12HrTime = time => {
        if (time > 12) time = time - 12;
        if (time === 0) time = 12;
        return time;
    }

    keyPressHandler = key => {
        if (key.keyCode === 13) {
            this.setState({ showSpinner: true, dataAvailable: false, errorMessage: null})
            this.getLocationCoords(key);
        }
    }

    changeDetailedDataType = () => {
        if (this.state.detailedDataType === 'hourly') this.setState({ detailedDataType: 'daily' })
        if (this.state.detailedDataType === 'daily') this.setState({ detailedDataType: 'hourly' })
    }

    generateDetailedData = (values, primData, secData, dataAxisValues, axisHighest, axisLowest, primDataLegend, secDataLegend) => {
        return (
            <div className={classes.DetailedData}>
                <h1>{values.cityName}</h1>
                <p className={classes.CurrentCondition}>{values.current.summary}</p>
                <p className={classes.CurrentTemp}>
                    Current:&nbsp;&nbsp;
                    {this.unitConverter('temp', values.current.temperature)}
                    <span>&deg;{this.unitConverter('string', 'C')}</span>
                </p>
                <p className={classes.CurrentTemp}>
                    Feels:&nbsp;&nbsp;
                    {this.unitConverter('temp', values.current.apparentTemperature)}
                    <span>&deg;{this.unitConverter('string', 'C')}</span>
                </p>

                <div className={classes.SecondaryData}>
                    <div>
                        <p>Humidity</p>
                        <p>{Math.round((values.current.humidity) * 100)}<span>%</span></p>
                    </div>
                    <div>
                        <p>Visibility</p>
                        <p>{this.unitConverter('travel', values.current.visibility)}<span>{this.unitConverter('string', 'km')}</span></p>
                    </div>
                    <div>
                        <p>Speed</p>
                        <p>{this.unitConverter('travel', values.current.windSpeed)}<span>{this.unitConverter('string', 'km/h')}</span></p>
                    </div>
                    <div>
                        <p>UV</p>
                        <p>{(values.current.uvIndex).toFixed(1)}</p>
                    </div>
                </div>

                <div className={classes.NextWeather}>
                    <p>What's Next<span style={{ fontSize: '11px', display: 'block' }}>Hover/Click over chart to view details</span></p>
                    <Chart darkMode={this.props.darkMode} highestY={axisHighest} lowestY={axisLowest} primData={primData} secData={secData} dataX={dataAxisValues} primDataLegend={primDataLegend} secDataLegend={secDataLegend} unit={this.state.defaultUnits ? <span>&deg;C</span> : <span>&deg;F</span>}/>
                </div>
                <p className={classes.BottomText}>
                    Showing {this.state.detailedDataType}. Click <span className={classes.Link} onClick={this.changeDetailedDataType}>here</span> to show {this.state.detailedDataType === 'hourly' ? 'daily' : 'hourly'} instead
                    <br></br>
                    More details on <a className={classes.Link} href={this.state.externalLink} target="_blank" rel="noopener noreferrer">DarkSky</a></p>
            </div>
        );
    }

    render () {
        if (this.state.renderAgain) {
            this.renderWeatherData()
        }

        const showSpinner = this.state.showSpinner ? <Spinner darkMode={this.props.darkMode} weather="true" /> : null;
        const searchResults = this.state.searchResultData ? this.state.searchResultData : null;
        const values = this.state.modalData ? this.state.modalData : null;
        const errorMessage = this.state.errorMessage ? <h2 style={{ marginTop: '10px' }}>{this.state.errorMessage}</h2> : null;
        const primDataLegend = this.state.detailedDataType === 'hourly' ? 'Temp' : 'High';
        const secDataLegend = this.state.detailedDataType === 'hourly' ? 'Feel' : 'Low';
        const maxLoopVal = this.state.detailedDataType === 'hourly' ? 12 : 10;

        let primData = [], secData = [], dataAxisValues = [], axisHighest, axisLowest;
        let detailedData = null, axisValue = null;
        
        if (values && this.state.dataAvailable) {
            if (this.state.detailedDataType === 'hourly') {
                values.hourly.data.map((value, index) => {
                    if (index < 12) {
                        axisValue = new Date(value.time * 1000).getHours();
                        primData.push(this.unitConverter('temp', value.temperature));
                        dataAxisValues.push(axisValue < 12 ? '0' + axisValue : axisValue);
                        secData.push(this.unitConverter('temp', value.apparentTemperature));
                    }
                });
            } else {
                values.daily.data.map((value, index) => {
                    if (index < 10) {
                        axisValue = new Date(value.time * 1000).getDay();
                        primData.push(this.unitConverter('temp', value.temperatureHigh));
                        secData.push(this.unitConverter('temp', value.temperatureLow));
                        if (axisValue === 0) dataAxisValues.push('Su');
                        if (axisValue === 1) dataAxisValues.push('Mo');
                        if (axisValue === 2) dataAxisValues.push('Tu');
                        if (axisValue === 3) dataAxisValues.push('We');
                        if (axisValue === 4) dataAxisValues.push('Th');
                        if (axisValue === 5) dataAxisValues.push('Fr');
                        if (axisValue === 6) dataAxisValues.push('Sa');
                    }
                });
            }

            axisHighest = axisLowest = primData[0];
            
            for (let i = 0; i < maxLoopVal; i++) {
                if (primData[i] > axisHighest) axisHighest = primData[i];
                if (secData[i] > axisHighest) axisHighest = secData[i];
                if (primData[i] < axisLowest) axisLowest = primData[i];
                if (secData[i] < axisLowest) axisLowest = secData[i];
            }
            detailedData = this.generateDetailedData(values, primData, secData, dataAxisValues, axisHighest, axisLowest, primDataLegend, secDataLegend)
        }

        return (
            <div className={[classes.Modal, this.props.darkMode ? "DarkMode" : "LightMode"].join(' ')} >
                <div className={classes.CloseIcon} onClick={this.props.clicked} ><i className="fas fa-times"></i></div>
                <div className={classes.Input}><Input show="true" placeholder='Enter location name' pressed={key => this.keyPressHandler(key)} darkMode={this.props.darkMode} /></div>
                {errorMessage}
                {(!this.state.errorMessage || !this.state.locationProvided) ? 
                <p onClick={this.unitsHandler} className={classes.UnitConversionText}>C &harr; F</p> 
                : null}
                {showSpinner}
                <div className={classes.ModalData}>
                    {searchResults}
                    {detailedData}
                </div>
            </div>
        );
    }
}

export default WeatherModal;