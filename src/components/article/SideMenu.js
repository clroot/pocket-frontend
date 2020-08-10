import React from 'react';
import styled from 'styled-components';
import Sticky from '../common/Sticky';

const SideMenuBlock = styled.div`
  position: fixed;
`;

const SideMenu = () => {
  return (
    <Sticky top={112}>
      <SideMenuBlock>SideMenu</SideMenuBlock>
    </Sticky>
  );
};

export default SideMenu;
