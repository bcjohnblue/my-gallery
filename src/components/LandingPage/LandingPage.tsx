import React, { useState, useEffect } from 'react';
import Styled from './LandingPageStyled';

const LandingPage: React.FC = () => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const onPointerlockchange = () => {
      const isPointerLock = document.pointerLockElement;
      setIsShow(!isPointerLock);
    };

    document.addEventListener('pointerlockchange', onPointerlockchange, false);
    return () => {
      document.addEventListener(
        'pointerlockchange',
        onPointerlockchange,
        false,
      );
    };
  }, []);

  if (!isShow) return null;
  return (
    <Styled.Container>
      <Styled.Title>Click to Explore</Styled.Title>
      <br />
      Move: WASD
      <br />
      Look: MOUSE
    </Styled.Container>
  );
};

export default LandingPage;
