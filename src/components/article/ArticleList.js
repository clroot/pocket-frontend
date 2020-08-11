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

const ArticleList = ({ list, loading, onRemove }) => {
  return (
    <ArticleListBlock>
      {!loading &&
        list?.map((iter) => (
          <ArticleItem key={iter._id} article={iter} onRemove={onRemove} />
        ))}
    </ArticleListBlock>
  );
};

export default ArticleList;
