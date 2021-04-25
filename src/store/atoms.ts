/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { PointerLockControls } from '@react-three/drei';

// export const controlState = atom<React.RefObject<PointerLockControls> | null>({
export const controlState = atom<PointerLockControls | null>({
  key: 'controls', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
  dangerouslyAllowMutability: true,
});
