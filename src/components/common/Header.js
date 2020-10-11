import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMenu } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import Responsive from './Responsive';
import Button from './Button';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import * as bp from '../../lib/styles/breakPoints';

const HeaderBlock = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background: ${palette.gray[0]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    span {
      margin-right: 5px;
      svg {
        position: relative;
        top: 2px;
      }
    }
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
  const isExtraSmall = useMediaQuery({ query: bp.extraSmall });
  const isMedium = useMediaQuery({ query: bp.medium });
  const [activeSideBar, setActiveSideBar] = useState(null);

  const openSideBar = () => {
    setActiveSideBar(true);
  };
  const closeSideBar = () => {
    setActiveSideBar(false);
  };

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="left">
            {isExtraSmall && !isMedium && (
              <span>
                <AiOutlineMenu onClick={openSideBar} />
              </span>
            )}
            <Link to="/">Pocket</Link>
          </div>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
      {isExtraSmall && !isMedium && (
        <SideBar active={activeSideBar} closeSideBar={closeSideBar}></SideBar>
      )}
    </>
  );
};

export default Header;
