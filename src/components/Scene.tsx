// src/components/Scene.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { boxesAtom, selectedBoxAtom, hoverInfoAtom } from '../store/atoms';
import Box from './Box';

function Scene() {
  const [boxes] = useAtom(boxesAtom);
  const [, setSelectedBoxId] = useAtom(selectedBoxAtom);
  const [, setHoverInfo] = useAtom(hoverInfoAtom);
  
  // Handler for box hover
  const handleBoxHover = (id: string) => {
    setHoverInfo({ id, direction: '' });
  };
  
  // Handler for box hover end
  const handleBoxHoverEnd = () => {
    setHoverInfo(null);
  };
  
  // Handler for box selection
  const handleBoxSelect = (id: string) => {
    setSelectedBoxId(id === selectedBoxId ? null : id);
  };

  const handleCanvasClick = () => {
    setSelectedBoxId(null);
  };

  return (
    <group onClick={handleCanvasClick}>
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
          box={{
            ...box,
            onHover: handleBoxHover,
            onHoverEnd: handleBoxHoverEnd
          }}
          onClick={() => setSelectedBoxId(box.id)}
        />
      ))}
      
      {/* Grid for reference */}
      <gridHelper args={[20, 20]} />
    </group>
  );
}

export default Scene;