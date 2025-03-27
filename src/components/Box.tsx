// src/components/Box.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Vector3 } from 'three';
import { useAtom } from 'jotai';
import { hoverInfoAtom } from '../store/atoms';
import { BoxProps } from '../types';
import { DIRECTIONS } from '../constants/directions';
import AddButton from './AddButtons';
import ResizeHandles from './ResizeHandles';
import * as THREE from 'three';

function Box({ id, position, size, color, onHover, onHoverEnd, onSelect }: BoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [boxPosition, setBoxPosition] = useState<[number, number, number]>(position);
  const [boxSize, setBoxSize] = useState<[number, number, number]>(size);
  const [hoverInfo, setHoverInfo] = useAtom(hoverInfoAtom);
  
  // Update position and size if they change from parent
  useEffect(() => {
    setBoxPosition(position);
    setBoxSize(size);
  }, [position, size]);

  // Handlers for mouse interactions
  const handlePointerOver = (e: React.PointerEvent) => {
    e.stopPropagation();
    setHovered(true);
    if (onHover) {
      onHover(id);
    }
  };

  const handlePointerOut = (e: React.PointerEvent) => {
    e.stopPropagation();
    setHovered(false);
    if (onHoverEnd) {
      onHoverEnd();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(id);
    }
  };

  // Calculate face hover positions for add buttons
  const getFacePosition = (direction: Vector3): Vector3 => {
    const dir = direction.clone();
    const scaledDir = dir.multiply(new Vector3(...boxSize)).multiplyScalar(0.5);
    return new Vector3(...boxPosition).add(scaledDir);
  };

  // Show add buttons on hover
  const showAddButtons = hovered && hoverInfo?.id === id;

  return (
    <group>
      <mesh
        ref={meshRef}
        position={boxPosition}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={boxSize} />
        <meshStandardMaterial color={hovered ? '#ff9900' : color} />
      </mesh>

      {/* Add buttons that appear on hover */}
      {showAddButtons && (
        <>
          <AddButton 
            position={getFacePosition(DIRECTIONS.RIGHT)} 
            direction={DIRECTIONS.RIGHT}
            boxId={id}
          />
          <AddButton 
            position={getFacePosition(DIRECTIONS.LEFT)} 
            direction={DIRECTIONS.LEFT}
            boxId={id}
          />
          <AddButton 
            position={getFacePosition(DIRECTIONS.FORWARD)} 
            direction={DIRECTIONS.FORWARD}
            boxId={id}
          />
        </>
      )}

      {/* Resize handles */}
      {hovered && (
        <ResizeHandles 
          boxId={id} 
          position={boxPosition} 
          size={boxSize}
        />
      )}
    </group>
  );
}

export default Box;