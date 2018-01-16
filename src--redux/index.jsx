import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import AppContainer from './containers/AppContainer';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app'),
);
