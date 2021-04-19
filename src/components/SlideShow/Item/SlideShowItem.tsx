import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import clsx from 'clsx';
import Styled from './SlideShowItemStyled';
import {
  AnimationStatus,
  Direction,
  ElementPosition,
  Data,
  NormalData,
} from '../SlideShowTypes';
import { getElementPosition } from '../SlideShowHelpers';

import SlideShowItemNormal from './Templates/SlideShowItemNormal';
import SlideShowItemLocalization from './Templates/SlideShowItemLocalization';

type Props = {
  data: Data;
  index: number;
  currentIndex: number;
  animationStatus: AnimationStatus;
  direction?: Direction;
};
const SlideShowItem: React.FC<Props> = (props) => {
  const itemRef = useRef<HTMLLIElement>(null);

  const elementPosition = useMemo(
    () => getElementPosition(props.index, props.currentIndex, props.direction),
    [props.index, props.currentIndex, props.direction],
  );

  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    let isWithInViewPort = false;

    if (
      props.index >= props.currentIndex - 1 &&
      props.index <= props.currentIndex + 1
    ) {
      isWithInViewPort = true;
    }

    if (elementPosition === ElementPosition.LastPrev) {
      isWithInViewPort = true;
    }

    setIsShow(isWithInViewPort);
  }, [props.index, props.currentIndex, elementPosition]);

  const [isCurrent, setIsCurrent] = useState(false);
  useEffect(() => {
    switch (props.animationStatus) {
      case AnimationStatus.Initial:
        setIsCurrent(props.index === props.currentIndex);
        break;
      case AnimationStatus.Start:
        setIsCurrent(props.index === props.currentIndex);
        break;
      default:
        break;
    }
  }, [props.index, props.currentIndex, props.animationStatus]);

  useEffect(() => {
    const setIntialTransFormStyle = () => {
      if (!itemRef.current) return;

      let transformStyles = '';
      switch (props.index) {
        case props.currentIndex - 1:
        case props.currentIndex:
          break;
        case props.currentIndex + 1:
          transformStyles = `translate3d(calc(50vw + 330px), 0px, -150px)`;
          break;
        default:
          return '';
      }

      itemRef.current.style.transform = transformStyles;
    };

    const setPendingTransFormStyle = () => {
      if (!itemRef.current) return;

      let transformStyles = '';
      switch (props.direction) {
        case Direction.Left:
          transformStyles = `translate3d(calc(-100vw - 330px), 0px, -150px)`;
          break;
        case Direction.Right:
          transformStyles = `translate3d(calc(100vw + 330px), 0px, -150px)`;
          break;
        default:
          break;
      }

      if (elementPosition === ElementPosition.Next) {
        itemRef.current.style.transform = transformStyles;
      }
    };

    const setStartTransFormStyle = () => {
      if (!itemRef.current) return;

      let transformStyles = '';
      switch (props.index) {
        case props.currentIndex - 1:
          transformStyles = `translate3d(calc(-50vw - 330px), 0px, -150px)`;
          break;
        case props.currentIndex + 1:
          transformStyles = `translate3d(calc(50vw + 330px), 0px, -150px)`;
          break;
        default:
          break;
      }

      if (elementPosition === ElementPosition.LastPrev) {
        transformStyles =
          props.direction === Direction.Left
            ? `translate3d(calc(100vw + 330px), 0px, -150px)`
            : `translate3d(calc(-100vw - 330px), 0px, -150px)`;
      }

      itemRef.current.style.transform = transformStyles;
    };

    const transitionEndHandler = () => {
      const onTransitionEnd = () => {
        if (elementPosition === ElementPosition.LastPrev) {
          setIsShow(false);
          // Bug: Can't remove class by manipulating DOM (ref)
          // itemRef.current?.classList.remove('show');
        }

        itemRef.current?.removeEventListener('transitionend', onTransitionEnd);
      };

      itemRef.current?.addEventListener<'transitionend'>(
        'transitionend',
        onTransitionEnd,
      );
    };

    switch (props.animationStatus) {
      case AnimationStatus.Initial:
        setIntialTransFormStyle();
        break;
      case AnimationStatus.Pending:
        setPendingTransFormStyle();
        break;
      case AnimationStatus.Start:
        setStartTransFormStyle();
        transitionEndHandler();
        break;
      default:
        break;
    }
  }, [
    props.index,
    props.currentIndex,
    props.animationStatus,
    props.direction,
    elementPosition,
  ]);

  const getSlideShowItemTemplate = useCallback(
    (data: Data) => {
      if (data.type === 'normal')
        return <SlideShowItemNormal data={props.data as NormalData} />;

      const mapTypeToComponent = {
        localization: <SlideShowItemLocalization />,
      };
      return mapTypeToComponent[data.type];
    },
    [props.data],
  );

  return (
    <Styled.SlideItem
      ref={itemRef}
      className={clsx({ show: isShow, current: isCurrent })}
    >
      {getSlideShowItemTemplate(props.data)}
    </Styled.SlideItem>
  );
};

export default SlideShowItem;
