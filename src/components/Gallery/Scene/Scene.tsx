import React, { useEffect } from 'react';
// import { useThree } from 'react-three-fiber';

const Scene: React.FC = ({ children }) => {
  // const {
  //   camera,
  //   gl: { domElement },
  // } = useThree();

  return (
    <>
      {children}
      <axesHelper args={[3]} />
      <gridHelper />
    </>
  );
};

export default Scene;
