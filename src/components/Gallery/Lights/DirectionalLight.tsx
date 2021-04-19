import React, { useMemo } from 'react';
import { PrimitiveProps } from 'react-three-fiber';
import * as THREE from 'three';

type Props = Omit<PrimitiveProps, 'object'>;
const DirectionalLight: React.FC<Props> = (props: Props) => {
  const {
    position,
    target,
    intensity,
    color,
    shadowCamBot,
    shadowCamTop,
    shadowCamL,
    shadowCamR,
  } = props;
  const light = useMemo(() => new THREE.DirectionalLight(), []);

  return (
    <>
      <primitive
        castShadow
        color={color}
        object={light}
        position={position}
        intensity={intensity}
        shadow-camera-bottom={shadowCamBot}
        shadow-camera-top={shadowCamTop}
        shadow-camera-left={shadowCamL}
        shadow-camera-right={shadowCamR}
        decay={2}
      />
      <primitive object={light.target} position={target} />
      {/* <primitive object={new THREE.DirectionalLightHelper(light)} /> */}
    </>
  );
};

export default DirectionalLight;
