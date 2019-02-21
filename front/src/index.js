import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import BaseListPage from './pages/BaseListPage';
import TestPage from './pages/TestPage.js';
import { Provider } from 'react-redux';
import store from './store';
import BasePage from './pages/BasePage';
import ImagePage from './pages/ImagePage';

import {
    HashRouter,
    Route,
    Link
} from 'react-router-dom';

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <div>
                <Link to={'/'}>Home</Link>
                <Link to={'/test'}>Test</Link>
                <Route exact path="/" component={BaseListPage} />
                <Route path="/test" component={TestPage} />
                <Route path="/base/:id" component={BasePage} />
                <Route path="/image/:id" component={ImagePage} />
            </div>
        </HashRouter >
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
