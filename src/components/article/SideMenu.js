import React from 'react';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import qs from 'qs';
import Sticky from '../common/Sticky';
import palette from '../../lib/styles/palette';

const SideMenuBlock = styled.div`
  position: fixed;
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

const StyledLink = styled(Link)`
  display: block;
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

const TagLink = ({ tag, active }) => {
  const to = active ? '/' : `/?tag=${tag}`;
  return (
    <StyledLink to={to} active={active}>
      #{tag}
    </StyledLink>
  );
};

const SideMenu = ({ location, tags }) => {
  const query = qs.parse(location.search.slice(1));
  const { tag: activeTag } = query;
  return (
    <Sticky top={112}>
      <SideMenuBlock>
        <StyledTitle>태그</StyledTitle>
        {Array.isArray(tags) &&
          tags.map((tag) => <TagLink tag={tag} active={tag === activeTag} />)}
      </SideMenuBlock>
    </Sticky>
  );
};

export default withRouter(SideMenu);
