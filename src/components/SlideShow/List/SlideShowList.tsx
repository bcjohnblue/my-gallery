import React from 'react';
import Styled from './SlideShowListStyled';

type Props = React.ComponentPropsWithoutRef<'ul'>;
const SlideShowList = React.forwardRef<HTMLUListElement, Props>(
  (props, ref) => {
    return (
      <Styled.SlideShowList {...props} ref={ref}>
        {props.children}
      </Styled.SlideShowList>
    );
  },
);

export default SlideShowList;
