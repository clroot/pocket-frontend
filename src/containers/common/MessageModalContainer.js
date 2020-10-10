import React from 'react';
import { useSelector } from 'react-redux';
import MessageModal from '../../components/common/MessageModal';

const MessageModalContainer = () => {
  const { ssm } = useSelector(({ user }) => ({ ssm: user.ssm }));
  const { type, status } = ssm;
  return <MessageModal type={type} status={status} />;
};

export default MessageModalContainer;
