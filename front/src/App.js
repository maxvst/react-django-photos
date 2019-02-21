import React, { Component } from 'react';
// import './App.css';
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import BasePage from './pages/BasePage';

// TODO: Подключить этот компонент и вынести в него что-нибудь, что было бы потом удобно тестировать.
class App extends Component {
  render() {
    return (
      <div>
        <h3> hello </h3>
          <Router history={hashHistory}>
            <Route path="/" component={HomePage}/>
            <Route path="/test" component={TestPage}/>
            <Route path="/base/:id" component={BasePage} />
          </Router>
      </div>
    );
  }
}

export default App;
