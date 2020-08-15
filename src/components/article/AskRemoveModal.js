import React from 'react';
import Modal from '../common/Modal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      title="아티클 삭제"
      description="아티클을 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveModal;
