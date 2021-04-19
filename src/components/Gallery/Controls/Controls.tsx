import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from 'react-three-fiber';

const raycaster = new THREE.Raycaster();

const Controls = () => {
  const { camera, gl } = useThree();
  const [mouse, setMouse] = useState<THREE.Vector2>();

  useFrame(() => {
    raycaster.setFromCamera(
      {
        x: mouse?.x || 0,
        y: mouse?.y || 0,
      },
      camera,
    );
  });

  useEffect(() => {
    // const windowHalfX = window.innerWidth / 2;
    // const windowHalfY = window.innerHeight / 2;

    const onMousemove = (event: MouseEvent) => {
      setMouse(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        return new THREE.Vector2(x, y);
      });
    };
    document.addEventListener('mousemove', onMousemove);
    return () => {
      document.removeEventListener('mousemove', onMousemove);
    };
  }, []);

  useEffect(() => {
    // console.log(mouse);

    const ondblclick = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      console.log(x, y);

      const vector = new THREE.Vector3(x, 0, 0);
      camera.lookAt(vector);
    };

    gl.domElement.addEventListener('dblclick', ondblclick);

    // raycaster.setFromCamera(
    //   {
    //     x: mouse?.x || 0,
    //     y: mouse?.y || 0,
    //   },
    //   camera,
    // );
    return () => {
      gl.domElement.addEventListener('dblclick', ondblclick);
    };
  }, [camera, gl.domElement]);

  return <></>;
};

export default Controls;
