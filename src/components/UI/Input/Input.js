import React from 'react';
import classes from './Input.module.css';

const input = props => {
    const style = {
        width: props.width,
        height: props.show ? 'auto' : 0,
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        color: props.darkMode ? '#D6D9DB' : '#000',
    }

    return (
        <input placeholder={props.placeholder} className={classes.Input} style={style} onKeyDown={props.pressed} >{props.content}</input>
    );
};

export default input;