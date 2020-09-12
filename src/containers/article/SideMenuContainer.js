import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideMenu from '../../components/article/SideMenu';
import { getTags } from '../../modules/user';

const SideMenuContainer = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(({ user }) => ({
    tags: user.tags,
  }));

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  return <SideMenu tags={tags} />;
};

export default SideMenuContainer;
