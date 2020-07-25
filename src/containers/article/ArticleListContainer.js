import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { getList } from '../../modules/article';
import ArticleList from '../../components/article/ArticleList';

const ArticleListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { list, articleError, loading } = useSelector(
    ({ article, loading }) => ({
      list: article.list,
      articleError: article.articleError,
      loading: loading['article/GET_LIST'],
    }),
  );

  useEffect(() => {
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(getList({ tag, page }));
  }, [dispatch, location.search]);

  return <ArticleList list={list} loading={loading} />;
};

export default withRouter(ArticleListContainer);
