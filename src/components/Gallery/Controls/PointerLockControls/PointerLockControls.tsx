import React, { useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import useMoveControls from './hooks/useMoveControls';
import { initRotationMatrices } from './PointerLockControlsHelper';

const velocity = new THREE.Vector3();
const SPEED = 4;
const DAMPING_FACTOR = 0.75;
let lastTime = 0;

const PointerLockControlsImpl: React.FC = () => {
  const { camera, gl, clock, scene } = useThree();
  const controlRef = useRef<PointerLockControls>(null);
  const [move, setMove] = useMoveControls();

  useFrame(() => {
    // const delta = clock.getDelta();
    if (!controlRef.current?.isLocked) return;
    const elapsed = clock.getElapsedTime();
    const delta = elapsed - lastTime;

    const hitTest = () => {
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);

      const rotationMatrices = initRotationMatrices();
      rotationMatrices.forEach((rotationMatrix) => {
        // Applying rotation for each direction:
        const cameraDirectionClone = cameraDirection.clone();
        cameraDirectionClone.applyMatrix4(rotationMatrix.value);
        // console.log(rotationMatrix.direction, direction);

        const cameraPosition = camera.position.clone();
        const rayCaster = new THREE.Raycaster(
          cameraPosition,
          cameraDirectionClone,
        );
        const intersects = rayCaster.intersectObject(scene, true);
        if (intersects.length > 0 && intersects[0].distance < 3) {
          console.log(rotationMatrix.direction, intersects[0].distance);

          setMove({
            direction: rotationMatrix.direction,
            value: false,
          });
        }
      });
    };

    const moveHandler = () => {
      if (controlRef.current?.moveForward && controlRef.current?.moveRight) {
        velocity.x += -1 * velocity.x * DAMPING_FACTOR;
        velocity.z += -1 * velocity.z * DAMPING_FACTOR;

        if (move.current.left) velocity.x -= 1 * SPEED;
        if (move.current.right) velocity.x += 1 * SPEED;
        if (move.current.forward) velocity.z -= 1 * SPEED;
        if (move.current.backward) velocity.z += 1 * SPEED;

        controlRef.current.moveForward(-velocity.z * delta);
        controlRef.current.moveRight(velocity.x * delta);
      }
    };

    hitTest();
    moveHandler();

    // gl.render(scene, camera);
    lastTime = elapsed;
  });

  return <PointerLockControls ref={controlRef} />;
};

export default PointerLockControlsImpl;
