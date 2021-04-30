import React from 'react';
import { Stats } from '@react-three/drei';

const Helper: React.FC = () => {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <axesHelper args={[3]} />
      <gridHelper />
      <Stats showPanel={0} className="stats" />
    </>
  );
};

export default Helper;
