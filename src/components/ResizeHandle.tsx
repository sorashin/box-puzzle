// src/components/ResizeHandle.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { ResizeHandleProps } from '../types';
import * as THREE from 'three';

function ResizeHandle({ position, onDrag, axis }: ResizeHandleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const { camera } = useThree();
  
  // Set up drag events
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      
      // Convert mouse movement to world space delta
      const movementScale = 0.01; // Adjust sensitivity
      
      // Calculate movement based on camera orientation for intuitive resizing
      let delta: number;
      if (axis === 'x') {
        delta = e.movementX * movementScale;
      } else if (axis === 'y') {
        delta = e.movementY * movementScale;
      } else {
        delta = (e.movementX + e.movementY) * movementScale;
      }
      
      if (onDrag) {
        onDrag(delta);
      }
    };
    
    const handlePointerUp = () => {
      setDragging(false);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
    
    if (dragging) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
    
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragging, onDrag, axis, camera]);
  
  // Start dragging on pointer down
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setDragging(true);
  };
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerDown={handlePointerDown}
    >
      {axis === 'x' ? (
        <boxGeometry args={[0.2, 0.05, 0.05]} />
      ) : (
        <boxGeometry args={[0.05, 0.2, 0.05]} />
      )}
      <meshStandardMaterial color="#00ff00" />
    </mesh>
  );
}

export default ResizeHandle;