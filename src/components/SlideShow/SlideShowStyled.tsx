import styled from 'styled-components';
import SlideShowListStyled from './List/SlideShowListStyled';

const Styled = {
  Container: styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 500;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    perspective: 1000px;
    transition: opacity 0.5s, visibility 0s 0.5s;

    &.open {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s;

      ${SlideShowListStyled.SlideShowList} {
        transform: translate3d(0, 0, 0);
      }
    }
  `,
};

export default Styled;
