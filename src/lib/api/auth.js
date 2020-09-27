import client from './client';

export const login = ({ email, password }) =>
  client.post('/api/v1/auth/login', { email, password });

export const register = ({ email, username, password }) =>
  client.post('/api/v1/auth/register', { email, username, password });

export const socialRegister = ({ email, username }) =>
  client.post('/api/v1/auth/social/register', { email, username });

export const check = () => client.get('/api/v1/auth/check');

export const logout = () => client.post('/api/v1/auth/logout');
