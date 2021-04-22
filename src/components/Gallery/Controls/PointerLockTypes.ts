export type DirectionKeys = 'forward' | 'backward' | 'left' | 'right';
export type Direction = {
  [key in DirectionKeys]: boolean;
};

export type KeyboardKeys = 'KeyW' | 'KeyS' | 'KeyA' | 'KeyD';
export interface Keyboard {
  readonly KeyW: 'forward';
  readonly KeyS: 'backward';
  readonly KeyA: 'left';
  readonly KeyD: 'right';
}
