import React, { Component } from 'react';
import Config from '../Config/Config';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import classes from './Home.module.css';
import NoImage from '../../assets/img/NoImage.png';
import CurrencyRates from '../../components/CurrencyRates/CurrencyRates';
import Stocks from '../../components/Stocks/Stocks';
import Weather from '../../components/Weather/Weather';
import Formatter from '../Other/Other';
import WeatherModal from '../WeatherModal/WeatherModal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

class HomePage extends Component {
    state = {
        darkMode: this.props.darkMode,
        showSpinner: true,
        showCountryList: false,
        showingSearchResults: false,
        searchQuery: this.props.searchQuery,
        searchCategory: this.props.category ? this.props.category : '',
        modal: {
            type: null,
            data: null
        },
        showBackdrop: false,
        userCountry: 'Canada',
        cityForWeather: null,
        specificCountryNewsFail: false,
        location: {
            permitted: true,
            lat: null,
            lng: null
        },
        newsData: {
            articles: [],
            country: 'Canada',
            countryCode: 'ca',
            dataAvailable: false
        }
    }

    loadHomePageNews = (resetSearchQuery, countryName, countryCode) => {
        if (resetSearchQuery) this.setState({ searchQuery: null, showingSearchResults: false })

        let newsType = 'top-headlines', query = '', country = 'country=' + this.state.newsData.countryCode + '&', sort = '';

        if (this.state.searchQuery && !resetSearchQuery) {
            query = 'q=' + this.state.searchQuery + '&';
            newsType = 'everything';
            country = '';
            sort = 'sortBy=popularity&'
            this.setState({ showingSearchResults: true })
        }

        if (countryCode && countryName) country = 'country=' + countryCode + '&';

        const category = this.state.searchCategory ? ('category=' + this.state.searchCategory + '&') : '';
        const link = `https://newsapi.org/v2/${newsType}?${query}${category}${country}${sort}language=en&apiKey=${Config.NewsAPI.key}`;

        axios.get(link)
        .then (response => {
            if (response.data.articles.length === 0) {
                this.setState({
                    showSpinner: false,
                    showCountryList: false,
                    newsData: {
                        articles: [],
                        country: this.state.newsData.country,
                        countryCode: this.state.newsData.countryCode,
                        dataAvailable: false
                    }
                });
            } else {
                this.setState({ 
                    showSpinner: false,
                    showCountryList: false,
                    newsData: {
                        articles: [...response.data.articles],
                        country: this.state.newsData.country,
                        countryCode: this.state.newsData.countryCode,
                        dataAvailable: true
                    }
                })
            }
        })
        .catch(err => {
            console.log('Error retrieving news data.', err)
            this.setState({ 
                showSpinner: false,
                showCountryList: false,
                newsData: {
                    articles: [],
                    country: this.state.newsData.country,
                    countryCode: this.state.newsData.countryCode,
                    dataAvailable: false
                }
            })
        })
    }

