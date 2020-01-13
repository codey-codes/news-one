import React from 'react';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = props => {
    const style = {
        transform: props.showed ? 'translateX(0)' : 'translateX(100vw)'
    }

    return (
        <div className={[classes.SideDrawer, props.darkMode ? 'DarkMode' : 'LightMode'].join(' ')} style={style}>
            <nav className={props.darkMode ? classes.NavDark : classes.NavLight}>
                <NavigationItems
                    darkMode={props.darkMode}
                    showCategories={props.showCategories}
                    toggleCategoriesDisplay={props.toggleCategoriesDisplay}
                    clicked={props.clicked}
                    showSearchBarToggle={props.showSearchBarToggle}
                    mobileMode={true}
                />
            </nav>
        </div>
    );
};

export default sideDrawer;