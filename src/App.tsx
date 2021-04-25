import React, { useState } from 'react';
import styled from 'styled-components';
import SlideShow from '@/components/SlideShow/SlideShow';
import Gallery from '@/components/Gallery/Gallery';

/* Styles */
import '@/styles/index.css';

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
        <Gallery setIsSlideShow={setIsSlideShow} />
        {isSlideShow ? (
          <SlideShow isShow={isSlideShow} setIsSlideShow={setIsSlideShow} />
        ) : null}
      </Styled.Container>
    </RecoilRoot>
  );
}) as React.FC<Props>;
