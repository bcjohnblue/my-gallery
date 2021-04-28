import React from 'react';

const Scene: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <axesHelper args={[3]} />
      <gridHelper />
    </>
  );
};

export default Scene;
