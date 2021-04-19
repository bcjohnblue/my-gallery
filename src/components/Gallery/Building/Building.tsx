import React, { Suspense } from 'react';
import { MeshProps } from 'react-three-fiber';
import * as THREE from 'three';
import Walls from './Walls/Walls';
import Poster from './Poster/Poster';

type Props = {
  setIsSlideShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Building: React.FC<Props> = (props) => {
  return (
    <>
      <Suspense fallback={null}>
        <Walls />
        <Poster setIsSlideShow={props.setIsSlideShow} />
      </Suspense>
    </>
    // <mesh {...props}>
    //   <boxGeometry args={[0.1, 10, 40]} />
    //   <meshBasicMaterial color={0xcccccc} />
    // </mesh>
  );
};

export default Building;
