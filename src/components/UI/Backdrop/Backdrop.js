import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = props => {
    let alternateBGColor = {
        backgroundColor: 'rgba(0, 0, 0, .5)'
    }

    if (props.fromHome) {
        alternateBGColor = {
            backgroundColor: props.darkMode ? 'rgba(126, 126, 126, .3)' : 'rgba(0, 0, 0, .5)'
        }
    }

    if (props.show) {
        return <div className={classes.Backdrop} style={alternateBGColor} onClick={props.clicked} ></div>;
    } else return null;
};

export default backdrop;