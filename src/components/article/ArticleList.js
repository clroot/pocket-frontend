import React from 'react';
import styled from 'styled-components';
import ArticleItem from './ArticleItem';

const ArticleListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  box-sizing: border-box;
  position: relative;
`;

const ArticleList = ({ list, loading }) => {
  return (
    <ArticleListBlock>
      {!loading &&
        list?.map((iter) => <ArticleItem key={iter._id} article={iter} />)}
    </ArticleListBlock>
  );
};

export default ArticleList;
