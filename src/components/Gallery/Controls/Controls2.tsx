import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ReactThreeFiber, extend, useFrame, useThree } from 'react-three-fiber';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE });

extend({ CameraControls });

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       cameraControls: ReactThreeFiber.Object3DNode<
//         CameraControls,
//         typeof CameraControls
//       >;
//     }
//   }
// }

const Controls = () => {
  const ccontrolRef = useRef<any>(null);
  const { camera, gl, clock, scene } = useThree();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': // forward
          ccontrolRef.current.dolly(1, true);
          break;
        case 'KeyS': // backwards
          ccontrolRef.current.dolly(-1, true);
          break;
        case 'KeyA': // left
          ccontrolRef.current.truck(-1, 0, true);
          break;
        case 'KeyD': // right
          ccontrolRef.current.truck(1, 0, true);
          break;
        // case 'ShiftLeft':
        //   setMovement((m) => ({
        //     ...m,
        //     [moveFieldByKey(e.code)]: 30,
        //   }));
        //   return;
        default:
          break;
      }
    };

    // const handleKeyUp = (e) => {
    //   switch (e.code) {
    //     case 'KeyW': //forward
    //     case 'KeyA': // left
    //     case 'KeyS': // backwards
    //     case 'KeyD': // right
    //     case 'Space': // jump
    //       setMovement((m) => ({
    //         ...m,
    //         [moveFieldByKey(e.code)]: false,
    //       }));
    //       return;
    //     case 'ShiftLeft':
    //       setMovement((m) => ({
    //         ...m,
    //         [moveFieldByKey(e.code)]: 15,
    //       }));
    //       return;
    //     default:
    //       return;
    //   }
    // };

    document.addEventListener('keydown', handleKeyDown);
    // document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // document.removeEventListener('keyup', handleKeyUp);
    };
  }, [ccontrolRef]);

  useEffect(() => {
    const onClick = () => {
      // console.log('123');
      // ccontrolRef.current.dolly(1, true);
      // cameraControls.dolly(1, true);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [camera, gl.domElement]);

  let lastTime = 0;
  useFrame(() => {
    if (ccontrolRef.current) {
      const elapsed = clock.getElapsedTime();
      const delta = elapsed - lastTime;

      // const delta = clock.getDelta();

      // console.log(delta);

      const hasControlsUpdated = ccontrolRef.current.update(delta);
      if (hasControlsUpdated) gl.render(scene, camera);
      lastTime = elapsed;
    }
  });
  return <cameraControls ref={ccontrolRef} args={[camera, gl.domElement]} />;
};

export default Controls;
