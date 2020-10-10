import React from 'react';
import styled from 'styled-components';
import ArticleItem from './ArticleItem';
import * as bp from '../../lib/styles/breakPoints';

const ArticleListBlock = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;
  position: relative;
  @media ${bp.extraSmall} {
    justify-content: center;
  }
  @media ${bp.small} {
    justify-content: flex-start;
  }
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
