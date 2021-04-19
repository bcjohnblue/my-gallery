import React from 'react';
import DirectionalLight from './DirectionalLight';
// import SpotLight from '../SpotLight/Spotlight';
import PointLight from './PointLight';
// import Spotlight from '../SpotLight/Spotlight';

type Props = {
  night?: boolean;
};
const Lights: React.FC<Props> = ({ night = true }) => {
  return (
    <>
      <ambientLight intensity={night ? 0.07 : 0.2} />
      {/* moon/sunlight */}
      <DirectionalLight
        position={[29, 50, -60]}
        target={[-5, -3, 50]}
        intensity={night ? 0.2 : 0.3}
        color={night ? 'skyblue' : 'lightgoldenrodyellow'}
        shadowCamBot={-30}
        shadowCamTop={30}
        shadowCamL={53}
        shadowCamR={-53}
      />
      {/* moon light */}
      {/* {night ? (
				<Spotlight
					position={[0, 80, -120]}
					target={[80, 150, -200]}
					intensity={0.5}
					penumbra={0.5}
					sNormalBias={0}
					sBias={0}
					angle={-Math.PI}
					decay={2}
				/>
			) : null} */}

      <PointLight intensity={performance ? 0.25 : 0.6} position={[0, 19, 13]} />
    </>
  );
};

export default Lights;
