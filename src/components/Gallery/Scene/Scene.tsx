import React, { useEffect } from 'react';
// import { useThree } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import Controls2 from '../Controls/Controls2';
import PointerLockControls from '../Controls/PointerLockControls';

const Scene: React.FC = ({ children }) => {
  // const {
  //   camera,
  //   gl: { domElement },
  // } = useThree();

  return (
    <>
      {children}
      {/* <Controls2 /> */}
      <PointerLockControls />
      {/* args={[camera, domElement]}  */}
      {/* <OrbitControls maxPolarAngle={Math.PI / 2} /> */}
      <axesHelper args={[3]} />
      <gridHelper />
    </>
  );
};

export default Scene;
