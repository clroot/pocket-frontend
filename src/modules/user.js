import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import produce from 'immer';

import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import * as userAPI from '../lib/api/user';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';
const [GET_TAGS, GET_TAGS_SUCCESS, GET_TAGS_FAILURE] = createRequestActionTypes(
  'user/GET_TAGS',
);
const ADD_TAGS = 'user/ADD_TAGS';
const RESET = 'user/RESET';

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const getTags = createAction(GET_TAGS, () => ({}));
export const addTags = createAction(ADD_TAGS, (tags) => tags);
export const reset = createAction(RESET, () => ({}));

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const getTagsSaga = createRequestSaga(GET_TAGS, userAPI.getTags);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(GET_TAGS, getTagsSaga);
}

const initialState = {
  user: null,
  tags: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
    [GET_TAGS_SUCCESS]: (state, { payload: tags }) => ({
      ...state,
      tags,
    }),
    [GET_TAGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      tags: null,
    }),
    [ADD_TAGS]: (state, { payload: tags }) =>
      produce(state, (draft) => {
        draft.tags = [...new Set([...state.tags, ...tags])];
      }),
    [RESET]: () => ({ ...initialState }),
  },
  initialState,
);
