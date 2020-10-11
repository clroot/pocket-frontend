import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { getScrollTop } from '../../lib/utils';

const StickyBlock = styled.div``;

const Sticky = ({ className, top, children }) => {
  const [width, setWidth] = useState(null);
  const element = useRef(null);
  const [fixed, setFixed] = useState(false);

  const setup = useCallback(() => {
    if (!element.current) return;
    const pos = element.current.getBoundingClientRect();
    setWidth(pos.width);
  }, [element]);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextFixed = scrollTop > 0;
    if (fixed !== nextFixed) {
      setFixed(nextFixed);
    }
  }, [fixed]);

  useEffect(() => {
    setup();
  }, [setup]);

  // register scroll event
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <StickyBlock
      ref={element}
      className={className}
      style={{
        position: fixed ? 'fixed' : undefined,
        top: fixed ? top : undefined,
        width: fixed && width ? width : undefined,
      }}
    >
      {children}
    </StickyBlock>
  );
};

export default Sticky;
