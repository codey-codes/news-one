import React from 'react';
import classes from './Spinner.module.css';

const spinner = props => {
    let spinnerColor = props.darkMode ? classes.SpinnerLight : classes.SpinnerDark;
    // for regular spinner
    let spinnerHTML = <div className={[classes.Spinner, spinnerColor].join(' ')}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
    // for weather modal spinner
    if (props.weather) spinnerHTML = <div className={classes.SpinnerAlternate}><div className={spinnerColor}><i className="fab fa-cloudversify"></i></div></div>;
    // for stock/currency modal spinner
    if (props.money) spinnerHTML = <div className={classes.SpinnerAlternate} style={{fontSize: '45px'}} ><div className={spinnerColor}>$</div></div>;

    return spinnerHTML;
};

export default spinner;