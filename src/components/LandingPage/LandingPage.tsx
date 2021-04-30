import React, { useState, useEffect } from 'react';
import usePointerLockValue from '@/hooks/usePointerLockValue';
import Styled from './LandingPageStyled';

const LandingPage: React.FC = () => {
  const [isShow, setIsShow] = useState(true);

  const isPointerLock = usePointerLockValue();
  useEffect(() => {
    setIsShow(!isPointerLock);
  }, [isPointerLock]);

  if (!isShow) return null;
  return (
    <Styled.Container>
      <Styled.Title>Click to Explore</Styled.Title>
      <br />
      Move: WASD
      <br />
      Look: MOUSE
      <br />
      Return: ESC
    </Styled.Container>
  );
};

export default LandingPage;
