import { useEffect, useState } from 'react';

interface Keyboard {
  KeyW: 'forward';
  KeyS: 'backward';
  KeyA: 'left';
  KeyD: 'right';
}

const mapKeysToDirection = (key: keyof Keyboard) => {
  const keyboard = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    // Space: 'jump',
    // ShiftLeft: 'speed',
  };
  return keyboard[key];
};

const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    // jump: false,
    speed: 15,
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
          setMovement((m) => ({
            ...m,
            [mapKeysToDirection(e.code as keyof Keyboard)]: true,
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
          setMovement((m) => ({
            ...m,
            [mapKeysToDirection(e.code as keyof Keyboard)]: false,
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

  return movement;
};

export default useKeyboardControls;
