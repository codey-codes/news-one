import React from 'react';
import classes from './About.module.css';

const aboutPage = () => (
    <div className={classes.AboutPage}>
        <h1>About Us</h1>
        <p>
            We, here at NewsOne, are the ones who always love to stay up to date with all the news in the world. We are passionate about knowledge and education. That is why we have brought you a mean to get all the information that is needed to stay up to date in this world. We bring news from all over the globe and also provide a way to search for any news that has happened in the past few days so that you do not miss out on anything.<br></br><br></br>
            We are also pleased to inform you that we have included 'Articles' as well so that it is not only the news that you will get but also researches, surveys and other educational stuff for you and your family.
        </p>
        <h3>Have something to share or want to make a suggestion?</h3>
        <div>
            <p><b>Address:</b> 432 newsOne Lane, Holy Moly District, Not Asgard, N1N 1N1</p>
            <p><b>Phone:</b> 999-NEW-N1N1</p>
            <p><b>Email:</b> newsOne@whatever.com</p>
        </div>
        <div className={classes.SocialMediaIcons}>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter-square"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://reddit.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-reddit-square"></i></a>
        </div>
    </div>
);

export default aboutPage;