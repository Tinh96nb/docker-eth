import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

import App from './app';

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root')
);