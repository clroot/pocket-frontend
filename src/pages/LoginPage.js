import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';
const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Pocket: 로그인</title>
      </Helmet>
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
