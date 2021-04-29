import React, { useEffect, useRef, useMemo } from 'react';
import { Plane, Text, useTexture } from '@react-three/drei';
import DDT_HOME_IMAGE from '@/assets/ddt_home.png';
import * as THREE from 'three';
import { useThree, MeshProps, useLoader } from 'react-three-fiber';
import { useRecoilValue } from 'recoil';
import { controlState } from '@/store/atoms';
import CircleMarker from '@/components/Gallery/CircleMarker/CircleMarker';
import { getInterSectObject } from '@/helpers';

import fontPath from '@/assets/fonts/font.woff';
import fontBlob from '@/assets/fonts/bold.blob';
import fontJson from '@/assets/fonts/helvetiker_regular.typeface.json';

type Props = {
  setIsSlideShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Poster: React.FC<Props> = (props) => {
  const { camera } = useThree();

  const font = new THREE.FontLoader().parse(fontJson);

  // const font = useRef<THREE.Font>(new THREE.FontLoader().parse(fontJson));
  // useEffect(() => {
  //   font.current = new THREE.FontLoader().parse(fontJson);
  // }, []);
  // const font = useLoader<THREE.Font, string>(
  //   THREE.FontLoader,
  //   fontJson,
  // );
  const fontConfig = useMemo(
    () => ({
      font,
      size: 0.2,
      height: 0.2,
      // curveSegments: 32,
      // bevelEnabled: true,
      // bevelThickness: 6,
      // bevelSize: 2.5,
      // bevelOffset: 0,
      // bevelSegments: 8,
    }),
    [font],
  );

  const control = useRecoilValue(controlState);
  const ddtHomeImg = useTexture(DDT_HOME_IMAGE);

  const circleRef = useRef<MeshProps>(null);
  useEffect(() => {
    if (!circleRef) return;

    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();

      const circleObject = (circleRef.current as unknown) as THREE.Object3D;
      const intersects = getInterSectObject(circleObject, camera);

      if (intersects.length > 0) {
        // console.log('intersects', intersects);
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
          <group position={[-0.6, 1.65, 0]}>
            <mesh>
              <textGeometry args={['DaDaTong', fontConfig]} />
              <meshNormalMaterial />
            </mesh>
            {/* <Text
              font={font}
              color="#0000A0" // default
              anchorX="center" // default
              anchorY="top" // default
              fontSize={0.2}
              letterSpacing={0.2}
            >
              DaDaTong
            </Text> */}
          </group>
        </mesh>
      </group>
      <CircleMarker ref={circleRef} position={[0, 0, -1.5]} />
    </>
  );
};

export default Poster;
