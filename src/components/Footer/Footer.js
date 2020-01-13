import React from 'react';
import classes from './Footer.module.css';

const footer = props =>  (
    <div className={[classes.Footer, props.darkMode ? "DarkMode" : "LightMode"].join(' ')}>
        <div className={classes.FooterLeft}>
            <a className={classes.Link} href="https://codeycodes.com">Portfolio</a>
            <a className={classes.Link} href="https://www.github.com/codey-codes/news-one" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
       <div className={classes.FooterRight}>
           <p>Powered by:</p>
            <a className={classes.Link} href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">News API</a>
            <a className={classes.Link} href="https://developer.nytimes.com/" target="_blank" rel="noopener noreferrer">NY Times</a>
            <a className={classes.Link} href="https://worldtradingdata.com" target="_blank" rel="noopener noreferrer">WTD</a>
            <a className={classes.Link} href="https://exchangeratesapi.io" target="_blank" rel="noopener noreferrer">ER API</a>
            <a className={classes.Link} href="https://darksky.net/dev" target="_blank" rel="noopener noreferrer">DarkSky</a>
            <a className={classes.Link} href="https://opencagedata.com/" target="_blank" rel="noopener noreferrer">OpenCage</a>
            <a className={classes.Link} href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">FlatIcon</a>
            <a className={classes.Link} href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a>
       </div>
    </div>
);

export default footer;