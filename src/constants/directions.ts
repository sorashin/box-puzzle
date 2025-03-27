// src/constants/directions.ts
import { Vector3 } from 'three';

export const DIRECTIONS = {
  RIGHT: new Vector3(1, 0, 0),
  LEFT: new Vector3(-1, 0, 0),
  UP: new Vector3(0, 1, 0),
  FORWARD: new Vector3(0, 0, 1),
  BACKWARD: new Vector3(0, 0, -1),
};