import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as articleAPI from '../lib/api/articles';

const CHANGE_FIELD = 'article/CHANGE_FIELD';
const INITIALIZE_FORM = 'article/INITIALIZE_FORM';
const UPDATE_TAGS = 'article/REMOVE_TAG';
const [SAVE, SAVE_SUCCESS, SAVE_FAILURE] = createRequestActionTypes(
  'article/SAVE',
);
const [GET_ONCE, GET_ONCE_SUCCESS, GET_ONCE_FAILURE] = createRequestActionTypes(
  'article/GET',
);
const [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE] = createRequestActionTypes(
  'article/GET_LIST',
);
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] = createRequestActionTypes(
  'article/REMOVE',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const updateTags = createAction(UPDATE_TAGS, ({ _id, tags }) => ({
  _id,
  tags,
}));
export const save = createAction(SAVE, ({ url }) => ({ url }));
export const getOnce = createAction(GET_ONCE, ({ _id }) => ({ _id }));
export const getList = createAction(GET_LIST, ({ page, tag }) => ({
  page,
  tag,
}));
export const remove = createAction(REMOVE, ({ _id }) => ({ _id }));

const saveSaga = createRequestSaga(SAVE, articleAPI.save);
const getOnceSaga = createRequestSaga(GET_ONCE, articleAPI.get);
const getListSaga = createRequestSaga(GET_LIST, articleAPI.list);
const removeSage = createRequestSaga(REMOVE, articleAPI.remove);

export function* articleSaga() {
  yield takeLatest(SAVE, saveSaga);
  yield takeLatest(GET_ONCE, getOnceSaga);
  yield takeLatest(GET_LIST, getListSaga);
  yield takeLatest(REMOVE, removeSage);
}

const initialState = {
  newArticle: {
    url: '',
  },
  edit: {
    tags: [],
    newTag: '',
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
    [UPDATE_TAGS]: (state, { payload: { _id, tags } }) =>
      produce(state, (draft) => {
        draft.list.find((iter) => iter._id === _id).tags = tags;
      }),
    [SAVE_SUCCESS]: (state, { payload: article }) => ({
      ...state,
      list: [article].concat(state.list),
    }),
    [SAVE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      articleError: error,
    }),
    [GET_ONCE_SUCCESS]: (state, { payload: article }) =>
      produce(state, (draft) => {
        draft.edit.tags = article.tags;
        draft.edit.newTag = '';
      }),
    [GET_ONCE_FAILURE]: (state, { payload: error }) => ({
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
    [REMOVE_SUCCESS]: (state, { meta: response }) =>
      produce(state, (draft) => {
        const _id = response.headers['removed-article'];
        draft.list = draft.list.filter((iter) => iter._id !== _id);
      }),
    [REMOVE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      articleError: error,
    }),
  },
  initialState,
);

export default article;
