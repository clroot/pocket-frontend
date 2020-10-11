import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { HelmetProvider } from 'react-helmet-async';
import qs from 'qs';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check, emailVerify } from './modules/user';
import { decodeBase64 } from './lib/utils';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
  try {
    let user;
    const { loginToken, emailVerify: emailToken } = qs.parse(
      window.location.search,
      {
        ignoreQueryPrefix: true,
      },
    );
    if (!loginToken) {
      user = localStorage.getItem('user');
      if (!user) return;
    } else {
      user = JSON.parse(decodeBase64(loginToken));
      localStorage.setItem('user', JSON.stringify(user));
    }

    if (emailToken) {
      store.dispatch(emailVerify(emailToken));
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
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
