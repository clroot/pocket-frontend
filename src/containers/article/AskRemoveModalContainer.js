import React from 'react';
import { useDispatch } from 'react-redux';
import { remove } from '../../modules/article';
import AskRemoveModal from '../../components/article/AskRemoveModal';

const AskRemoveModalContainer = ({ visible, _id, onCancel }) => {
  const dispatch = useDispatch();

  const onConfirm = () => {
    dispatch(remove({ _id }));
  };

  return (
    <AskRemoveModal
      visible={visible}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveModalContainer;
