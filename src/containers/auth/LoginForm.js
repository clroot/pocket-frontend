import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changeField, initializeForm, login } from '../../modules/auth';
import { check } from '../../modules/user';
import AuthForm from '../../components/auth/AuthForm';

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('error occurred');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('login success');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);
