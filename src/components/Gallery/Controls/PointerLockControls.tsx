import React, { useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import useMoveControls from './hooks/useMoveControls';
import { initRotationMatrices } from './PointerLockControlsHelper';

const raycaster = new THREE.Raycaster();

const velocity = new THREE.Vector3();
// const direction = new THREE.Vector3();

const speed = 4;
let lastTime = 0;

const mouse = new THREE.Vector2();

function onMouseMove(event: any) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

const PointerLockControlsImpl = () => {
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
      // console.log('rotation', camera.rotation);
      // var cameraDirection = self.getDirection2(new THREE.Vector3(0, 0, 0)).clone();
      // console.log(mouseDirection);

      const rotationMatrices = initRotationMatrices();
      rotationMatrices.forEach((rotationMatrix) => {
        // Applying rotation for each direction:
        const cameraDirectionClone = cameraDirection.clone();
        cameraDirectionClone.applyMatrix4(rotationMatrix.value);
        // console.log(rotationMatrix.direction, direction);

        const cameraPosition = camera.position.clone();
        // originPoint.applyEuler(camera.rotation);
        const rayCaster = new THREE.Raycaster(
          cameraPosition,
          cameraDirectionClone,
        );
        // if (rotationMatrix.direction === 'left') {
        //   console.log('originPoint', originPoint);
        //   console.log('mouseDirection', mouseDirection);
        // }
        const intersects = rayCaster.intersectObject(scene, true);
        if (intersects.length > 0 && intersects[0].distance < 3) {
          // console.log(rotationMatrix.direction, intersects[0].distance);
          setMove((prevMove) => ({
            ...prevMove,
            [rotationMatrix.direction]: false,
          }));

          // lockDirectionByIndex(i);
          // hitObjects.push(intersects[0]);
          // console.log(intersects[0].object.name, i);
        }
        // if (rotationMatrix.direction === 'left') {
        //   console.log(rotationMatrix.direction, intersects);
        // }
      });
    };
    hitTest();

    // const originPoint = camera.position.clone();
    // camera.getWorldDirection(mouseDirection);
    // const rayCaster = new THREE.Raycaster(
    //   originPoint,
    //   mouseDirection.normalize(),
    // );
    // const ray = new THREE.Raycaster(originPoint, mouseDirection.normalize());
    // const collisionResults = ray.intersectObjects(scene.children);

    // if (collisionResults.length > 0) {
    //   console.log(collisionResults);
    // }

    if (controlRef.current?.moveForward && controlRef.current?.moveRight) {
      // direction.x = Number(move.right) - Number(move.left);
      // direction.z = Number(move.forward) - Number(move.backward);
      // direction.normalize(); // this ensures consistent movements in all directions

      velocity.x += -1 * velocity.x * 0.75;
      velocity.z += -1 * velocity.z * 0.75;
      // console.log('x', velocity.x, move.left);
      console.log('z', velocity.z, move.forward);

      if (move.left) velocity.x -= 1 * speed;
      if (move.right) velocity.x += 1 * speed;
      if (move.forward) velocity.z -= 1 * speed;
      if (move.backward) velocity.z += 1 * speed;

      // console.log(move.forward, velocity.z);
      // camera.translateX(velocity.x);
      // camera.translateZ(velocity.z);

      // if (move.forward || move.backward)
      //   velocity.z -= direction.z * 400.0 * delta;
      // if (move.left || move.right) velocity.x -= direction.x * 400.0 * delta;

      // console.log(delta);
      // controlRef.current.moveForward(direction.z * delta * 0.01);
      controlRef.current.moveForward(-velocity.z * delta);
      controlRef.current.moveRight(velocity.x * delta);

      if (move.forward) {
        console.log('speed', -velocity.z * delta);
      }

      // controlRef.current.moveForward(delta);

      if (controlRef.current.getObject) {
        // raycaster.ray.origin.copy(controlRef.current.getObject().position);
        // raycaster.ray.origin.y -= 10;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children);
        // console.log(raycaster, intersects);
        // console.log(raycaster.ray.origin);

        intersects.forEach((item) => {
          // console.log(item.distance);
        });

        // camera.position.distanceTo();
      }
    }
    // const hasControlsUpdated = controlRef.current.update(delta);
    gl.render(scene, camera);
    lastTime = elapsed;
    // if (hasControlsUpdated) gl.render(scene, camera);

    // if (forward) moveForward();
    // if (backward) moveBackward();
    // const frontVector = new THREE.Vector3(
    //   0,
    //   0,
    //   Number(backward) - Number(forward),
    // );
    // moveForward(frontVector);

    // if (controlRef.current) {
    //   const elapsed = clock.getElapsedTime();
    //   const delta = elapsed - lastTime;

    //   // const delta = clock.getDelta();

    //   // console.log(delta);

    //   const hasControlsUpdated = controlRef.current.update(delta);
    //   if (hasControlsUpdated) gl.render(scene, camera);
    //   lastTime = elapsed;
    // }
  });

  return (
    <>
      <PointerLockControls ref={controlRef} />
    </>
  );
};

export default PointerLockControlsImpl;
