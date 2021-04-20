import { useEffect, useState } from 'react';
import { Keyboard, Direction } from '../PointerLockTypes';

const mapKeyToDirection = (key: keyof Keyboard) => {
  const keyboard = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
  };
  return keyboard[key];
};

const useMoveControls = (): [
  Direction,
  React.Dispatch<React.SetStateAction<Direction>>,
] => {
  const [move, setMove] = useState<Direction>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': // forward
        case 'KeyA': // left
        case 'KeyS': // backwards
        case 'KeyD': // right
          // case 'Space': // jump
          // const key = e.code as keyof Keyboard;
          setMove((m) => ({
            ...m,
            [mapKeyToDirection(e.code as keyof Keyboard)]: true,
          }));
          break;
        // case 'ShiftLeft':
        //   setMovement((m) => ({
        //     ...m,
        //     [mapKeysToDirection(e.code)]: 30,
        //   }));
        default:
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': // forward
        case 'KeyA': // left
        case 'KeyS': // backwards
        case 'KeyD': // right
        case 'Space': // jump
          setMove((m) => ({
            ...m,
            [mapKeyToDirection(e.code as keyof Keyboard)]: false,
          }));
          break;
        // case 'ShiftLeft':
        //   setMovement((m) => ({
        //     ...m,
        //     [mapKeysToDirection(e.code)]: 15,
        //   }));

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return [move, setMove];
};

export default useMoveControls;
