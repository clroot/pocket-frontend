import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import produce from 'immer';

import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import * as userAPI from '../lib/api/user';
import { decodeBase64 } from '../lib/utils';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';
const [GET_TAGS, GET_TAGS_SUCCESS, GET_TAGS_FAILURE] = createRequestActionTypes(
  'user/GET_TAGS',
);
const [
  REMOVE_USER_TAG,
  REMOVE_USER_TAG_SUCCESS,
  REMOVE_USER_TAG_FAILURE,
] = createRequestActionTypes('user/REMOVE_USER_TAG');
const ADD_TAGS = 'user/ADD_TAGS';
const RESET = 'user/RESET';
const [
  EMAIL_VERIFY,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAILURE,
] = createRequestActionTypes('user/EMAIL_VERIFY');

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const getTags = createAction(GET_TAGS, () => ({}));
export const addTags = createAction(ADD_TAGS, (tags) => tags);
export const removeUserTag = createAction(REMOVE_USER_TAG, (tag) => tag);
export const reset = createAction(RESET, () => ({}));
export const emailVerify = createAction(EMAIL_VERIFY, (token) => ({ token }));

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const getTagsSaga = createRequestSaga(GET_TAGS, userAPI.getTags);
const removeUserTagSaga = createRequestSaga(REMOVE_USER_TAG, userAPI.removeTag);
const emailVerifySaga = createRequestSaga(EMAIL_VERIFY, userAPI.emailVerify);

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
  yield takeLatest(REMOVE_USER_TAG, removeUserTagSaga);
  yield takeLatest(EMAIL_VERIFY, emailVerifySaga);
}

const initialState = {
  user: null,
  tags: null,
  checkError: null,
  ssm: {
    type: null,
    status: null,
  },
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
    [REMOVE_USER_TAG_SUCCESS]: (state, { meta: response }) =>
      produce(state, (draft) => {
        //TODO: tag 삭제 성공시, article.list에 담겨있는 tags 수정 구현
        const tagName = decodeBase64(response.headers['removed-tag'] || '');
        draft.tags = draft.tags.filter((tag) => tag !== tagName);
      }),
    [REMOVE_USER_TAG_FAILURE]: (state, { payload: error }) => ({
      ...state,
      tags: null,
    }),
    [RESET]: () => ({ ...initialState }),
    [EMAIL_VERIFY_SUCCESS]: (state, { payload: { type, status } }) =>
      produce(state, (draft) => {
        draft.ssm.type = type;
        draft.ssm.status = status;
      }),
    [EMAIL_VERIFY_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.ssm.type = 'email-verify';
        draft.ssm.status = 'error';
      }),
  },
  initialState,
);
