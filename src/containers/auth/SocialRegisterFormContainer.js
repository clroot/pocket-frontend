import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  changeField,
  initializeForm,
  socialRegister,
} from '../../modules/auth';
import { check } from '../../modules/user';
import SocialRegisterForm from '../../components/auth/SocialRegisterForm';
import { decodeBase64 } from '../../lib/utils';

const SocialRegisterFormContainer = ({ history, location }) => {
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.socialRegister,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'socialRegister',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, username } = form;

    if ([email, username].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }

    !isSubmitted && dispatch(socialRegister({ email, username }));
    setIsSubmitted(true);
  };

  useEffect(() => {
    const { info = '' } = qs.parse(location.search.slice(1));
    const { username } = JSON.parse(decodeBase64(info));

    dispatch(initializeForm('socialRegister'));
    dispatch(
      changeField({ form: 'socialRegister', key: 'username', value: username }),
    );
  }, [dispatch, location]);

  useEffect(() => {
    setIsSubmitted(false);
    if (authError) {
      if (authError.response.status === 409) {
        setError(
          authError.response.data.field === 'email'
            ? '이미 사용중인 이메일입니다.'
            : '이미 사용중인 닉네임입니다.',
        );
        setIsSubmitted(false);
        return;
      }
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('register success');
      dispatch(check());
    }
  }, [auth, authError, dispatch, setIsSubmitted]);

  useEffect(() => {
    setError('');
  }, [form, setError]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.log('localStorage is not working');
      }
    }
  }, [user, history]);

  return (
    <SocialRegisterForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(SocialRegisterFormContainer);
