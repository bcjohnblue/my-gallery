import React from 'react';
import { NormalData } from '../../SlideShowTypes';
import Styled from './SlideShowItemTemplatesStyled';

type Props = {
  data: NormalData;
};
const SlideShowItemNormal: React.FC<Props> = (props) => {
  return (
    <figure>
      <figcaption>
        <h3>{props.data.title}</h3>
        <ol>
          {props.data.list.map((text, index) => (
            <Styled.ListItem
              key={index}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </ol>
      </figcaption>
      <img src={props.data.src} alt="img" />
    </figure>
  );
};

export default SlideShowItemNormal;
