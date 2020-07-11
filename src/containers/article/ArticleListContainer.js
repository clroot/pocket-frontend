import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { getList } from '../../modules/article';
import ArticleList from '../../components/article/ArticleList';

const ArticleListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { list, articleError } = useSelector(({ article }) => ({
    list: article.list,
    articleError: article.articleError,
  }));

  useEffect(() => {
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(getList({ tag, page }));
  }, [dispatch, location.search]);

  return <ArticleList list={list} />;
};

export default withRouter(ArticleListContainer);
