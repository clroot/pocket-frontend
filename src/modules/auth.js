import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);
const [
  SOCIAL_REGISTER,
  SOCIAL_REGISTER_SUCCESS,
  SOCIAL_REGISTER_FAILURE,
] = createRequestActionTypes('auth/SOCIAL_REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);
const RESET = 'auth/RESET';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const register = createAction(
  REGISTER,
  ({ email, username, password }) => ({
    email,
    username,
    password,
  }),
);
export const socialRegister = createAction(
  SOCIAL_REGISTER,
  ({ email, username }) => ({ email, username }),
);
export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));
export const reset = createAction(RESET, () => ({}));

// Create SAGA
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const socialRegisterSaga = createRequestSaga(
  SOCIAL_REGISTER,
  authAPI.socialRegister,
);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(SOCIAL_REGISTER, socialRegisterSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  },
  socialRegister: {
    email: '',
    username: '',
  },
  login: {
    email: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [SOCIAL_REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [SOCIAL_REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [RESET]: () => ({ ...initialState }),
  },
  initialState,
);

export default auth;
