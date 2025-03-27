// src/App.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from './components/Scene';
import './index.css';

export default function App() {
  return (
    <div className="w-full h-screen bg-gray-900" style={{width:'100%', height:"100%"}}>
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <Scene />
        <OrbitControls />
      </Canvas>
      
      <div className="absolute top-4 left-4 text-white" style={{position:'absolute', top:'10px', left:'10px'}}>
        <h1 className="text-xl font-bold">Box Puzzle</h1>
        <p className="text-sm">
          • ボックスの端にマウスをホバーすると追加ボタンが表示されます<br />
          • ボックスは緑色のハンドルでリサイズできます<br />
          • リサイズした場合、隣接するボックスも移動します
        </p>
      </div>
    </div>
  );
}