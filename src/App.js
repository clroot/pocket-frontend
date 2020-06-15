import React from 'react';
import { Route } from 'react-router-dom';
import ArticleListPage from './pages/ArticleListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <>
      <Route component={ArticleListPage} path="/" exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
    </>
  );
};

export default App;
