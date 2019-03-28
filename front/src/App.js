import React, { Component } from 'react';
// // import './App.css';

import AlbumListPage from './pages/AlbumListPage';
import TestPage from './pages/TestPage.js';
import { Provider } from 'react-redux';
import store from './store';
import AlbumPage from './pages/AlbumPage';
import ImagePage from './pages/ImagePage';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

class App extends Component {
  // TODO: вынести отображение ошибочного пути в отдельный компонент.
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Link to={'/'}>Home</Link>
          <Link to={'/test'}>Test</Link>
          <Switch>
            <Route exact path="/" component={AlbumListPage} />
            <Route path="/test" component={TestPage} />
            <Route path="/album/:id" component={AlbumPage} />
            <Route path="/image/:id" component={ImagePage} />
            <Route render={({ location }) => (
              <div className='ui inverted red segment'>
                <h3>
                  Error! No matches for <code>{location.pathname}</code>
                </h3>
              </div>
            )} />
          </Switch>        
        </Provider>
      </Router>
    );
  }
}

export default App;
