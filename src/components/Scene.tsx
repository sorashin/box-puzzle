// src/components/Scene.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { boxesAtom, selectedBoxAtom, hoverInfoAtom } from '../store/atoms';
import Box from './Box';

function Scene() {
  const [boxes] = useAtom(boxesAtom);
  const [selectedBox, setSelectedBox] = useAtom(selectedBoxAtom);
  const [, setHoverInfo] = useAtom(hoverInfoAtom);
  
  // Handler for box hover
  const handleBoxHover = (id: string) => {
    setHoverInfo({ id });
  };
  
  // Handler for box hover end
  const handleBoxHoverEnd = () => {
    setHoverInfo(null);
  };
  
  // Handler for box selection
  const handleBoxSelect = (id: string) => {
    setSelectedBox(id === selectedBox ? null : id);
  };
  
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      
      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* Add Axis */}
      <axesHelper args={[5]} />
      
      {/* Boxes */}
      {boxes.map((box) => (
        <Box
          key={box.id}
          id={box.id}
          position={box.position}
          size={box.size}
          color={box.color}
          onHover={handleBoxHover}
          onHoverEnd={handleBoxHoverEnd}
          onSelect={handleBoxSelect}
        />
      ))}
      
      {/* Grid for reference */}
      <gridHelper args={[20, 20]} />
    </>
  );
}

export default Scene;