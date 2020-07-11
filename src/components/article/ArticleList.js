import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const ArticleListBlock = styled(Responsive)`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  box-sizing: border-box;
  position: relative;
`;

const ArticleCardBlock = styled.div`
  width: 33.3%; /*TODO: 반응형 구현*/
  padding: 1rem;
  position: relative;
`;

const ArticleThumbnail = styled.img`
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
  height: 170px;
  min-height: 170px;
  width: 100%;
  margin: 0px 0px 16px;
  background-size: cover;
`;

const StyledTitle = styled.a`
  font-weight: 600;
  color: inherit;
  padding: 0;
  margin: 0;
  text-decoration: none;
  font-size: 18px;
  line-height: 1.2em;
  max-height: 3.6em;
`;

const StyledDescription = styled.div`
  font-size: 14px;
  line-height: 1.75em;
  color: rgb(79, 79, 79);
  padding-top: 0.4em;
  max-height: 4.15em;
  overflow: hidden;
`;

const ArticleCard = ({ article }) => {
  const {
    url,
    meta: { title, description, img },
  } = article;

  return (
    <ArticleCardBlock>
      <ArticleThumbnail src={img} alt="" />
      <StyledTitle href={url}>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
    </ArticleCardBlock>
  );
};

const ArticleList = ({ list }) => {
  return (
    <ArticleListBlock>
      {list.map((iter) => (
        <ArticleCard key={iter._id} article={iter} />
      ))}
    </ArticleListBlock>
  );
};

export default ArticleList;
