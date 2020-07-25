import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ArticleFormContainer from '../containers/article/ArticleFormContainer';
import ArticleListContainer from '../containers/article/ArticleListContainer';
import PaginationContainer from '../containers/article/PaginationContainer';

const ArticleListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <ArticleFormContainer />
      <ArticleListContainer />
      <PaginationContainer />
    </div>
  );
};

export default ArticleListPage;
