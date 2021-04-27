import React, { useState } from 'react';
import styled from 'styled-components';
import LandingPage from '@/components/LandingPage/LandingPage';
import Gallery from '@/components/Gallery/Gallery';
import SlideShow from '@/components/SlideShow/SlideShow';

/* Styles */
import '@/styles/index.css';

/* State Management */
import { RecoilRoot } from 'recoil';

const Styled = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  `,
};

type Props = Record<string, never>;

export default (() => {
  const [isSlideShow, setIsSlideShow] = useState(false);

  return (
    <RecoilRoot>
      <Styled.Container>
        <LandingPage />
        <Gallery setIsSlideShow={setIsSlideShow} />
        <SlideShow isShow={isSlideShow} setIsSlideShow={setIsSlideShow} />
      </Styled.Container>
    </RecoilRoot>
  );
}) as React.FC<Props>;
