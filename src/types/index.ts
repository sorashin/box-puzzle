// src/types/index.ts
import { Vector3 } from 'three';

export interface BoxData {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

export interface HoverInfo {
  id: string;
}

export interface BoxProps {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  onHover?: (id: string) => void;
  onHoverEnd?: () => void;
  onSelect?: (id: string) => void;
}

export interface AddButtonProps {
  position: Vector3;
  direction: Vector3;
  boxId: string;
}

export interface ResizeHandlesProps {
  boxId: string;
  position: [number, number, number];
  size: [number, number, number];
}

export interface ResizeHandleProps {
  position: [number, number, number];
  onDrag: (delta: number) => void;
  axis: 'x' | 'y' | 'z';
}