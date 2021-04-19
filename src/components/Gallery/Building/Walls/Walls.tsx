import React, { useEffect, useMemo, useRef } from 'react';
import { MeshProps, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { Mesh, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF, useTexture } from '@react-three/drei';
import GLTF from '@/components/GLTF/Index';

const COLOR = 0xcccccc;

const WALL_WIDTH = 40;
const WALL_HALF_INTERVAL = 20;
const WALL_HEIGHT = 20;
const WALL_THICKNESS = 0.1;

const FrontWall: React.FC = () => {
  return (
    <mesh position={[0, 0, -WALL_WIDTH / 2]} rotation={[0, -Math.PI / 2, 0]}>
      <boxGeometry
        args={[WALL_THICKNESS, WALL_HEIGHT, WALL_HALF_INTERVAL * 2]}
      />
      <meshBasicMaterial color={COLOR} />
    </mesh>
  );
};

const BackWall: React.FC = () => {
  return (
    <mesh position={[0, 0, WALL_WIDTH / 2]} rotation={[0, -Math.PI / 2, 0]}>
      <boxGeometry
        args={[WALL_THICKNESS, WALL_HEIGHT, WALL_HALF_INTERVAL * 2]}
      />
      <meshBasicMaterial color={COLOR} />
    </mesh>
  );
};

const LeftWall: React.FC = () => {
  return (
    <mesh position={[-WALL_HALF_INTERVAL, 0, 0]}>
      <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, WALL_WIDTH]} />
      <meshBasicMaterial color={COLOR} />
    </mesh>
  );
};

const RightWall: React.FC = () => {
  return (
    <mesh position={[WALL_HALF_INTERVAL, 0, 0]}>
      <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, WALL_WIDTH]} />
      <meshBasicMaterial color={COLOR} />
    </mesh>
  );
};

const Walls: React.FC = () => {
  // const { camera } = useThree();
  // useEffect(() => {
  //   setTimeout(() => {
  //     camera.lookAt(new Vector3(0, 10, -2));
  //     camera.updateProjectionMatrix();
  //     console.log(camera);
  //   }, 2000);
  // }, [camera]);

  return (
    <>
      <FrontWall />
      <BackWall />
      <LeftWall />
      <RightWall />
      {/* <GLTF /> */}
    </>
  );
};

export default Walls;
