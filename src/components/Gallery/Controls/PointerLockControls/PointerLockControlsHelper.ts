/* eslint-disable import/prefer-default-export */
import * as THREE from 'three';
import { DirectionKeys } from './PointerLockControlsTypes';

type RotationMatrix = {
  direction: DirectionKeys;
  value: THREE.Matrix4;
};

export const initRotationMatrices = (): RotationMatrix[] => {
  const makeRotationMatrix = (direction: DirectionKeys) => {
    const mapDirectionToDegree = {
      forward: 0,
      backward: 180,
      left: 90,
      right: -90,
    };
    const degree = mapDirectionToDegree[direction];

    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(THREE.MathUtils.degToRad(degree));

    return {
      direction,
      value: rotationMatrix,
    };
  };

  const rotationMatrices: RotationMatrix[] = [];
  const directions: DirectionKeys[] = ['forward', 'backward', 'left', 'right'];

  directions.forEach((direction) => {
    const rotationMatrix = makeRotationMatrix(direction);
    rotationMatrices.push(rotationMatrix);
  });

  return rotationMatrices;
};
