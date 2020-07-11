import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '../../modules/article';
import ArticleList from '../../components/article/ArticleList';

const ArticleListContainer = () => {
  const dispatch = useDispatch();
  const { list, articleError } = useSelector(({ article }) => ({
    list: article.list,
    articleError: article.articleError,
  }));

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return <ArticleList list={list} />;
};

export default ArticleListContainer;
