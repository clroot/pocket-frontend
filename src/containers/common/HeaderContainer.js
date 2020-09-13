import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../components/common/Header';
import { logout, reset as userReset } from '../../modules/user';
import { reset as authReset } from '../../modules/auth';
import { reset as articleReset } from '../../modules/article';

const HeaderContainer = ({ history }) => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(userReset());
    dispatch(authReset());
    dispatch(articleReset());
    history.push('/login');
  };

  return <Header user={user} onLogout={onLogout} />;
};

export default withRouter(HeaderContainer);
