import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  overflow-x: hidden;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1728px;
  margin: 0 auto;

  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1280px;
  }
  @media (max-width: 1312px) {
    width: 912px;
  }
  @media (max-width: 944px) {
    width: calc(100% - 2rem);
  }
`;

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
