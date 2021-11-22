import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
`;
const PageNumber = styled.div``;

const buildLink = ({ tag, page }) => {
  const query = qs.stringify({ tag, page });
  return `/?${query}`;
};

const Pagination = ({ page, lastPage, tag }) => {
  const isNextDisabled = page === lastPage || lastPage === 0;
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={page === 1 ? undefined : buildLink({ tag, page: page - 1 })}
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={isNextDisabled}
        to={isNextDisabled ? undefined : buildLink({ tag, page: page + 1 })}
      >
        다음
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;
