/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { PointerLockControls } from '@react-three/drei';

export const controlState = atom<PointerLockControls | null>({
  key: 'controls',
  default: null,
  dangerouslyAllowMutability: true,
});
