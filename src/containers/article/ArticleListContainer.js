import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { getList } from '../../modules/article';
import ArticleList from '../../components/article/ArticleList';

const ArticleListContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const { list, articleError, loading, user } = useSelector(
    ({ article, loading, user }) => ({
      list: article.list,
      articleError: article.articleError,
      loading: loading['article/GET_LIST'],
      user: user.user,
    }),
  );

  useEffect(() => {
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(getList({ tag, page }));
  }, [dispatch, location.search]);

  useEffect(() => {
    if (articleError) {
      //TODO: error 구현
    }
  }, [articleError, dispatch]);

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  });

  return <ArticleList list={list} loading={loading} />;
};

export default withRouter(ArticleListContainer);
