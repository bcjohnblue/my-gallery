import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Props as CanvasProps } from '@react-three/fiber/dist/declarations/src/web/Canvas';
import styled from 'styled-components';
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from 'recoil';

import Helper from './Helper/Helper';
import Scene from './Scene/Scene';
import Building from './Building/Building';
import Lights from './Lights/Lights';
import Controls from './Controls/PointerLockControls/PointerLockControls';
import MouseIcon from './Mouse/MouseIcon/MouseIcon';
import Loading from './Loading/Loading';

const Styled = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  `,
  NormalElement: styled.div``,
};

type Props = {
  setIsSlideShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default ((props) => {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  const canvasProps: Omit<CanvasProps, 'children'> = {
    className: 'full-width',
    gl: {
      antialias: true,
    },
    dpr: devicePixelRatio,
    camera: {
      fov: 60,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 1000,
      position: [-5, 2, 5],
    },
    onCreated: ({ camera }) => {
      camera.lookAt(-1, 2, -3);
    },
  };

  return (
    <Styled.Container>
      <Canvas {...canvasProps}>
        <RecoilBridge>
          <Controls />
          <Scene>
            <Lights />
            <Building setIsSlideShow={props.setIsSlideShow} />
          </Scene>
        </RecoilBridge>
        <Helper />
      </Canvas>
      <Styled.NormalElement>
        <Loading />
        <MouseIcon />
      </Styled.NormalElement>
    </Styled.Container>
  );
}) as React.FC<Props>;
