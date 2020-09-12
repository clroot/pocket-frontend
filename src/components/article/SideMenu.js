import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Sticky from '../common/Sticky';

const SideMenuBlock = styled.div`
  position: fixed;
`;

const SideMenu = ({ tags }) => {
  return (
    <Sticky top={112}>
      <SideMenuBlock>
        {Array.isArray(tags) &&
          tags.map((tag) => (
            <Link to={`/?tag=${tag}`}>
              <p key={tag}>#{tag}</p>
            </Link>
          ))}
      </SideMenuBlock>
    </Sticky>
  );
};

export default SideMenu;
