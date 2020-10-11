import React from 'react';
import { Helmet } from 'react-helmet-async';
import Responsive from '../components/common/Responsive';
import ArticleLayout from '../components/article/ArticleLayout';
import HeaderContainer from '../containers/common/HeaderContainer';
import ArticleFormContainer from '../containers/article/ArticleFormContainer';
import ArticleListContainer from '../containers/article/ArticleListContainer';
import TagListContainer from '../containers/article/TagListContainer';
import PaginationContainer from '../containers/article/PaginationContainer';
import MessageModalContainer from '../containers/common/MessageModalContainer';

const ArticleListPage = () => {
  return (
    <>
      <Helmet>
        <title>Pocket</title>
      </Helmet>
      <HeaderContainer />
      <Responsive>
        <ArticleFormContainer />
        <ArticleLayout
          main={<ArticleListContainer />}
          side={<TagListContainer />}
        />
        <PaginationContainer />
        <MessageModalContainer />
      </Responsive>
    </>
  );
};

export default ArticleListPage;
