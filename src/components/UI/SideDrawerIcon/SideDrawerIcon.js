import React from 'react';
import classes from './SideDrawerIcon.module.css';

const sideDrawerIcon = props => {
    const style = {
        transform: props.sideDrawerShown ? 'rotate(90deg)' : 'rotate(0deg)'
    }

    return (
        <div className={classes.DrawerToggleIcon} onClick={props.clicked} style={style}>
            <i className="fas fa-ellipsis-h"></i>
        </div>
    );
};

export default sideDrawerIcon;