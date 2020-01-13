import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

class NavigationItem extends Component {
    render() {
        let listItem, caretState = classes.FlipCaretDown;
        if (!this.props.showCategories) {
            caretState = classes.FlipCaretUp;
        }
    
        if (!this.props.link) {
            if (this.props.mobileMode) {
                listItem = <span onClick={this.props.toggleCategoriesDisplay}>Categories</span>;
            } else {
                listItem = <span onClick={this.props.toggleCategoriesDisplay}>Categories&nbsp;<i className={["fas fa-caret-down", caretState].join(' ')}></i></span>;
            }
        } else {
            listItem = (
                <NavLink 
                    to={this.props.link}
                    exact={this.props.exact}
                    onClick={this.props.clicked}
                    activeClassName={this.props.darkMode ? classes.ActiveLinkLight : classes.ActiveLinkDark}>
                    {this.props.children}
                </NavLink>
            );
        }

        return (
            <li className={[classes.NavigationItem, this.props.darkMode ? classes.NavigationItemLight : classes.NavigationItemDark].join(' ')} >
                {listItem}
            </li>
        );
    }
};

export default NavigationItem;