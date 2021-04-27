import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    text-align: center;
    font-size: 1.1rem;
    line-height: 26px;
    z-index: 1;
    cursor: pointer;
  `,
  Title: styled.h3`
    font-size: 2rem;
  `,
};

export default Styled;
