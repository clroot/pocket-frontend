import React from 'react';
import Responsive from '../components/common/Responsive';
import ArticleLayout from '../components/article/ArticleLayout';
import HeaderContainer from '../containers/common/HeaderContainer';
import ArticleFormContainer from '../containers/article/ArticleFormContainer';
import ArticleListContainer from '../containers/article/ArticleListContainer';
import SideMenuContainer from '../containers/article/SideMenuContainer';
import PaginationContainer from '../containers/article/PaginationContainer';
import MessageModalContainer from '../containers/common/MessageModalContainer';

const ArticleListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <Responsive>
        <ArticleFormContainer />
        <ArticleLayout
          main={<ArticleListContainer />}
          side={<SideMenuContainer />}
        />
        <PaginationContainer />
        <MessageModalContainer />
      </Responsive>
    </div>
  );
};

export default ArticleListPage;
