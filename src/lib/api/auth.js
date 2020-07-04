import client from './client';

export const login = ({ username, password }) =>
  client.post('/api/v1/auth/login', { username, password });

export const register = ({ username, password }) =>
  client.post('/api/v1/auth/register', { username, password });

export const check = () => client.get('/api/v1/auth/check');

export const logout = () => client.post('/api/v1/auth/logout');
