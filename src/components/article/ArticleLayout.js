import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const Block = styled(Responsive)`
  display: flex;
  margin-top: 2rem;
  padding: 0;
`;

const Main = styled.main`
  flex: 1;
`;
const Side = styled.aside`
  width: 12rem;

  @media (max-width: 1440px) {
    width: 8rem;
  }
  @media (max-width: 1312px) {
    width: 6rem;
  }
  @media (max-width: 944px) {
    display: none;
  }
`;

const ArticleLayout = ({ main, side }) => {
  return (
    <Block>
      <Side>{side}</Side>
      <Main>{main}</Main>
    </Block>
  );
};

export default ArticleLayout;
