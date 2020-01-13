import React, { Component } from 'react';
import classes from './Articles.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Config from '../Config/Config';
import axios from 'axios';
import Formatter from '../Other/Other';
import NoImage from '../../assets/img/NoImage.png';

class ArticlesPage extends Component {
    state = {
        data: [],
        showSpinner: true,
        noData: false,
        searchQuery: this.props.searchQuery,
        category: this.props.category ? this.props.category : null
    }

    componentDidMount () {
        let link = 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=' + Config.NYT.key;
        if (this.state.searchQuery) link = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + this.state.searchQuery + '&api-key=' + Config.NYT.key
        if (this.state.category) {
            let chosenCategory = 'movies';
            if (this.state.category !== 'Entertainment') chosenCategory = (this.state.category).toLowerCase();
            link = 'https://api.nytimes.com/svc/topstories/v2/' + chosenCategory + '.json?api-key=' + Config.NYT.key;
        }
        axios.get(link)
        .then(res => {
            if (this.state.searchQuery) {
                if (res.data.response.docs.length > 0) {
                    this.setState({ showSpinner: false, data: [...res.data.response.docs] })
                } else this.setState({ showSpinner: false, noData: true })
            } else {
                if (res.data.results.length > 0) {
                    this.setState({ showSpinner: false, data: [...res.data.results] })
                } else this.setState({ showSpinner: false, noData: true })
            }
        })
        .catch(err => {
            console.log('Error while retreiving articles.', err);
            this.setState({ showSpinner: false, noData: true })
        })
    }

    render() {
        const spinner = this.state.showSpinner ? <Spinner darkMode={this.props.darkMode} /> : null;
        const noDataMessage = this.state.noData ? <p className={classes.NoData}>Uh Oh! No articles available at the moment. Please try again later.</p> : null;
        let articleHeading = <h1>Articles</h1>;
        if (this.state.searchQuery) articleHeading = <h1>Articles <span style={{ fontSize: '14px' }}>containing '{this.state.searchQuery}'</span></h1>;
        if (this.state.category) articleHeading = <h1>{this.state.category} Articles</h1>;

        const articles = this.state.data.map((el, index) => {
            const image = {};
            const title = this.state.searchQuery ? el.headline.main : el.title;
            const url = this.state.searchQuery ? el.web_url : el.url;
            let author = null, publishedTime = null, updatedTime = null, published = {}, updated = {}, formattedPublishedDate = null, formattedUpdatedDate = null;
            let photo = (
                <div className={classes.ImageContainer}>
                    <img className={classes.NoImage} src={NoImage} alt={'noImage-available'}></img>
                </div>
            );
            
            if (this.state.searchQuery) {
                author = el.byline.original ? el.byline.original : null;
                publishedTime = el.pub_date ? new Date(el.pub_date) : null;
            } else {
                author = el.byline ? (el.byline.split(' ').map(char => {    // this function capitalizes the author name
                    let str = char.split('')
                    str = ( str[0] + str.map((e, i) => { if (i > 0) return e.toLowerCase() }).join('') )
                    return str
                }).join(' ')) : null;

                publishedTime = el.published_date ? new Date(el.published_date) : null;
                updatedTime = el.updated_date ? new Date(el.updated_date) : null;

                if (updatedTime) {
                    updated = {
                        day: updatedTime.getDay() < 10 ? ('0' + updatedTime.getDay()) : updatedTime.getDay(),
                        month: Formatter.getMonthName(updatedTime.getMonth()),
                        year: updatedTime.getFullYear(),
                        hour: updatedTime.getHours() < 10 ? ('0' + updatedTime.getHours()) : updatedTime.getHours(),
                        minute: updatedTime.getMinutes() < 10 ? ('0' + updatedTime.getMinutes()) : updatedTime.getMinutes()
                    }
                    formattedUpdatedDate = <p className={classes.Updated}>Updated: {updated.day}-{updated.month}-{updated.year} at {updated.hour}:{updated.minute}</p>
                }
            }

            if (publishedTime) {
                published = {
                    day: publishedTime.getDay() < 10 ? ('0' + publishedTime.getDay()) : publishedTime.getDay(),
                    month: Formatter.getMonthName(publishedTime.getMonth()),
                    year: publishedTime.getFullYear(),
                    hour: publishedTime.getHours() < 10 ? ('0' + publishedTime.getHours()) : publishedTime.getHours(),
                    minute: publishedTime.getMinutes() < 10 ? ('0' + publishedTime.getMinutes()) : publishedTime.getMinutes()
                }
                formattedPublishedDate = <p className={classes.Published}>Published: {published.day}-{published.month}-{published.year} at {published.hour}:{published.minute}</p>
            }

            if (updatedTime === publishedTime) formattedUpdatedDate = null;

            if (el.multimedia) {
                if (el.multimedia.length !== 0) {
                    image.height = 0;

                    for (let i = 1; i < el.multimedia.length; i++) {
                        if (image.height < el.multimedia[i].height) {
                            if (this.state.searchQuery) {
                                image.alt = el.multimedia[i].url.split('/');
                                image.alt = image.alt[image.alt.length - 1];
                                image.src = 'https://nytimes.com/' + el.multimedia[i].url;
                            } else {
                                image.alt = el.multimedia[i].copyright.split(' ').join('-');
                                image.src = el.multimedia[i].url
                            }
                            image.height = el.multimedia[i].height;
                        }
                    }

                    photo = (
                        <div className={classes.ImageContainer}>
                            <a href={url} className={classes.Image} target="_blank" rel="noopener noreferrer">
                                <img src={image.src} alt={image.alt + '-image'}></img>
                            </a>
                        </div>
                    );
                }
            }
            
            
            return (
                <div className={classes.ArticleContainer} key={index}>
                    <div className={classes.TextArea}>
                        <a className={classes.Link} style={{ fontSize: '18px', fontWeight:'bold' }} href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                        <p className={classes.Author}>{author}</p>
                        <p style={{ fontSize: '16px', alignSelf: 'flex-start' }}>{el.abstract}</p>
                        {formattedPublishedDate}
                        {formattedUpdatedDate}                        
                        {el.source ? <a className={classes.Link} style={{ fontSize: '14px', marginTop: '10px' }} href={url} target="_blank" rel="noopener noreferrer">Read on: {el.source}</a> : null}
                    </div>
                    {photo}
                </div>
            );
        });

        return (
            <div className={classes.ArticlesPage}>
                {articleHeading}
                {spinner}
                {noDataMessage
                    ? noDataMessage
                    : (
                        <div className={classes.ArticlesSection}>
                            {articles}
                        </div>
                    )
                }
            </div>
        );
    };
};

export default ArticlesPage;