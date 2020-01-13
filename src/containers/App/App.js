import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Home from '../Home/Home';
import Articles from '../Articles/Articles';
import About from '../About/About';

class App extends Component {
  state = {
    darkMode: true,
    searchQuery: null,
    category: null,
    activeComponent: 'home'
  }

  toggleDarkMode = () => {
    this.setState(prevState => {
      return { darkMode: !prevState.darkMode }
    })
  }

  searchQueryHandler = query => {
    if (query.keyCode === 13) this.setState({ searchQuery: query.target.value, category: null })
  }

  clickTypeHandler = term => {
    if (term === 'reset') { 
      this.setState({ searchQuery: null, category: null })
    } else {
      this.setState({ searchQuery: null, category: term })
    }
  }

  activeComponentHandler = (component, mounted) => {
    if ((this.state.activeComponent !== component) && mounted) {
      this.setState({ 
        activeComponent: component,
        searchQuery: null,
        category: null
      })
    }
  }

  render() {
    const routes = [
      {
        path: "/projects/news_one/about",
        exact: true,
        component: () => <About darkMode={this.state.darkMode} />
      },
      {
        path: "/projects/news_one/articles",
        exact: false,
        component: () => <Articles darkMode={this.state.darkMode} searchQuery={this.state.searchQuery} category={this.state.category} />
      },
      {
        path: "/projects/news_one/",
        exact: true,
        component: () => <Home darkMode={this.state.darkMode} searchQuery={this.state.searchQuery} category={this.state.category} />
      }
    ];

    if (this.state.darkMode) {
      document.body.classList.add('DarkMode');
      document.body.classList.remove('LightMode');
    } else {
      document.body.classList.add('LightMode');
      document.body.classList.remove('DarkMode');
    }

    return (
      <Router>
        <Layout 
          darkModeToggled={this.toggleDarkMode}
          darkMode={this.state.darkMode}
          searchQuery={query => this.searchQueryHandler(query)}
          clicked={task => this.clickTypeHandler(task)} >
          <Switch>
            {routes.map(el => ( 
              <Route 
                key={el.path}
                path={el.path}
                exact={el.exact}
                component={el.component}
              />
            ))}
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;