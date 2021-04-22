import * as THREE from 'three';
import { DirectionKeys } from './PointerLockTypes';

type RotationMatrix = {
  direction: DirectionKeys;
  value: THREE.Matrix4;
};

export const initRotationMatrices = (): RotationMatrix[] => {
  const rotationMatrices: RotationMatrix[] = [];

  const rotationMatrixF = new THREE.Matrix4();
  rotationMatrixF.makeRotationY(THREE.MathUtils.degToRad(0));
  rotationMatrices.push({
    direction: 'forward',
    value: rotationMatrixF,
  });

  const rotationMatrixB = new THREE.Matrix4();
  rotationMatrixB.makeRotationY(THREE.MathUtils.degToRad(180));
  // rotationMatrixB.makeRotationY((180 * Math.PI) / 180);
  rotationMatrices.push({
    direction: 'backward',
    value: rotationMatrixB,
  });

  const rotationMatrixL = new THREE.Matrix4();
  rotationMatrixL.makeRotationY(THREE.MathUtils.degToRad(90));
  // rotationMatrixL.makeRotationY((90 * Math.PI) / 180);
  rotationMatrices.push({
    direction: 'left',
    value: rotationMatrixL,
  });

  const rotationMatrixR = new THREE.Matrix4();
  rotationMatrixR.makeRotationY(THREE.MathUtils.degToRad(-90));
  // rotationMatrixR.makeRotationY(((360 - 90) * Math.PI) / 180);
  rotationMatrices.push({
    direction: 'right',
    value: rotationMatrixR,
  });

  return rotationMatrices;
};

export default 1;