    getCoords = () => {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            })
        } else return null;
    }
        
    getLocation = async () => {
        let pos = {};
        let position = await this.getCoords();
        if (position) {
            pos.lat = position.coords.latitude;
            pos.lng = position.coords.longitude;
            return pos;
        } else return null;
    }

    getCountryInfo = async () => {
        const cntry = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.location.lat},${this.state.location.lng}&key=${Config.OpenCage.key}&pretty=1`)
        .then(res => {
            return { 
                code: res.data.results[0].components['ISO_3166-1_alpha-2'].toLowerCase(),
                name: res.data.results[0].components['country'],
                city: res.data.results[0].components['city']
            }
        })
        .catch(err => {
            console.log('Error: ', err);
        })

        if (cntry) {
            if (cntry.code !== 'ca') {
                const [cCode, defaultNews] = Formatter.countryCodeFormatter(cntry.code);
                
                if (!defaultNews) {
                    this.setState({ 
                        showSpinner: true,
                        cityForWeather: cntry.city,
                        newsData: { 
                            articles: [],
                            country: cntry.name,
                            countryCode: cCode,
                            dataAvailable: false,
                        }
                    })
                    this.loadHomePageNews(false);
                } else {
                    this.setState({ userCountry: cntry.name, cityForWeather: cntry.city, specificCountryNewsFail: true })
                }
            } else this.setState({ cityForWeather: cntry.city })
        }
    }

    toggleCountryListDisplay = () => {
        this.setState({ showCountryList: !this.state.showCountryList })
    }

    toggleCountry = (name, code) => {
        this.setState({ 
            showSpinner: true,
            showCountryList: false,
            showingSearchResults: false,
            newsData: {
                articles: [],
                country: name,
                countryCode: code,
                dataAvailable: false
            }
        })
        this.loadHomePageNews(false, name, code);
    }

    modalHandler = (type, show, modalData) => {
        if (show) {
            this.setState({ showBackdrop: true, modal: { type: type, data: modalData } })
        } else this.setState({ showBackdrop: false, modal: { type: null, data: null } })
    }

    resetAll = () => {
        this.setState({
            showSpinner: true,
            showCountryList: false,
            showingSearchResults: false,
            searchQuery: null,
            searchCategory: '',
            newsData: {
                articles: [],
                country: 'Canada',
                countryCode: 'ca',
                dataAvailable: false
            }
        })
        this.loadHomePageNews(true)
    }

    componentDidMount () {
        this.loadHomePageNews(false);
        this.getLocation()
        .then(res => {
            if (res) {
                this.setState({ 
                    location: {
                        permitted: true,
                        lat: res.lat,
                        lng: res.lng
                    }
                })
                this.getCountryInfo();
            } else {
                this.setState({ 
                    location: {
                        permitted: false,
                        lat: null,
                        lng: null
                    }
                })
                console.log('Location access not permitted.')
            }
        })
        .catch(() => {
            this.setState({ 
                location: {
                    permitted: false,
                    lat: null,
                    lng: null
                }
            })
            console.log('Location access not permitted.')
        })  
    }

    render() {
        const showSpinner = this.state.showSpinner ? <Spinner darkMode={this.props.darkMode}/> : null;
        const searchHeading = this.state.showingSearchResults ? <p className={classes.SearchResultsHeading}>{'Search results for \'' + this.state.searchQuery + '\''}</p> : null;
        let primaryData = '', showCountryName, countriesNames = [];
        let modal = '', caretState = classes.FlipCaretUp, showCountryList = null;
        const location = {};
        const countries = {
            'Emirates': 'ae',
            'Austria': 'at',
            'Canada': 'ca',
            'China': 'cn',
            'Germany': 'de',
            'France': 'fr',
            'United Kingdom': 'gb',
            'Hong Kong': 'hk',
            'Italy': 'it',
            'Japan': 'jp',
            'Nigeria': 'ng',
            'Russia': 'ru',
            'United States': 'us',
            'South Africa': 'za'
        }

        for (let [key, value] of Object.entries(countries)) {
            countriesNames.push(<div key={value}><span onClick={() => this.toggleCountry(key, value)}>{key}</span></div>)
        }
        
        if (this.state.showCountryList) {
            caretState = classes.FlipCaretDown;
            showCountryList = (
                <div className={classes.CountryNamesList}>
                    {countriesNames}
                </div>
            )
        }

        if (this.state.modal.type) {
            if (this.state.modal.type === 'weather') {  // more modals will be added in the future release
                modal = <WeatherModal modalData={this.state.modal.data} darkMode={this.props.darkMode} clicked={() => this.modalHandler(null, false)}/>;
            }
        }
        
        if (this.state.location.lat && this.state.location.lng) {
            location.lat = this.state.location.lat;
            location.lng = this.state.location.lng;
            location.cityName = this.state.cityForWeather;
        }

        if (!this.state.showSpinner && this.state.newsData.dataAvailable) {
            showCountryName = (
                (this.state.userCountry !== 'Canada' && this.state.specificCountryNewsFail) 
                ? (
                    <p className={classes.CountryName} onClick={this.toggleCountryListDisplay}>
                        'Service not available in {this.state.userCountry}. Showing news from {this.state.newsData.country} instead'&nbsp;<i className={["fas fa-caret-down", caretState].join(' ')}></i>
                    </p>
                )
                : (
                    <p className={classes.CountryName} onClick={this.toggleCountryListDisplay}>
                        From '{this.state.newsData.country}'&nbsp;<i className={["fas fa-caret-down", caretState].join(' ')}></i>
                    </p>
                )
            );
            primaryData = this.state.newsData.articles.map((el, index) => { 
                let localDate, localTime, publishedContent = '', show = true, content = '', author = '';
                let source = el.source.name ? el.source.name : el.title.split(' - ')[1];

                if (source.indexOf('.') > -1) source = source.toLowerCase();    // converting website address to lowercase
                const bullShitContent = 'To continue, please click the box below to let us know you\'re not a robot.'; 

                if (el.author) {
                    if (el.author.indexOf('https://') === -1) {     // do not show link as an author name
                        author = "By: " + el.author;
                    }
                }

                if (el.title.indexOf('Briefing') > -1 || el.title.indexOf('briefing') > -1) show = false;   // don't wanna show briefings

                if (el.publishedAt) {
                    localDate = new Date(el.publishedAt);
                    localDate = Formatter.addZero(localDate.getDate()) + '-' + (Formatter.getMonthName(localDate.getMonth())) + '-' + (localDate.getFullYear());
                    localTime = new Date(el.publishedAt);
                    localTime = Formatter.addZero(localTime.getHours()) + ':' + Formatter.addZero(localTime.getMinutes());
                    publishedContent = 'Published: ' + localDate + ' at ' + localTime;
                }
                
                if (el.content) {
                    if (el.content.indexOf('href') > -1 || el.content.indexOf('<ul>') > -1 || el.content.indexOf('<li>') > -1 || el.content.indexOf('<table>') > -1 || el.content.indexOf('<tr>') > -1 || el.content.indexOf('<td>') > -1) {   // dealing with poor formatting
                        if (el.description) {
                            if (el.description.indexOf('href') > -1 || el.description.indexOf('<ul>') > -1 || el.description.indexOf('<li>') > -1 || el.description.indexOf('<table>') > -1 || el.description.indexOf('<tr>') > -1 || el.description.indexOf('<td>') > -1) {
                                show = false;
                            } else content = el.description;
                        } else show = false;
                    } else if (el.content.indexOf('Copyright') > -1) {  // some data is received with only Copyright information and NO content. So just remove it
                        show = false;
                    } else if (el.content === bullShitContent) { // Bloomberg is sometimes showing this content. So let's just get rid of it when there is this content
                        show = false;   
                    } else content = el.content.split('…')[0] + '...';
                } else if (el.description) {    // if no content is available, show description, provided this description has some acceptable format
                    if (el.description.indexOf('href') > -1 || el.description.indexOf('<ul>') > -1 || el.description.indexOf('<li>') > -1 || el.description.indexOf('<table>') > -1 || el.description.indexOf('<tr>') > -1 || el.description.indexOf('<td>') > -1) {
                        show = false;
                    } else if (el.description.indexOf('Copyright') > -1) {
                        show = false
                    } else content = el.description;
                } else show = false;    // if no content and no description, just don't show anything then

                if (content.length < 100) show = false;     // if chosen content (content or description) is less than 100 characters, just discard it

                if (el.url.split('?')[0] === 'https://www.youtube.com/watch') show = false; // do not show news from youtube channels

                return (
                    <div className={classes.Headline} key={el.publishedAt + ' ' + index} style={{ display: show ? 'flex' : 'none' }}>
                        <div className={classes.Image}>
                            <a href={el.url} target="_blank" rel="noopener noreferrer" ><img src={(el.urlToImage && el.id !== 'undefined') ? el.urlToImage : NoImage} alt={el.id + '_image'}></img></a>
                        </div>
                        <div className={classes.TextArea}>
                            <a className={classes.Title} href={el.url} target="_blank" rel="noopener noreferrer">{el.title.split(' - ')[0]}</a>
                            <span className={classes.Author} style={{display: author ? 'block' : 'none'}}>{author}</span>
                            
                            <p className={classes.Content}>{content}</p>
                            <p className={classes.Date}>{publishedContent}</p>
                            <a className={classes.Link} href={el.url} target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt"></i> Read More on {source}</a>
                        </div>
                    </div>
                )
            });
        } else if (!this.state.showSpinner && !this.state.newsData.dataAvailable) {
            primaryData = <p className={classes.NoResults}>Nothing found. Click <span onClick={() => this.resetAll()}>here</span> to reload.</p>
        }

        return (
            <div className={classes.Home}>
                {modal}
                <Backdrop fromHome="true" darkMode={this.state.darkMode} show={this.state.showBackdrop} clicked={() => this.modalHandler(null, false)} />
                <div className={classes.DataSection}>
                    <div className={classes.PrimaryData}>
                        <h1>{this.state.showingSearchResults ? 'Recently...' : ('Top ' + this.state.searchCategory + ' Headlines')}</h1>
                        {showCountryName}
                        {showCountryList}
                        {showSpinner}
                        {searchHeading}
                        {primaryData}
                    </div>
                    <div className={classes.SecondaryData} style={{ display: this.state.searchQuery ? 'none' : 'flex' }}>
                        <Weather darkMode={this.state.darkMode} location={location.cityName ? location : (this.state.location.permitted ? null : 'NO_LOCATION')} clicked={modalData => this.modalHandler('weather', true, modalData)} />
                        <CurrencyRates darkMode={this.state.darkMode} />
                        <Stocks darkMode={this.state.darkMode} />
                    </div>
                </div>
            </div>
        );
    };
};

export default HomePage;