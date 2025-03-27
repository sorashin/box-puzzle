// src/components/ResizeHandles.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { Vector3 } from 'three';
import { boxesAtom } from '../store/atoms';
import { ResizeHandlesProps } from '../types';
import ResizeHandle from './ResizeHandle';

function ResizeHandles({ boxId, position, size }: ResizeHandlesProps) {
  const [boxes, setBoxes] = useAtom(boxesAtom);
  
  // Helper function to calculate handle positions
  const getHandlePosition = (axis: number, positive: boolean): [number, number, number] => {
    const pos = [...position] as [number, number, number];
    pos[axis] += positive ? size[axis]/2 : -size[axis]/2;
    return pos;
  };
  
  // Function to resize box and move adjacent boxes
  const resizeBox = (axis: number, delta: number): void => {
    // Copy boxes array to modify
    const newBoxes = [...boxes];
    
    // Find the box to resize
    const boxIndex = newBoxes.findIndex(box => box.id === boxId);
    if (boxIndex === -1) return;
    
    const box = newBoxes[boxIndex];
    const oldSize = [...box.size] as [number, number, number];
    const oldPosition = [...box.position] as [number, number, number];
    
    // Update size
    const newSize = [...oldSize] as [number, number, number];
    newSize[axis] += delta;
    
    // Don't allow negative sizes
    if (newSize[axis] < 0.5) return;
    
    // Update position (center moves when resizing)
    const newPosition = [...oldPosition] as [number, number, number];
    newPosition[axis] += delta / 2;
    
    // Update the box
    newBoxes[boxIndex] = {
      ...box,
      size: newSize,
      position: newPosition
    };
    
    // Find and update any adjacent boxes
    const axisDirection = new Vector3();
    axisDirection.setComponent(axis, 1);
    
    // Check each box to see if it needs to move
    for (let i = 0; i < newBoxes.length; i++) {
      if (i === boxIndex) continue; // Skip the box we just resized
      
      const otherBox = newBoxes[i];
      
      // Simple adjacency check (can be improved for more complex scenarios)
      // This checks if boxes are adjacent along the resize axis
      const isAdjacent = Math.abs(
        otherBox.position[axis] - 
        (oldPosition[axis] + (oldSize[axis] / 2) * Math.sign(delta))
      ) < 0.1;
      
      // If adjacent, move the box
      if (isAdjacent) {
        const newOtherPosition = [...otherBox.position] as [number, number, number];
        newOtherPosition[axis] += delta;
        newBoxes[i] = {
          ...otherBox,
          position: newOtherPosition
        };
      }
    }
    
    // Update state
    setBoxes(newBoxes);
  };
  
  // Handle drag events on resize handles
  const handleDrag = (axis: number, direction: number, delta: number): void => {
    resizeBox(axis, delta * direction);
  };
  
  return (
    <>
      {/* X-axis resize handles */}
      <ResizeHandle 
        position={getHandlePosition(0, true)} 
        onDrag={(delta) => handleDrag(0, 1, delta)} 
        axis="x"
      />
      <ResizeHandle 
        position={getHandlePosition(0, false)} 
        onDrag={(delta) => handleDrag(0, -1, delta)} 
        axis="x"
      />
      
      {/* Y-axis resize handles */}
      <ResizeHandle 
        position={getHandlePosition(1, true)} 
        onDrag={(delta) => handleDrag(1, 1, delta)} 
        axis="y"
      />
      <ResizeHandle 
        position={getHandlePosition(1, false)} 
        onDrag={(delta) => handleDrag(1, -1, delta)} 
        axis="y"
      />
    </>
  );
}

export default ResizeHandles;