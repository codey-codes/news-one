import React, { Component } from 'react';
import axios from 'axios';
import classes from './CurrencyRates.module.css';
import Spinner from '../UI/Spinner/Spinner';

class CurrencyRates extends Component {
    state = {
        showSpinner: true,
        rates: null
    }

    componentDidMount () {
        axios.get('https://api.exchangeratesapi.io/latest?base=USD')
        .then(res => {
            if (res.data.rates) this.setState({ showSpinner: false, rates: {...res.data.rates} })
            else this.setState({ showSpinner: false, rates: null })
        })
        .catch(err => {
            this.setState({ showSpinner: false, rates: null });
            console.log('Error while extracting currency data. Error is: ', err)
        })
    }

    render() {
        let dataCollected = [], currencyData = '', noData = '';
        let spinner = <Spinner darkMode={this.props.darkMode} money />;
        let showCurrencyDataCSS = classes.Hide;
        let bottomLink = (
            <a className={classes.BottomLink} target="_blank" href="https://www.xe.com/currencyconverter/" rel="noopener noreferrer">
                See more 
                <i className="fas fa-external-link-alt" style={{fontSize: '8px', marginLeft: '3px'}}></i>
            </a>
        );
        
        if (!this.state.showSpinner &&  this.state.rates) {
            spinner = null;
            showCurrencyDataCSS = classes.Show;
            for (let [key, value] of Object.entries(this.state.rates)) {
                dataCollected.push({ currency: key, value: value })
            }

            currencyData = dataCollected.map(el => {
                if (el.currency === 'AUD' || el.currency === 'CAD' || el.currency === 'EUR' || 
                    el.currency === 'GBP' || el.currency === 'JPY' || el.currency === 'HKD' || 
                    el.currency === 'SGD' || el.currency === 'MXN') {
                        return (
                            <p key={el.key+ '-' + el.value} className={classes.RateValue}>
                                <span className={classes.Currency}>
                                    {parseFloat(el.value).toFixed(2)}
                                    <span className={classes.CurrencyFormat}>{el.currency}</span>
                                </span>
                            </p>
                        )
                } else return ''
            })
        } else if (!this.state.showSpinner && !this.state.rates) {
            spinner = null;
            bottomLink = null;
            noData = (
                <p className={classes.NoData}>
                    Apologies.<br></br>
                    Currency rates are not available right now. Please click
                    &nbsp;
                    <a className={classes.OtherLinks} target="_blank" href="https://www.xe.com/currencyconverter/" rel="noopener noreferrer">
                        here
                    </a>
                    &nbsp;
                    to get data from alternate source.
                </p>
            )
        }
        
        return (
            <div className={classes.Rates}>
                <p>Today's exchange rate</p>
                {spinner}
                {noData}
                <div className={showCurrencyDataCSS}>
                    <h1>1 <span className={classes.CurrencyFormat}>USD</span></h1>
                    <div className={classes.RateValues}>
                        {currencyData}
                    </div>
                    {bottomLink}
                </div>
            </div>
        );
    };
};

export default CurrencyRates;