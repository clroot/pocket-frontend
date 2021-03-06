import client from './client';

export const getTags = () => client.get('/api/v1/user/tags');
export const removeTag = (tag) => client.delete(`/api/v1/user/tags/${tag}`);
export const emailVerify = ({ token }) =>
  client.post(`/api/v1/user/verify`, { token });
