import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import SocialRegisterFormContainer from '../containers/auth/SocialRegisterFormContainer';

const SocialRegisterPage = () => {
  return (
    <AuthTemplate>
      <SocialRegisterFormContainer />
    </AuthTemplate>
  );
};

export default SocialRegisterPage;
