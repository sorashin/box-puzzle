// src/store/atoms.ts
import { atom } from 'jotai';
import { BoxData, HoverInfo } from '../types';

// Jotai state atoms
export const boxesAtom = atom<BoxData[]>([
  { id: 'box-0', position: [0, 0, 0], size: [1, 1, 1], color: '#4287f5' }
]);

export const selectedBoxAtom = atom<string | null>(null);

export const hoverInfoAtom = atom<HoverInfo | null>(null);