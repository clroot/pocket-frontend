import client from './client';

export const getTags = () => client.get('/api/v1/user/tags');
