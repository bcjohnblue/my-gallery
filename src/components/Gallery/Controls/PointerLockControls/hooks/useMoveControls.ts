import { useEffect, useRef, useCallback } from 'react';
import {
  Direction,
  DirectionKeys,
  Keyboard,
  KeyboardKeys,
} from '../PointerLockControlsTypes';

const keyboardKeys: KeyboardKeys[] = ['KeyW', 'KeyS', 'KeyA', 'KeyD'];

const mapKeyToDirection = (key: KeyboardKeys): DirectionKeys => {
  const keyboard: Keyboard = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
  };

  return keyboard[key];
};

const initialValue: Direction = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

interface SetMoveCallback {
  (args: { direction: DirectionKeys; value: boolean }): void;
}

type UseMoveControls = [React.MutableRefObject<Direction>, SetMoveCallback];
const useMoveControls = (): UseMoveControls => {
  const move = useRef(initialValue);
  const setMove = useCallback<SetMoveCallback>(({ direction, value }) => {
    move.current = {
      ...move.current,
      [direction]: value,
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code as KeyboardKeys;
      if (keyboardKeys.includes(key)) {
        setMove({
          direction: mapKeyToDirection(key),
          value: true,
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.code as KeyboardKeys;
      if (keyboardKeys.includes(key)) {
        setMove({
          direction: mapKeyToDirection(key),
          value: false,
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [setMove]);

  return [move, setMove];
};

export default useMoveControls;
