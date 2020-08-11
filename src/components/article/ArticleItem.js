import React, { useState } from 'react';
import styled from 'styled-components';

import { FaEdit, FaTrash } from 'react-icons/fa';
import AskRemoveModal from './AskRemoveModal';
import palette from '../../lib/styles/palette';

const ArticleItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 16rem;
  margin: 0.5rem;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  border-radius: 4px;
  transition: box-shadow 0.25s ease-in 0s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 20px 0px;
  }
`;

const ArticleThumbnail = styled.img`
  display: block !important;
  box-sizing: border-box;
  position: relative;
  height: 170px;
  min-height: 170px;
  width: 100%;
  margin: 0;
  background-size: cover;
`;

const ArticleContent = styled.a`
  padding: 1rem;
  text-decoration: none;
`;

const StyledTitle = styled.h4`
  font-size: 1rem;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
  color: rgb(33, 37, 41);
  margin: 0px 0px 0.25rem;
`;

const StyledDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  height: 65px;
  color: rgb(79, 79, 79);
  padding-top: 0.4em;
  overflow: hidden;
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1.5;
  -webkit-box-pack: justify;
  padding: 0.625rem 1rem;
  border-top: 1px solid rgb(248, 249, 250);
  & * {
    margin-left: 6px;
  }
`;
const ArticleItem = ({ article, onRemove }) => {
  const {
    _id,
    url,
    meta: { title, description, img },
  } = article;

  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove(_id);
  };

  return (
    <ArticleItemBlock>
      <ArticleThumbnail src={img} alt="" />
      <ArticleContent href={url} target="_blank">
        <StyledTitle>{title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
      </ArticleContent>
      <ArticleFooter>
        <FaEdit style={{ color: palette.gray[6] }} />
        <FaTrash onClick={onRemoveClick} style={{ color: palette.gray[6] }} />
      </ArticleFooter>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onRemove={onRemove}
      />
    </ArticleItemBlock>
  );
};

export default ArticleItem;
