import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/article';
import EditArticleModal from '../../components/article/EditArticleModal';
import { update } from '../../lib/api/articles';

const EditArticleModalContainer = ({
  visible,
  _id,
  tags: originTags,
  onCancel,
}) => {
  const dispatch = useDispatch();

  const { tags, newTag } = useSelector(({ article }) => ({
    tags: article.edit.tags,
    newTag: article.edit.newTag,
  }));

  useEffect(() => {
    visible &&
      dispatch(changeField({ form: 'edit', key: 'tags', value: originTags }));
    return () => {
      visible && dispatch(initializeForm('edit'));
    };
  }, [dispatch, visible, originTags]);

  const onChange = (e) => {
    const { value } = e.target;
    dispatch(changeField({ form: 'edit', key: 'newTag', value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (newTag.length === 0) return;
    dispatch(
      changeField({ form: 'edit', key: 'tags', value: [...tags, newTag] }),
    );
    dispatch(changeField({ form: 'edit', key: 'newTag', value: '' }));
  };
  const onConfirm = () => {
    try {
      update({ _id, tags });
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EditArticleModal
      visible={visible}
      tags={tags}
      newTag={newTag}
      onChange={onChange}
      onSubmit={onSubmit}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default EditArticleModalContainer;
