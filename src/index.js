import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { leaguesInfo } from './actions';
import reducers from './reducers';

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    applyMiddleware(thunk)
  );

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();

store.dispatch(leaguesInfo());
