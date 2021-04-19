import React, { useMemo } from 'react';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { usePlane } from '@react-three/cannon';
import WoodImg from '@/assets/Textures/wood.png';

const Ground: React.FC = () => {
  const size = 5;

  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.2, 22],
  }));

  const marbleMap = useLoader<THREE.Texture, string>(
    THREE.TextureLoader,
    WoodImg,
  );

  // const marbleMap = useMemo(
  // 	() => new THREE.TextureLoader().load('assets/Textures/BazaltMarble/BAZALT-diffuse.jpg'),
  // 	[]
  // );
  marbleMap.wrapS = THREE.MirroredRepeatWrapping;
  marbleMap.wrapT = THREE.MirroredRepeatWrapping;
  marbleMap.repeat.set(size, size);

  // const marbleAlphaMap = useLoader<THREE.Texture, string>(
  //   THREE.TextureLoader,
  //   BAZALTAo,
  // );

  // marbleAlphaMap.wrapS = THREE.MirroredRepeatWrapping;
  // marbleAlphaMap.wrapT = THREE.MirroredRepeatWrapping;
  // marbleAlphaMap.repeat.set(size, size);

  // const marbleNormalMap = useLoader<THREE.Texture, string>(
  //   THREE.TextureLoader,
  //   BAZALTNormal,
  // );

  // marbleNormalMap.wrapS = THREE.MirroredRepeatWrapping;
  // marbleNormalMap.wrapT = THREE.MirroredRepeatWrapping;
  // marbleNormalMap.repeat.set(size, size);

  return (
    <>
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshPhysicalMaterial
          transparent
          attach="material"
          // clearcoat={1}
          // reflectivity={0}
          // roughness={0.5}
          // metalness={0.3}
        >
          <primitive attach="map" object={marbleMap} />
          {/* <primitive attach="alphaMap" object={marbleAlphaMap} /> */}
          {/* <primitive attach="normalMap" object={marbleNormalMap} /> */}
        </meshPhysicalMaterial>
      </mesh>
    </>
  );
};

export default Ground;
