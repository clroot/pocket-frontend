import React from 'react';
import Modal from '../common/Modal';
import ArticleTagBox from './ArticleTagBox';

const EditArticleModal = ({
  visible,
  tags,
  newTag,
  onChange,
  onRemove,
  onSubmit,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      title="태그 편집"
      confirmText="저장"
      width="420px"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <ArticleTagBox
        tags={tags}
        newTag={newTag}
        onChange={onChange}
        onRemove={onRemove}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default EditArticleModal;
