import React from 'react';

const COLOR = 0xcccccc;

const WALL_WIDTH = 40;
const WALL_HALF_INTERVAL = 20;
const WALL_HEIGHT = 20;
const WALL_THICKNESS = 0.1;

const FrontWall: React.FC = () => {
  return (
    <mesh position={[0, 0, -WALL_WIDTH / 2]} rotation={[0, -Math.PI / 2, 0]}>
      <boxGeometry
        args={[WALL_THICKNESS, WALL_HEIGHT, WALL_HALF_INTERVAL * 2]}
      />
      <meshBasicMaterial color={COLOR} />
    </mesh>
  );
};

const BackWall: React.FC = () => {
  return (
    <mesh position={[0, 0, WALL_WIDTH / 2]} rotation={[0, -Math.PI / 2, 0]}>
      <boxGeometry
        args={[WALL_THICKNESS, WALL_HEIGHT, WALL_HALF_INTERVAL * 2]}
      />
      <meshBasicMaterial color={COLOR} />
    </mesh>
  );
};

const LeftWall: React.FC = () => {
  return (
    <mesh position={[-WALL_HALF_INTERVAL, 0, 0]}>
      <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, WALL_WIDTH]} />
      <meshBasicMaterial color={COLOR} />
    </mesh>
  );
};

const RightWall: React.FC = () => {
  return (
    <mesh position={[WALL_HALF_INTERVAL, 0, 0]}>
      <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, WALL_WIDTH]} />
      <meshBasicMaterial color={COLOR} />
    </mesh>
  );
};

const Walls: React.FC = () => {
  return (
    <>
      <FrontWall />
      <BackWall />
      <LeftWall />
      <RightWall />
    </>
  );
};

export default Walls;
