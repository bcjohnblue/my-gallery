/* eslint-disable import/prefer-default-export */
import * as THREE from 'three';

export const getInterSectObject = (
  object: THREE.Object3D,
  camera: THREE.Camera,
): THREE.Intersection[] => {
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  const raycaster = new THREE.Raycaster(camera.position, cameraDirection);

  const intersects = raycaster.intersectObject(object);
  return intersects;
};
