import React from 'react';
import Pagination from '../../components/article/Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location }) => {
  const { lastPage, list, loading } = useSelector(({ article, loading }) => ({
    lastPage: article.lastPage,
    list: article.list,
    loading: loading['article/GET_LIST'],
  }));

  if (!list || loading) return null;

  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return <Pagination tag={tag} page={parseInt(page, 10)} lastPage={lastPage} />;
};

export default withRouter(PaginationContainer);
