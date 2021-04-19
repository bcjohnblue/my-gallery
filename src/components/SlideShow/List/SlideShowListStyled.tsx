import styled from 'styled-components';
import SlideShowItemStyled from '../Item/SlideShowItemStyled';

const Styled = {
  SlideShowList: styled.ul`
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: translate3d(0, 0, 150px);
    transition: transform 0.5s;

    &.animatable > ${SlideShowItemStyled.SlideItem} {
      transition: transform 0.5s;
    }
  `,
};

export default Styled;
