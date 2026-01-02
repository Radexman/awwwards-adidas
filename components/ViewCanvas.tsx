'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { MainStudioModel } from './MainStudioModel';
import Rig from './Rig';

const ViewCanvas = () => {
  return (
    <Canvas style={{ position: 'fixed', inset: 0 }} camera={{ position: [0, 0.7, 3], fov: 30 }}>
      <Rig />
      <MainStudioModel />
    </Canvas>
  );
};

export default ViewCanvas;
