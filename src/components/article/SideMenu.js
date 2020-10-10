import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import qs from 'qs';
import { FaTrash } from 'react-icons/fa';
import Sticky from '../common/Sticky';
import palette from '../../lib/styles/palette';
import * as bp from '../../lib/styles/breakPoints';

const SideMenuBlock = styled.div`
  padding-left: 0.5rem;
`;

const StyledTitle = styled.h4`
  line-height: 1.5;
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(233, 236, 239);
  margin-top: 0px;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const TagLinkBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  &:hover {
    background: ${palette.indigo[1]};
    border-radius: 5px;
  }

  & svg {
    margin-top: 4px;
    color: ${palette.indigo[3]};
  }
  @media ${bp.medium} {
    width: 90px;
  }
  @media ${bp.large} {
    width: 100px;
  }
  @media ${bp.extraLarge} {
    width: 125px;
  }
`;
const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  line-height: 1.5;

  ${(props) =>
    props.active &&
    css`
      font-weight: bold;
      color: ${palette.indigo[5]};
    `}
`;

const TagLink = ({ tag, active, makeTagRemoveCallback }) => {
  const to = active ? '/' : `/?tag=${tag}`;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <TagLinkBlock
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledLink to={to} active={active}>
        #{tag}
      </StyledLink>
      {isHovered && (
        <FaTrash onClick={makeTagRemoveCallback({ tag, active })} />
      )}
    </TagLinkBlock>
  );
};

const SideMenu = ({ location, tags, makeTagRemoveCallback }) => {
  const query = qs.parse(location.search.slice(1));
  const { tag: activeTag } = query;
  return (
    <Sticky top={138}>
      <SideMenuBlock>
        {Array.isArray(tags) && tags.length > 0 && (
          <StyledTitle>태그</StyledTitle>
        )}
        {Array.isArray(tags) &&
          tags.map((tag) => (
            <TagLink
              key={tag}
              tag={tag}
              active={tag === activeTag}
              makeTagRemoveCallback={makeTagRemoveCallback}
            />
          ))}
      </SideMenuBlock>
    </Sticky>
  );
};

export default withRouter(SideMenu);
