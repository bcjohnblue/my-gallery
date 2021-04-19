import React from 'react';
import { ReactComponent as LeftArrowSVG } from '@/assets/svg/left-arrow.svg';
import { ReactComponent as RightArrowSVG } from '@/assets/svg/right-arrow.svg';
import { ReactComponent as CancelSVG } from '@/assets/svg/cancel.svg';
import Styled from './SlideShowNavigatorStyled';
import { Direction } from '../SlideShowTypes';

type Props = {
  currentIndex: number;
  total: number;
  onNavigateClick: (dir: Direction) => void;
  setIsSlideShow: React.Dispatch<React.SetStateAction<boolean>>;
};
const SlideShowNavigator: React.FC<Props> = (props) => {
  const onLeftClick = () => props.onNavigateClick(Direction.Left);
  const onRightClick = () => props.onNavigateClick(Direction.Right);

  return (
    <nav>
      {props.currentIndex > 0 && (
        <Styled.Left onClick={onLeftClick}>
          <LeftArrowSVG />
        </Styled.Left>
      )}
      {props.currentIndex < props.total - 1 && (
        <Styled.Right onClick={onRightClick}>
          <RightArrowSVG />
        </Styled.Right>
      )}
      <Styled.Close onClick={() => props.setIsSlideShow(false)}>
        <CancelSVG />
      </Styled.Close>
    </nav>
  );
};

export default SlideShowNavigator;
