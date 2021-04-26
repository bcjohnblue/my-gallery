import React, { useEffect, useRef } from 'react';
import { Plane, Text, useTexture } from '@react-three/drei';
import DDT_HOME_IMAGE from '@/assets/ddt_home.png';
import * as THREE from 'three';
import { useThree, MeshProps } from 'react-three-fiber';
import { useRecoilValue } from 'recoil';
import { controlState } from '@/store/atoms';
import Circle from '@/components/Gallery/Circle/Circle';
import { getInterSectObject } from '@/helpers';

type Props = {
  setIsSlideShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Poster: React.FC<Props> = (props) => {
  const { camera } = useThree();

  const control = useRecoilValue(controlState);
  const ddtHomeImg = useTexture(DDT_HOME_IMAGE);

  const circleRef = useRef<MeshProps>(null);
  useEffect(() => {
    if (!circleRef) return;
    console.log('Circle useEffect');

    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();

      const object = (circleRef.current as unknown) as THREE.Object3D;
      const intersects = getInterSectObject(object, camera);

      if (intersects.length > 0) {
        console.log('intersects', intersects);
        props.setIsSlideShow(true);
        control?.unlock && control?.unlock();
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [camera, circleRef, control, props]);

  return (
    <>
      <group position={[0, 2, -3.5]}>
        <mesh>
          <boxGeometry args={[5, 4, 1]} />
        </mesh>
        <mesh position={[0, 0, 0.51]}>
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
      </group>
      <Circle ref={circleRef} position={[0, 0, -1.5]} />
    </>
  );
};

export default Poster;
