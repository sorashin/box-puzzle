export interface BoxData {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  onHover?: (id: string) => void;
  onHoverEnd?: () => void;
}

export interface BoxProps {
  box: BoxData;
  onClick?: () => void;
}

export interface HoverInfo {
  id: string;
  direction: string;
}

export interface ResizeHandleProps {
  position: [number, number, number];
  onDrag: (delta: number) => void;
  axis: 'x' | 'y';
} 