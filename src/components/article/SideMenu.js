import React from 'react';
import styled from 'styled-components';
import Sticky from '../common/Sticky';

const SideMenuBlock = styled.div`
  position: fixed;
`;

const SideMenu = ({ tags }) => {
  return (
    <Sticky top={112}>
      <SideMenuBlock>
        {Array.isArray(tags) && tags.map((tag) => <p>#{tag}</p>)}
      </SideMenuBlock>
    </Sticky>
  );
};

export default SideMenu;
