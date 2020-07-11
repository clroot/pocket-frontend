import client from './client';

//TODO: 페이지네이션 및 태그 필터링
export const list = () => client.get('/api/v1/articles');

export const save = ({ url, tags = [] }) =>
  client.post('/api/v1/articles', { url, tags });
