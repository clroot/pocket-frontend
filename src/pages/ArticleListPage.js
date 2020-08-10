import React from 'react';
import Responsive from '../components/common/Responsive';
import ArticleLayout from '../components/article/ArticleLayout';
import SideMenu from '../components/article/SideMenu';
import HeaderContainer from '../containers/common/HeaderContainer';
import ArticleFormContainer from '../containers/article/ArticleFormContainer';
import ArticleListContainer from '../containers/article/ArticleListContainer';
import PaginationContainer from '../containers/article/PaginationContainer';

const ArticleListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <Responsive>
        <ArticleFormContainer />
        <ArticleLayout main={<ArticleListContainer />} side={<SideMenu />} />
        <PaginationContainer />
      </Responsive>
    </div>
  );
};

export default ArticleListPage;
