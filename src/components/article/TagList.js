import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Link, withRouter } from 'react-router-dom';
import qs from 'qs';
import { FaTrash } from 'react-icons/fa';
import Sticky from '../common/Sticky';
import palette from '../../lib/styles/palette';
import * as bp from '../../lib/styles/breakPoints';

const TagListBlock = styled.div`
  padding-left: 0.5rem;
`;

const StyledTitle = styled.h4`
  line-height: 1.5;
  font-size: 0.875rem;
  margin-top: 0px;
  margin-bottom: 0.5rem;
  font-weight: bold;
  @media ${bp.medium} {
    border-bottom: 1px solid rgb(233, 236, 239);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const TagBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  &:hover {
    background: ${palette.indigo[1]};
    border-radius: 5px;
  }

  & svg {
    position: relative;
    top: 4px;
    right: 10px;
    color: ${palette.indigo[3]};
    @media ${bp.medium} {
      right: 0;
    }
  }
  @media ${bp.medium} {
    width: 90px;
    padding-left: 10px;
    padding-right: 10px;
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

const Tag = ({ tag, active, makeTagRemoveCallback }) => {
  const to = active ? '/' : `/?tag=${tag}`;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <TagBlock
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledLink to={to} active={active}>
        #{tag}
      </StyledLink>
      {isHovered && (
        <FaTrash onClick={makeTagRemoveCallback({ tag, active })} />
      )}
    </TagBlock>
  );
};

const TagList = ({ location, tags, makeTagRemoveCallback }) => {
  const query = qs.parse(location.search.slice(1));
  const { tag: activeTag } = query;

  return (
    <TagListBlock>
      <StyledTitle>태그</StyledTitle>
      {tags?.length === 0 && <p>저장된 태그가 없습니다.</p>}
      {tags?.map((tag) => (
        <Tag
          key={tag}
          tag={tag}
          active={tag === activeTag}
          makeTagRemoveCallback={makeTagRemoveCallback}
        />
      ))}
    </TagListBlock>
  );
};

const TagListWrapper = (props) => {
  const isMedium = useMediaQuery({ query: bp.medium });
  return isMedium ? (
    <Sticky top={138}>
      <TagList {...props} />
    </Sticky>
  ) : (
    <TagList {...props} />
  );
};

export default withRouter(TagListWrapper);
