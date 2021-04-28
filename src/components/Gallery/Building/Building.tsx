import React, { Suspense } from 'react';
import Walls from './Walls/Walls';
import Poster from './Poster/Poster';
import Ground from './Ground/Ground';

type Props = {
  setIsSlideShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Building: React.FC<Props> = (props) => {
  return (
    <>
      <Suspense fallback={null}>
        <Ground />
        <Walls />
        <Poster setIsSlideShow={props.setIsSlideShow} />
      </Suspense>
    </>
  );
};

export default Building;
