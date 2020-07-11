import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import article, { articleSaga } from './article';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  article,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), articleSaga()]);
}

export default rootReducer;
