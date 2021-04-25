import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { Props as CanvasProps } from '@react-three/fiber/dist/declarations/src/web/Canvas';
import { Physics } from '@react-three/cannon';
import styled from 'styled-components';
import { Vector3 } from 'three';
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from 'recoil';
import Ground from './Ground/Ground';
import Scene from './Scene/Scene';
import Building from './Building/Building';
import Lights from './Lights/Lights';
import Controls from './Controls/PointerLockControls/PointerLockControls';
import MouseEvent from './Mouse/MouseEvent/MouseEvent';
import MouseIcon from './Mouse/MouseIcon/MouseIcon';

const Styled = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  `,
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
      // aspect: window.innerWidth / window.innerHeight,
      // near: 1,
      // far: 1000,
      position: [-5, 2, 5],
      // lookAt: () => {
      //   return new Vector3(0, 2, -3);
      // },
      // position: [-3, 3, -3],
    },
    onCreated: ({ camera }) => {
      camera.lookAt(-1, 2, -3);
      // console.log(camera);
    },
  };

  return (
    <Styled.Container>
      <Canvas {...canvasProps}>
        <RecoilBridge>
          <Lights />
          <MouseEvent />
          <Scene>
            <Controls />
            <Building setIsSlideShow={props.setIsSlideShow} />
            <Physics>
              <Suspense fallback={null}>
                <Ground />
              </Suspense>
            </Physics>
          </Scene>
        </RecoilBridge>
      </Canvas>
      <MouseIcon />
    </Styled.Container>
  );
}) as React.FC<Props>;
