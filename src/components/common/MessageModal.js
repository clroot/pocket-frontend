import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';

const TextBlock = styled.div`
  margin-bottom: 1rem;
`;

const MessageModal = ({ type, status }) => {
  const [visible, setVisible] = useState(true);
  const closeModal = () => {
    setVisible(false);
  };

  const textMap = {
    'email-verify': {
      success: '이메일 인증이 완료되었습니다.',
      'already-verified': '이미 이메일 인증이 완료되었습니다.',
      error: '이메일 인증이 실패하였습니다. 잠시 후 다시 링크를 방문해주세요.',
    },
  };

  const message = textMap[type] && textMap[type][status];

  if (!type || !message) return null;
  return (
    <Modal
      visible={visible}
      title="알림"
      onConfirm={closeModal}
      onCancel={closeModal}
      renderConfirmOnly={true}
    >
      <TextBlock>{message}</TextBlock>
    </Modal>
  );
};

export default MessageModal;
