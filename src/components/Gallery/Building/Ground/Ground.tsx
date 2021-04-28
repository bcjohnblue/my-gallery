import React from 'react';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import WoodImg from '@/assets/Textures/wood.png';

const SIZE = 5;

const Ground: React.FC = () => {
  const marbleMap = useLoader<THREE.Texture, string>(
    THREE.TextureLoader,
    WoodImg,
  );
  marbleMap.wrapS = THREE.MirroredRepeatWrapping;
  marbleMap.wrapT = THREE.MirroredRepeatWrapping;
  marbleMap.repeat.set(SIZE, SIZE);

  return (
    <>
      <Plane
        args={[100, 100]}
        position={[0, -0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshBasicMaterial transparent map={marbleMap} />
      </Plane>
    </>
  );
};

export default Ground;
