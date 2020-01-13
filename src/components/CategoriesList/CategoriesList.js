import React, { Component } from 'react';
import BusinessIcon from '../../assets/img/Icons/businessIcon.png'
import EntertainmentIcon from '../../assets/img/Icons/entertainmentIcon.png'
import HealthIcon from '../../assets/img/Icons/healthIcon.png'
import ScienceIcon from '../../assets/img/Icons/scienceIcon.png'
import SportsIcon from '../../assets/img/Icons/sportsIcon.png'
import TechnologyIcon from '../../assets/img/Icons/technologyIcon.png'
import classes from './CategoriesList.module.css';

class CategoriesList extends Component {
    
    render() {
        const iconColor = this.props.darkMode ? classes.DarkIcon : classes.LightIcon;
        const style = {
            height: this.props.show ? 'auto' : 0,
            transform: this.props.show ? 'scaleY(1)' : 'scaleY(0)'
        }

        return (
            <div className={[classes.CategoriesList, iconColor].join(' ')} style={style}>
                <div>
                    <p onClick={() => this.props.clicked('Business')}>
                        <img src={BusinessIcon} className={classes.CategoriesIcon} alt="business_icon"/>
                        Business
                    </p>
                </div>
                <div>
                    <p onClick={() => this.props.clicked('Entertainment')} className={classes.DarkHover}>
                        <img src={EntertainmentIcon} className={classes.CategoriesIcon} alt="entertainment_icon"/>
                        Entertainment
                    </p>
                </div>
                <div>
                    <p onClick={() => this.props.clicked('Health')}>
                        <img src={HealthIcon} className={classes.CategoriesIcon} alt="health_icon"/>
                        Health
                    </p>
                </div>
                <div>
                    <p onClick={() => this.props.clicked('Science')}>
                        <img src={ScienceIcon} className={classes.CategoriesIcon} alt="science_icon"/>
                        Science
                    </p>
                </div>
                <div>
                    <p onClick={() => this.props.clicked('Sports')}>
                        <img src={SportsIcon} className={classes.CategoriesIcon} alt="sports_icon"/>
                        Sports
                    </p>
                </div>
                <div>
                    <p onClick={() => this.props.clicked('Technology')}>
                        <img src={TechnologyIcon} className={classes.CategoriesIcon} alt="technology_icon"/>
                        Technology
                    </p>
                </div>
            </div>
        );
    };
};

export default CategoriesList;