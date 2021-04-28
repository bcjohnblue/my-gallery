import { useState, useEffect } from 'react';

const usePointerLockValue = (): boolean => {
  const [isPointerLock, setIsPointerLock] = useState(false);

  useEffect(() => {
    const onPointerlockchange = () => {
      setIsPointerLock(!!document.pointerLockElement);
    };

    document.addEventListener('pointerlockchange', onPointerlockchange, false);
    return () => {
      document.addEventListener(
        'pointerlockchange',
        onPointerlockchange,
        false,
      );
    };
  }, []);

  return isPointerLock;
};

export default usePointerLockValue;
