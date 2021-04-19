import styled from 'styled-components';

const Styled = {
  SlideItem: styled.li`
    /* width: 35vw;
    height: 30vh; */
    width: 660px;
    height: 560px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -280px 0 0 -330px;
    visibility: hidden;
    /* transition: transform 5s; */

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.8);
      transition: opacity 0.3s;
    }

    &.current {
      &::after {
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s, visibility 0s 0.3s;
      }
    }

    &.show {
      visibility: visible;
    }

    & > figure {
      width: 100%;
      height: 100%;
      background: #fff;
      border: 50px solid #fff;
      overflow: hidden;
      padding-top: 20px;
      /* display: flex;
      flex-direction: column;
      justify-content: center; */

      & figcaption {
        color: #47a3da;
        padding-bottom: 20px;

        h3 {
          font-weight: 500;
          font-size: 200%;
          padding: 0 0 0.5em;
        }

        ol {
          li {
            margin: 8px 0px;

            code {
              background-color: rgba(192, 192, 192, 0.3);
              padding: 1px 3px;
            }
          }
        }
      }

      & img {
        display: block;
        width: 100%;
        /* height: 320px; */
      }
    }
  `,
};

export default Styled;
