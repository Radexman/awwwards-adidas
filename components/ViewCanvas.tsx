'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { MainStudioModel } from './MainStudioModel';

const ViewCanvas = () => {
  return (
    <Canvas style={{ position: 'fixed', inset: 0 }}>
      <OrbitControls />
      <MainStudioModel />
    </Canvas>
  );
};

export default ViewCanvas;
