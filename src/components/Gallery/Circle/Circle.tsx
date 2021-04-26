import React, { useState, useEffect } from 'react';
import { useThree, MeshProps } from 'react-three-fiber';
import { getInterSectObject } from '@/helpers';

const STATIC_OPACITY = 0.3;
const HOVER_OPACITY = 1;

type Props = MeshProps;
const Circle = React.forwardRef<MeshProps, Props>((props, ref) => {
  const { camera } = useThree();

  const [opacity, setOpacity] = useState(STATIC_OPACITY);
  useEffect(() => {
    if (!ref) return;

    const onMousemove = (event: MouseEvent) => {
      event.preventDefault();
      // console.log('onMouseDown');

      const refCopy = ref as React.RefObject<MeshProps>;
      const object = (refCopy.current as unknown) as THREE.Object3D;
      const intersects = getInterSectObject(object, camera);

      const isHover = intersects.length;
      setOpacity(isHover ? HOVER_OPACITY : STATIC_OPACITY);
    };

    document.addEventListener('mousemove', onMousemove);
    return () => {
      document.removeEventListener('mousemove', onMousemove);
    };
  }, [camera, props, ref]);

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <ringGeometry args={[0.2, 0.5, 64]} />
      <meshBasicMaterial opacity={opacity} transparent />
    </mesh>
  );
});

export default Circle;
