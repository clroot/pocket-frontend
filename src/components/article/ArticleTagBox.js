import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-bottom: 1rem;
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  border: 1px solid ${palette.gray[9]};
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
  }
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const Tag = styled.div`
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  height: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: ${palette.indigo[6]};
  margin-right: 0.75rem;
  cursor: pointer;
  margin-bottom: 0.75rem;
  border-radius: 1rem;
  background: ${palette.gray[2]};
  transition: all 0.125s ease-in 0s;
  animation: 0.125s ease-in-out 0s 1 normal forwards running iMKika;

  &:hover {
    opacity: 0.6;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const TagItem = React.memo(({ tag, onClick }) => (
  <Tag onClick={onClick}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => {
  const onClick = (tag) => (e) => {
    console.log(e);
    onRemove(tag);
  };

  return (
    <TagListBlock>
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} onClick={onClick(tag)} />
      ))}
    </TagListBlock>
  );
});

const TagBox = ({ tags, newTag, onChange, onRemove, onSubmit }) => {
  return (
    <TagBoxBlock>
      <TagForm onSubmit={onSubmit}>
        <input
          name="newTag"
          placeholder="태그를 입력하세요"
          value={newTag}
          onChange={onChange}
        />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={tags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
