import styled from 'styled-components';

const CommonDiv = styled.div`
  position: absolute;
  z-index: 1000;
  color: #59656c;
  text-align: center;
  /* padding: 223px 3%; */
  cursor: pointer;
  font-size: 2.2em;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  display: flex;
  align-items: center;
  & svg {
    position: absolute;
    fill: rgb(89, 101, 108);
    transform: scale(0.5);
  }
`;

const Styled = {
  Left: styled(CommonDiv)``,
  Right: styled(CommonDiv)`
    right: 0;
    & svg {
      /* margin-right: 30px; */
    }
  `,
  Close: styled.div`
    position: fixed;
    z-index: 1000;
    text-align: center;
    cursor: pointer;
    font-size: 2.2em;
    top: 0;
    right: 0;
    padding: 0.5em 1em;
    svg {
      width: 20px;
    }
  `,
};

export default Styled;
