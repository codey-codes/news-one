import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = props => {
    let otherStyles;
    if (props.darkMode && !props.mobileMode) otherStyles = classes.NavigationItemsDark;
    if (!props.darkMode && !props.mobileMode) otherStyles = classes.NavigationItemsLight;

    return (
        <ul className={[classes.NavigationItems, otherStyles].join(' ')} >
            <NavigationItem link="/projects/news_one/" exact={true} clicked={props.clicked} darkMode={props.darkMode} >Home</NavigationItem>
            <NavigationItem
                link={false} exact={false}
                showCategories={props.showCategories}
                toggleCategoriesDisplay={props.toggleCategoriesDisplay}
                clicked={props.clicked}
                mobileMode={props.mobileMode}
                darkMode={props.darkMode} >
                Categories
            </NavigationItem>
            <NavigationItem link="/projects/news_one/articles" exact clicked={props.clicked} darkMode={props.darkMode} >Articles</NavigationItem>
            <NavigationItem link="/projects/news_one/about" exact clicked={props.clicked} darkMode={props.darkMode} >About</NavigationItem>
        </ul>
    );
};

export default navigationItems;