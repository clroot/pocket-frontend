import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, save } from '../../modules/article';
import ArticleForm from '../../components/article/ArticleForm';

const ArticleFormContainer = () => {
  const dispatch = useDispatch();

  const { form } = useSelector(({ article }) => ({
    form: article.newArticle,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'newArticle', key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //TODO: form validation
    dispatch(changeField({ form: 'newArticle', key: 'url', value: '' }));
    const { url } = form;
    dispatch(save({ url }));
  };

  return <ArticleForm form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default ArticleFormContainer;
