import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Responsive from '../common/Responsive';
import * as bp from '../../lib/styles/breakPoints';

const Block = styled(Responsive)`
  display: flex;
  margin-top: 2rem;
  padding: 0;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  @media ${bp.medium} {
    width: 90%;
  }
`;
const Side = styled.aside`
  width: 0%;
  @media ${bp.medium} {
    width: 10%;
  }
`;

const ArticleLayout = ({ main, side }) => {
  const isMedium = useMediaQuery({ query: bp.medium });

  return (
    <Block>
      <Main>{main}</Main>
      {isMedium && <Side>{side}</Side>}
    </Block>
  );
};

export default ArticleLayout;
