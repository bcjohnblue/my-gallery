import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Canvas, ContainerProps, useThree } from 'react-three-fiber';
import { Physics } from '@react-three/cannon';
import styled from 'styled-components';
import { Vector3 } from 'three';
import Ground from './Ground/Ground';
import Scene from './Scene/Scene';
import Building from './Building/Building';
import Lights from './Lights/Lights';
import Controls from './Controls/Controls';

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
  const canvasProps: Omit<ContainerProps, 'children'> = {
    className: 'full-width',
    gl: {
      antialias: true,
    },
    pixelRatio: devicePixelRatio,
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
      console.log(camera);
    },
  };

  return (
    <Styled.Container>
      <Canvas {...canvasProps}>
        <Lights />
        <Scene>
          <Controls />
          <Building setIsSlideShow={props.setIsSlideShow} />
          <Physics>
            <Suspense fallback={null}>
              <Ground />
            </Suspense>
          </Physics>
        </Scene>
      </Canvas>
    </Styled.Container>
  );
}) as React.FC<Props>;
