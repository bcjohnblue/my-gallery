import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from 'react-three-fiber';

// const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const MouseEvent: React.FC = () => {
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    console.log('MouseEvent useEffect');

    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();

      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);

      const raycaster = new THREE.Raycaster(camera.position, cameraDirection);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        console.log('intersects', intersects);
        intersects.forEach((item) => {
          if (item.object.name === 'dadatong') {
            (item.object as any).click();
          }
        });

        // intersects[0].object.callback();
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [
    camera,
    gl.domElement.clientHeight,
    gl.domElement.clientWidth,
    scene.children,
  ]);

  return <></>;
};

export default MouseEvent;
