import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import qs from 'qs';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
  try {
    let user;
    const { loginToken } = qs.parse(window.location.search.slice(1));
    if (!loginToken) {
      user = localStorage.getItem('user');
      if (!user) return;
    } else {
      const buffer = Buffer.from(loginToken, 'base64');
      user = JSON.parse(buffer.toString());

      localStorage.setItem('user', JSON.stringify(user));
    }

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
    window.history.replaceState({}, document.title, '/');
  } catch (error) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
