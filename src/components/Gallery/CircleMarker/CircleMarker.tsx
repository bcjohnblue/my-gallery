import React, { useState, useEffect } from 'react';
import { useThree, MeshProps } from 'react-three-fiber';
import { getInterSectObject } from '@/helpers';
import usePointerLockValue from '@/hooks/usePointerLockValue';

const STATIC_OPACITY = 0.3;
const HOVER_OPACITY = 1;

type Props = MeshProps;
const CircleMarker = React.forwardRef<MeshProps, Props>((props, ref) => {
  const { camera } = useThree();

  const [
    isAddMousemoveEventListener,
    setIsAddMousemoveEventListener,
  ] = useState(false);
  const isPointerLock = usePointerLockValue();
  useEffect(() => {
    setIsAddMousemoveEventListener(isPointerLock);
  }, [isPointerLock]);

  const [opacity, setOpacity] = useState(STATIC_OPACITY);
  useEffect(() => {
    if (!ref) return;

    const onMousemove = (event: MouseEvent) => {
      event.preventDefault();

      const refCopy = ref as React.RefObject<MeshProps>;
      const object = (refCopy.current as unknown) as THREE.Object3D;
      const intersects = getInterSectObject(object, camera);

      const isHover = intersects.length;
      setOpacity(isHover ? HOVER_OPACITY : STATIC_OPACITY);
    };

    isAddMousemoveEventListener
      ? document.addEventListener('mousemove', onMousemove)
      : document.removeEventListener('mousemove', onMousemove);
    return () => {
      document.removeEventListener('mousemove', onMousemove);
    };
  }, [camera, props, ref, isAddMousemoveEventListener]);

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <ringGeometry args={[0.2, 0.5, 64]} />
      <meshBasicMaterial opacity={opacity} color="#47a3da" transparent />
    </mesh>
  );
});

export default CircleMarker;
