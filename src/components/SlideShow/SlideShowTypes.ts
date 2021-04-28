import type { SlideShowItemTemplateType } from './Item/SlideShowItemTypes';

export enum AnimationStatus {
  Initial,
  Pending,
  Start,
}
export enum Direction {
  Left,
  Right,
}
export enum ElementPosition {
  LastPrev,
  Prev,
  Current,
  Next,
}
export interface NormalData {
  type: 'normal';
  src: string;
  title: string;
  list: Array<string>;
}
export interface CustomData {
  type: SlideShowItemTemplateType;
}
export type Data = NormalData | CustomData;
