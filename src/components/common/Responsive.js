import React from 'react';
import styled from 'styled-components';
import * as bp from '../../lib/styles/breakPoints';

const ResponsiveBlock = styled.div`
  overflow-x: hidden;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0 auto;

  @media ${bp.medium} {
    width: calc(100% - 2rem);
  }
  @media ${bp.large} {
    max-width: 1440px;
  }
`;

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
