import React, { useEffect, useRef } from 'react';
import { Plane, Text, ShapeProps, useTexture } from '@react-three/drei';
import DDT_HOME_IMAGE from '@/assets/ddt_home.png';
import * as THREE from 'three';
import { useLoader, useThree } from 'react-three-fiber';
import { Mesh } from 'three';
import { useRecoilValue } from 'recoil';
import { controlState } from '@/store/atoms';

const COLOR = 0x999;

type Props = {
  setIsSlideShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Poster: React.FC<Props> = (props) => {
  const control = useRecoilValue(controlState);
  const dadatongRef = useRef<ShapeProps<typeof Plane>>();
  // const { gl } = useThree();
  const ddtHomeImg = useTexture(DDT_HOME_IMAGE);
  // gl.outputEncoding = THREE.sRGBEncoding;
  // const ddtHomeImg = useLoader(THREE.TextureLoader, DDT_HOME_IMAGE);
  // ddtHomeImg.wrapS = THREE.MirroredRepeatWrapping;
  // ddtHomeImg.wrapT = THREE.MirroredRepeatWrapping;
  // ddtHomeImg.anisotropy = gl.capabilities.getMaxAnisotropy();
  // ddtHomeImg.anisotropy = 100;

  // const m = new THREE.MeshBasicMaterial({
  //   map: ddtHomeImg, // front
  //   transparent: true,
  // });

  // if (m.map) {
  //   m.map.minFilter = THREE.LinearMipmapLinearFilter;
  //   m.map.magFilter = THREE.LinearFilter;
  // }

  // const cubeMaterial = [
  //   new THREE.MeshBasicMaterial({
  //     // color: 'pink', // left
  //   }),
  //   new THREE.MeshBasicMaterial({
  //     // color: 'orange', // right
  //   }),
  //   new THREE.MeshBasicMaterial({
  //     // color: 'green', // top
  //   }),
  //   new THREE.MeshBasicMaterial({
  //     // color: 'blue', // bottom
  //   }),
  //   m,
  //   // new THREE.MeshBasicMaterial({
  //   //   // transparent: true,
  //   // }),
  //   new THREE.MeshBasicMaterial({
  //     // color: 'yellow', // back
  //   }),
  // ];

  const onClick = () => {
    // props.setIsSlideShow(true);
    console.log('click');
    // control?.lock && control.lock();
    // control?.unlock && control.unlock();
  };

  useEffect(() => {
    if (!dadatongRef.current) return;

    (dadatongRef.current as any).click = () => {
      console.log('onclick');
    };
    console.log(dadatongRef.current);
  }, [dadatongRef]);

  return (
    <>
      <mesh position={[0, 2, -3.51]} name="test">
        <boxGeometry args={[5, 4, 1]} />
      </mesh>
      <mesh position={[0, 2, -3]} name="dadatong" ref={dadatongRef}>
        {/* <planeGeometry args={[4.8, 3, 1]} />
        <meshBasicMaterial map={ddtHomeImg} /> */}

        <Plane args={[4.8, 3, 1]}>
          <meshBasicMaterial map={ddtHomeImg} />
        </Plane>
        <group position={[0, 1.85, 0]}>
          <Text
            color="#0000A0" // default
            anchorX="center" // default
            anchorY="top" // default
            fontSize={0.2}
            letterSpacing={0.2}
          >
            DaDaTong
          </Text>
        </group>
      </mesh>
    </>
  );
};

export default Poster;
