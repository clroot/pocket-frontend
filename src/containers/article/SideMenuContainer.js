import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SideMenu from '../../components/article/SideMenu';
import { getTags, removeUserTag } from '../../modules/user';

const SideMenuContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector(({ user }) => ({
    tags: user.tags,
  }));

  const makeTagRemoveCallback = ({ tag, active = false }) => () => {
    dispatch(removeUserTag(tag));
    active && history.push('/');
  };

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  return <SideMenu tags={tags} makeTagRemoveCallback={makeTagRemoveCallback} />;
};

export default withRouter(SideMenuContainer);
