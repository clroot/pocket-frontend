import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ArticleFormContainer from '../containers/article/ArticleFormContainer';
import ArticleListContainer from '../containers/article/ArticleListContainer';

const ArticleListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <ArticleFormContainer />
      <ArticleListContainer />
    </div>
  );
};

export default ArticleListPage;
