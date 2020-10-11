import React from 'react';
import styled, { css } from 'styled-components';
import { MdArrowBack } from 'react-icons/md';
import SideMenuContainer from '../../containers/article/SideMenuContainer';

const SideBarBlock = styled.div`
  position: fixed;
  width: 300px;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 35;
  background-color: white;
  ${(props) =>
    props.active
      ? css`
          box-shadow: 5px 0px 4px rgba(0, 0, 0, 0.1);
        `
      : ''}

  transform: translateX(-100%);
  animation: 0.2s ${(props) => (props.active ? 'slide-in' : 'slide-out')}
    forwards;

  @keyframes slide-in {
    0% {
      transform: translate(-100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  @keyframes slide-out {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-100%, 0);
      display: none;
    }
  }
`;

const SideBarHeader = styled.div`
  height: 4rem;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: 2px;
  padding-left: 0.5rem;

  & svg {
    position: relative;
    top: 1rem;
    font-size: 2rem;
  }
`;

const SideBarBody = styled.div`
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const SideBarBackground = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 30;
  display: block;
`;

const SideBar = ({ active = false, closeSideBar }) => {
  if (active === null) return null;
  return (
    <>
      <SideBarBlock active={active}>
        <SideBarHeader>
          <MdArrowBack onClick={closeSideBar} />
        </SideBarHeader>
        <SideBarBody>
          <SideMenuContainer />
        </SideBarBody>
      </SideBarBlock>
      {active && <SideBarBackground onClick={closeSideBar} />}
    </>
  );
};

export default SideBar;
