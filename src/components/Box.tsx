// src/components/Box.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Vector3 } from 'three';
import { useAtom } from 'jotai';
import { hoverInfoAtom, selectedBoxAtom } from '../store/atoms';
import { BoxProps, BoxData } from '../types';
import { DIRECTIONS } from '../constants/directions';
import AddButton from './AddButtons';
import ResizeHandles from './ResizeHandles';
import * as THREE from 'three';

function Box({ box, onClick }: BoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [boxPosition, setBoxPosition] = useState<[number, number, number]>(box.position);
  const [boxSize, setBoxSize] = useState<[number, number, number]>(box.size);
  const [hoverInfo, setHoverInfo] = useAtom(hoverInfoAtom);
  const [selectedBoxId] = useAtom(selectedBoxAtom);
  const isSelected = selectedBoxId === box.id;
  
  // Update position and size if they change from parent
  useEffect(() => {
    setBoxPosition(box.position);
    setBoxSize(box.size);
  }, [box.position, box.size]);

  // Handlers for mouse interactions
  const handlePointerOver = (e: React.PointerEvent) => {
    e.stopPropagation();
    setHovered(true);
    if (box.onHover) {
      box.onHover(box.id);
    }
  };

  const handlePointerOut = (e: React.PointerEvent) => {
    e.stopPropagation();
    setHovered(false);
    if (box.onHoverEnd) {
      box.onHoverEnd();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  // Calculate face hover positions for add buttons
  const getFacePosition = (direction: Vector3): Vector3 => {
    const dir = direction.clone();
    const scaledDir = dir.multiply(new Vector3(...boxSize)).multiplyScalar(0.5);
    return new Vector3(...boxPosition).add(scaledDir);
  };

  // Show add buttons on hover
  const showAddButtons = hovered && hoverInfo?.id === box.id;

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
        <meshStandardMaterial 
          color={box.color} 
          transparent={!isSelected}
          opacity={isSelected ? 1 : 0.5}
        />
        {isSelected && (
          <mesh>
            <boxGeometry args={boxSize.map(size => size + 0.05)} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>
        )}
      </mesh>

      {/* Add buttons that appear on hover */}
      {showAddButtons && (
        <>
          <AddButton 
            position={getFacePosition(DIRECTIONS.RIGHT)} 
            direction={DIRECTIONS.RIGHT}
            boxId={box.id}
          />
          <AddButton 
            position={getFacePosition(DIRECTIONS.LEFT)} 
            direction={DIRECTIONS.LEFT}
            boxId={box.id}
          />
          <AddButton 
            position={getFacePosition(DIRECTIONS.FORWARD)} 
            direction={DIRECTIONS.FORWARD}
            boxId={box.id}
          />
        </>
      )}

      {/* Resize handles */}
      {hovered && (
        <ResizeHandles 
          boxId={box.id} 
          position={boxPosition} 
          size={boxSize}
        />
      )}
    </group>
  );
}

export default Box;