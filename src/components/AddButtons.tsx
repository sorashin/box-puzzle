// src/components/AddButton.tsx
import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useAtom } from 'jotai';
import { boxesAtom } from '../store/atoms';
import { AddButtonProps } from '../types';

function AddButton({ position, direction, boxId }: AddButtonProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [boxes, setBoxes] = useAtom(boxesAtom);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(boxId+'clicked');
    
    // Find the original box
    const sourceBox = boxes.find(box => box.id === boxId);
    if (!sourceBox) return;
    
    // Create a new box in the specified direction
    const newPosition: [number, number, number] = [
      sourceBox.position[0] + direction.x * sourceBox.size[0],
      sourceBox.position[1] + direction.y * sourceBox.size[1],
      sourceBox.position[2] + direction.z * sourceBox.size[2]
    ];
    
    // Generate a random color for the new box
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    // Add the new box
    const newBox = {
      id: `box-${boxes.length}`,
      position: newPosition,
      size: [...sourceBox.size] as [number, number, number],
      color: randomColor
    };
    
    setBoxes([...boxes, newBox]);
  };

  return (
    <mesh
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={hovered ? '#00ff00' : '#ffffff'} />
      <Html position={[0, 0, 0]} center>
        <div className="text-white text-2xl font-bold">+</div>
      </Html>
    </mesh>
  );
}

export default AddButton;