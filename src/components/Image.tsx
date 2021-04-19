import React from 'react';
import { useLoader } from 'react-three-fiber';
import { TextureLoader, Vector3 } from 'three';
import ddt_home from '/src/assets/ddt_home.png';

type Props = {
  path: string;
};
const Image: React.FC<Props> = (props) => {
  // const image = useLoader(TextureLoader, props.path);
  const image = useLoader(TextureLoader, ddt_home);
  console.log('loader', image);

  return (
    // <Suspense fallback="<div></div>">
    <>
      <mesh>
        <meshBasicMaterial toneMapped attach="material" map={image as any} />
        <planeBufferGeometry attach="geometry" args={[3, 3]} />
      </mesh>
    </>
    // </Suspense>
  );
};

export default Image;
