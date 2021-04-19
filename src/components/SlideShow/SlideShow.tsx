import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Styled from './SlideShowStyled';
import { AnimationStatus, Direction } from './SlideShowTypes';
import { PENDING_ANIMATION_TIME } from './SlideShowHelpers';

import dataList from './SlideShowDataList';
import SlideShowList from './List/SlideShowList';
import SlideShowItem from './Item/SlideShowItem';
import SlideShowNavigator from './Navigator/SlideShowNavigator';

type Props = {
  isShow: boolean;
  setIsSlideShow: React.Dispatch<React.SetStateAction<boolean>>;
};
const SlideShow: React.FC<Props> = (props) => {
  const listRef = useRef<HTMLUListElement>(null);

  const [animationStatus, setAnimationStatus] = useState<AnimationStatus>(
    AnimationStatus.Initial,
  );
  const [direction, setDirection] = useState<Direction>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onNavigateClick = (dir: Direction) => {
    const currentIndexHandler = () => {
      switch (dir) {
        case Direction.Left:
          setCurrentIndex((lastIndex) => lastIndex - 1);
          break;
        case Direction.Right:
          setCurrentIndex((lastIndex) => lastIndex + 1);
          break;
        default:
          break;
      }
    };

    setDirection(dir);
    currentIndexHandler();
    setAnimationStatus(AnimationStatus.Pending);
  };

  useEffect(() => {
    const pendingAnimate = () => {
      listRef.current?.classList.remove('animatable');
      setTimeout(() => {
        setAnimationStatus(AnimationStatus.Start);
      }, PENDING_ANIMATION_TIME);
    };

    const startAnimate = () => {
      listRef.current?.classList.add('animatable');
    };

    switch (animationStatus) {
      case AnimationStatus.Pending:
        pendingAnimate();
        break;
      case AnimationStatus.Start:
        startAnimate();
        break;
      default:
        break;
    }
  }, [animationStatus]);

  return (
    <Styled.Container
      className={clsx(props.isShow && 'open')}
      // onClick={onClick}
    >
      <SlideShowList ref={listRef}>
        {dataList.map((data, index) => (
          <SlideShowItem
            key={index}
            data={data}
            index={index}
            currentIndex={currentIndex}
            direction={direction}
            animationStatus={animationStatus}
          />
        ))}
      </SlideShowList>
      <SlideShowNavigator
        currentIndex={currentIndex}
        total={dataList.length}
        onNavigateClick={onNavigateClick}
        setIsSlideShow={props.setIsSlideShow}
      />
    </Styled.Container>
  );
};

export default SlideShow;
