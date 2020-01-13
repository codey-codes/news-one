import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../containers/Config/Config';
import classes from './Stocks.module.css';
import Spinner from '../UI/Spinner/Spinner';

class StocksData extends Component {
    state = {
        stockNames: [
            'AAPL',
            'AMD',
            'AMZN',
            'GOOGL',
            'MSFT'
        ],
        showSpinner: true,
        stockData: null
    }

    componentDidMount () {
        const link = `${Config.Proxy}https://api.worldtradingdata.com/api/v1/stock?symbol=${this.state.stockNames.toString()}&api_token=${Config.WTD.key}`;
        axios.get(link)
        .then(res => {  
            if (res.status !== 200 || !res.data.data || res.data.message === 'You have reached your request limit for the day. Upgrade to get more daily requests.') {
                this.setState({ showSpinner: false, stockData: null })
            } else this.setState({ showSpinner: false, stockData: res.data.data })
        })
        .catch(err => {
            console.log('Error is: ',  err);
            this.setState({ showSpinner: false });
        })
    }

    render() {
        let dataToDisplay = '', bottomLink = '', spinner = <Spinner darkMode={this.props.darkMode} money />;

        if (!this.state.showSpinner && this.state.stockData) {
            spinner = null;
            bottomLink = (
                <a className={classes.BottomLink}
                    target="_blank"
                    href="https://www.investing.com/equities/"
                    rel="noopener noreferrer">
                    See more
                    <i className="fas fa-external-link-alt" style={{fontSize: '8px', marginLeft: '3px'}}></i>
                </a>
            )
            dataToDisplay = this.state.stockData.map(el => {
                let profitOrLoss = classes.Profit, caretState = classes.FlipCaret;

                if (el.price > el.close_yesterday) {
                    profitOrLoss = classes.Loss;
                    caretState = ''
                }

                return (
                    <div key={el.symbol} className={classes.StockList}>
                        <p className={classes.Stock}>{el.symbol}</p>
                        <p className={profitOrLoss}>{el.price} <span>{el.currency}</span><i className={["fas fa-caret-down", caretState].join(' ')}></i></p>
                    </div>
                )
            })
        } else if (!this.state.showSpinner && !this.state.stockData) {
            spinner = null;
            dataToDisplay = (
                <p className={classes.NoData}>
                    Apologies.<br></br>
                    Compact data not available at the moment. Please click
                    &nbsp;
                    <a className={classes.OtherLinks} target="_blank" href="https://www.investing.com/equities/" rel="noopener noreferrer">
                        here
                    </a>
                    &nbsp;
                    to get data from alternate source.
                </p>
            )
        }

        return (
            <div className={classes.Stocks} >
                <p>Today's top tech stocks</p>
                {spinner}
                {dataToDisplay}
                {bottomLink}
                
            </div>
        );
    };
};

export default StocksData;