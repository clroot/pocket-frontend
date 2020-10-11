import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Pocket: 회원가입</title>
      </Helmet>
      <AuthTemplate>
        <RegisterForm />
      </AuthTemplate>
    </>
  );
};

export default RegisterPage;
