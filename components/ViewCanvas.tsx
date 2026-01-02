'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';

import Rig from './Rig';

const ViewCanvas = () => {
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <Canvas
      style={{ position: 'fixed', inset: 0 }}
      camera={{ position: [0, 0.7, 3], fov: 30 }}
      eventSource={eventSource ?? undefined}
      eventPrefix="client"
    >
      <View.Port />
      <Rig />
    </Canvas>
  );
};

export default ViewCanvas;
