export type DirectionKeys = 'forward' | 'backward' | 'left' | 'right';

export interface Keyboard {
  KeyW: 'forward';
  KeyS: 'backward';
  KeyA: 'left';
  KeyD: 'right';
}

export type Direction = {
  [key in DirectionKeys]: boolean;
};
