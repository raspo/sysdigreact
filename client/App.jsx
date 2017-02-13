import 'babel-polyfill';
import './styles/app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from 'redux/reducers';

import AppLayout from 'components/layout/AppLayout';

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(createLogger({ collapsed: true }))
    )
  );

  return store;
}

const store = configureStore();

render(
  <Provider store={store}>
    <AppLayout />
  </Provider>,
  document.getElementById('root')
);
