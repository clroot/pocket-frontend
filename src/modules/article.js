import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as articleAPI from '../lib/api/articles';

const CHANGE_FIELD = 'article/CHANGE_FIELD';
const INITIALIZE_FORM = 'article/INITIALIZE_FORM';
const [SAVE, SAVE_SUCCESS, SAVE_FAILURE] = createRequestActionTypes(
  'article/SAVE_ARTICLE',
);
const [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE] = createRequestActionTypes(
  'article/GET_LIST',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const save = createAction(SAVE, ({ url }) => ({ url }));
export const getList = createAction(GET_LIST, ({ page, tag }) => ({
  page,
  tag,
}));

const saveSaga = createRequestSaga(SAVE, articleAPI.save);
const getListSaga = createRequestSaga(GET_LIST, articleAPI.list);
export function* articleSaga() {
  yield takeLatest(SAVE, saveSaga);
  yield takeLatest(GET_LIST, getListSaga);
}

const initialState = {
  newArticle: {
    url: '',
  },
  list: [],
  lastPage: 1,
  articleError: null,
};

const article = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [SAVE_SUCCESS]: (state, { payload: article }) => ({
      ...state,
      list: [article].concat(state.list),
    }),
    [SAVE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      articleError: error,
    }),
    [GET_LIST_SUCCESS]: (state, { payload: list, meta: response }) => ({
      ...state,
      list,
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [GET_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      articleError: error,
    }),
  },
  initialState,
);

export default article;
