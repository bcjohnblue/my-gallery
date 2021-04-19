import React, { useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import useKeyboardControls from '../../../hooks/useKeyboardControls';

const raycaster = new THREE.Raycaster();

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const speed = 0.1;
let lastTime = 0;

const mouseDirection = new THREE.Vector3();

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
  const { forward, backward, left, right } = useKeyboardControls();

  // for (
  //   var vertexIndex = 0;
  //   vertexIndex < mesh1.geometry.vertices.length;
  //   vertexIndex++
  // ) {
  //   // 顶点原始坐标
  //   var localVertex = mesh1.geometry.vertices[vertexIndex].clone();
  //   // 顶点经过变换后的坐标
  //   var globalVertex = localVertex.applyMatrix4(mesh1.matrix);
  //   // 获得由中心指向顶点的向量
  //   var directionVector = globalVertex.sub(mesh1.position);
  //   // 将方向向量初始化,并发射光线
  //   var ray = new THREE.Raycaster(
  //     originPoint,
  //     directionVector.clone().normalize(),
  //   );
  //   // 检测射线与多个物体的相交情况
  //   // 如果为true，它还检查所有后代。否则只检查该对象本身。缺省值为false
  //   var collisionResults = ray.intersectObjects([mesh2], true);
  //   // 如果返回结果不为空，且交点与射线起点的距离小于物体中心至顶点的距离，则发生了碰撞
  //   if (
  //     collisionResults.length > 0 &&
  //     collisionResults[0].distance < directionVector.length()
  //   ) {
  //     crash = true; // crash 是一个标记变量
  //     alert('发生了碰撞');
  //   }
  // }

  useFrame(() => {
    // const delta = clock.getDelta();
    if (!controlRef.current?.isLocked) return;
    const elapsed = clock.getElapsedTime();
    const delta = elapsed - lastTime;

    // const originPoint = camera.position.clone();
    // console.log(originPoint);

    const originPoint = camera.position.clone();
    camera.getWorldDirection(mouseDirection);
    const ray = new THREE.Raycaster(originPoint, mouseDirection.normalize());
    const collisionResults = ray.intersectObjects(scene.children);

    if (collisionResults.length > 0) {
      console.log(collisionResults);
    }

    if (controlRef.current?.moveForward && controlRef.current?.moveRight) {
      direction.z = Number(forward) - Number(backward);
      direction.x = Number(right) - Number(left);
      direction.normalize(); // this ensures consistent movements in all directions

      velocity.z -= velocity.z * 100.0 * delta;
      velocity.x -= velocity.x * 100.0 * delta;
      if (forward || backward) velocity.z -= direction.z * 400.0 * delta;
      if (left || right) velocity.x -= direction.x * 400.0 * delta;

      // console.log(delta);
      // controlRef.current.moveForward(direction.z * delta * 0.01);
      controlRef.current.moveForward(-velocity.z * delta);
      controlRef.current.moveRight(-velocity.x * delta);

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
