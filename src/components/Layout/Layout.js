import React from 'react';
import Navigation from '../Navigation/Navigation';
import classes from './Layout.module.css';
import Footer from '../Footer/Footer';

const layout = props =>  (
    <div className={[classes.Layout, props.darkMode ? "DarkMode" : "LightMode"].join(' ')}>
        <Navigation
            darkMode={props.darkMode}
            searchQuery={query => props.searchQuery(query)}
            clicked={task => props.clicked(task)}
        />
        <main className={classes.Content}>
            {props.children}
        </main>
        <div className={[classes.ModeSwitchIcon, props.darkMode ? 'DarkIcon' : 'LightIcon'].join(' ')} onClick={props.darkModeToggled}>
            <i className={"fas fa-adjust"}></i>
        </div>
        <Footer darkMode={props.darkMode} />
    </div>
);

export default layout;