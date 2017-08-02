import React, {PropTypes} from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import { routerMiddleware } from 'react-router-redux';
//import createBrowserHistory from 'history/lib/createBrowserHistory';
import Immutable from 'immutable';
import thunk from 'redux-thunk';

import api from './util/middleware-api';
//import createSelectLocationState from './util/createSelectLocationState';

let configureStore, DevTools;

if (process.env.NODE_ENV === 'development') {
    DevTools = require('./DevTools').default;
    const createLogger = require('redux-logger');
    configureStore = function(history, reducers, initialState) {
    // Installs hooks that always keep react-router and redux store in sync
        const middleware = [thunk, api, routerMiddleware(history), createLogger()];
        let devTools = [];
        if (typeof document !== 'undefined') {
            devTools = [DevTools.instrument()];
        }
        return createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(...middleware),
        ...devTools
    ));
    };
} else {
    configureStore = function(history, reducers, initialState) {
        const middleware = [thunk, api, routerMiddleware(history)];
        return createStore(
      reducers,
      initialState,
      compose(applyMiddleware(...middleware))
    );
    };
}


// Promise 兼容性处理
import promise from 'es6-promise';
promise.polyfill();

const Root = ({routes, reducers, basename}) => {
  // 路由转换配置
  // Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
  // const browserHistory = useRouterHistory(createBrowserHistory)({
  //   basename: basename ? basename : '/'
  // });
    const store = configureStore(hashHistory, reducers, Immutable.Map());
    //const history = syncHistoryWithStore(hashHistory, store);
    /*const history = syncHistoryWithStore(hashHistory, store, {
        selectLocationState: createSelectLocationState()
    });*/
    const _routes = typeof routes === 'function' ? routes(store) : routes;

    const Wraper = function () {
        if (process.env.NODE_ENV === 'development') {
            return (
        <Provider store={store}>
          <div style={{ width: '100%', height: '100%'}}>
            <Router history={hashHistory}>
              {_routes}
            </Router>
          </div>
        </Provider>
            );
        } else {
            return (
        <Provider store={store}>
          <Router history={hashHistory}>
            {_routes}
          </Router>
        </Provider>
            );
        }
    };

    return (
    Wraper()
    );
};

Root.propTypes = {
    routes: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    reducers: PropTypes.func,
    basename: PropTypes.string
};

export default Root;
