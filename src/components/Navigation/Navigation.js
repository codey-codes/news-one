import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import SearchIcon from '../UI/SearchIcon/SearchIcon';
import SideDrawerIcon from '../UI/SideDrawerIcon/SideDrawerIcon';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Navigation.module.css';
import CategoriesList from '../CategoriesList/CategoriesList';
import Input from '../UI/Input/Input';
import Backdrop from '../UI/Backdrop/Backdrop';

class NavBar extends Component {
    state = {
        showCategories: false,
        showSearchBar: false,
        showSideDrawer: false
    }

    categoriesDisplayHandler = () => {
        this.setState({
            showCategories: !this.state.showCategories,
            showSearchBar: false,
            showSideDrawer: false
        })
    }

    searchBarDisplayToggle = () => {
        this.setState({ 
            showSearchBar: !this.state.showSearchBar,
            showCategories: false,
            showSideDrawer: false
        })
    }

    hideSideDrawer = () => {
        this.setState({ showSideDrawer: false })
    }

    resetAll = term => {
        this.setState({ 
            showCategories: false, 
            showSearchBar: false, 
            showSideDrawer: false
        })
        this.props.clicked(term);
    }

    sideDrawerToggle = () => {
        this.setState({ 
            showSideDrawer: !this.state.showSideDrawer,
            showCategories: false, 
            showSearchBar: false
        })
    }

    keyPressHandler = query => {
        if (query.keyCode === 13) {
            this.setState({ 
                showSideDrawer: false,
                showCategories: false, 
                showSearchBar: false
            })
            this.props.searchQuery(query);
        }
    }

    render() {
        return (
            <div>
                <header className={[classes.NavBar, this.props.darkMode ? "DarkMode" : "LightMode"].join(' ')}>
                    <Link to="/projects/news_one/" exact="true" onClick={() => this.resetAll('reset')}>
                        <Logo darkMode={this.props.darkMode}  />
                    </Link>
                    <nav>
                        <NavigationItems
                            darkMode={this.props.darkMode}
                            showCategories={this.state.showCategories}
                            toggleCategoriesDisplay={this.categoriesDisplayHandler}
                            clicked={() => this.resetAll('reset')}
                            showSearchBarToggle={this.searchBarDisplayToggle}
                            mobileMode={false}
                        />
                    </nav>
                    <SearchIcon clicked={this.searchBarDisplayToggle} />
                    <SideDrawerIcon clicked={this.sideDrawerToggle} sideDrawerShown={this.state.showSideDrawer}/>
                </header>
                <Backdrop show={this.state.showSideDrawer} clicked={this.hideSideDrawer}/>
                <SideDrawer
                    darkMode={this.props.darkMode}
                    showed={this.state.showSideDrawer}
                    showCategories={this.state.showCategories}
                    toggleCategoriesDisplay={this.categoriesDisplayHandler}
                    clicked={() => this.resetAll('reset')}
                    showSearchBarToggle={this.searchBarDisplayToggle}
                />
                <CategoriesList
                    darkMode={this.props.darkMode}
                    showCategories={this.state.showCategories}
                    show={this.state.showCategories}
                    clicked={category => this.resetAll(category)}
                />
                <Input
                    darkMode={this.props.darkMode}
                    width="250px"
                    show={this.state.showSearchBar}
                    placeholder='Search...'
                    pressed={query => this.keyPressHandler(query)}
                />
            </div>
        );
    };
};

export default NavBar;