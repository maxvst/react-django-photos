import React, { Component } from 'react';
// // import './App.css';

import AlbumListPage from './pages/AlbumListPage';
import TestPage from './pages/TestPage.js';
import { Provider } from 'react-redux';
import store from './store';
import AlbumPage from './pages/AlbumPage';
import ImagePage from './pages/ImagePage';

import {
    HashRouter,
    Route,
    Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
              <Link to={'/'}>Home</Link>
              <Link to={'/test'}>Test</Link>
              <Route exact path="/" component={AlbumListPage} />
              <Route path="/test" component={TestPage} />
              <Route path="/base/:id" component={AlbumPage} />
              <Route path="/image/:id" component={ImagePage} />
          </div>
        </HashRouter >
      </Provider>
    );
  }
}

export default App;
