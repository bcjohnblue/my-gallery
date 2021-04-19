import { Direction, ElementPosition } from './SlideShowTypes';

export const PENDING_ANIMATION_TIME = 25;

export function getElementPosition(
  index: number,
  currentIndex: number,
  direction?: Direction,
): ElementPosition | null {
  const lastPrevIndex =
    direction === Direction.Left ? currentIndex + 2 : currentIndex - 2;
  const prevIndex =
    direction === Direction.Left ? currentIndex + 1 : currentIndex - 1;
  const nextIndex =
    direction === Direction.Left ? currentIndex - 1 : currentIndex + 1;

  switch (index) {
    case lastPrevIndex:
      return ElementPosition.LastPrev;
    case prevIndex:
      return ElementPosition.Prev;
    case currentIndex:
      return ElementPosition.Current;
    case nextIndex:
      return ElementPosition.Next;
    default:
      return null;
  }
}
