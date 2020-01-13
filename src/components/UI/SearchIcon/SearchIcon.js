import React from 'react';
import classes from './SearchIcon.module.css';

const searchIcon = props => <i className={["fas fa-search", classes.SearchIcon].join(' ')} onClick={props.clicked} ></i>;

export default searchIcon;