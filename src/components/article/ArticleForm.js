import React from 'react';
import styled from 'styled-components';

const ArticleFormBlock = styled.div`
  margin-top: 1rem;
`;

const StyledForm = styled.form`
  background: #f1f3f4;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  width: 100%;
  padding: 12px 16px 12px 16px;
  border-radius: 2px;
  border: none;
  outline: none;
  background: transparent;

  &:focus {
    background: white;
    color: #343a40;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ArticleForm = ({ form, onChange, onSubmit }) => {
  return (
    <ArticleFormBlock>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          name="url"
          placeholder="URL 저장 https://..."
          onChange={onChange}
          value={form.url}
        />
      </StyledForm>
    </ArticleFormBlock>
  );
};
export default ArticleForm;
