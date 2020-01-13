import React from 'react';
import LogoBlack from '../../assets/img/newsOne_logo_black.png';
import LogoWhite from '../../assets/img/newsOne_logo_white.png';

const logo = props => <img src={props.darkMode ? LogoWhite : LogoBlack} style={{ height: '55px' }} alt="newsOne_logo" />;

export default logo;