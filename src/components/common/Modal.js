import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBlock = styled.div`
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const Modal = ({
  visible,
  title,
  description,
  width = '320px',
  children = undefined,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  renderConfirmOnly = false,
}) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    const onKeyup = (e) => {
      const keyCode = e?.keyCode ?? e?.which;
      if (keyCode === 27) {
        onCancel();
      }
    };

    window.addEventListener('keyup', onKeyup);
    return () => {
      window.removeEventListener('keyup', onKeyup);
    };
  }, [onCancel]);

  if (!visible) return null;

  return (
    <Fullscreen onClick={onCancel}>
      <ModalBlock onClick={stopPropagation} width={width}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        {children}
        <div className="buttons">
          {!renderConfirmOnly && (
            <StyledButton onClick={onCancel}>{cancelText}</StyledButton>
          )}
          <StyledButton cyan onClick={onConfirm}>
            {confirmText}
          </StyledButton>
        </div>
      </ModalBlock>
    </Fullscreen>
  );
};

export default Modal;
