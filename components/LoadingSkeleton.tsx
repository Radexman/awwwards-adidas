'use client';

import { Html, useProgress } from '@react-three/drei';

import { Bars } from './Bars';

export const LoadingSkeleton = () => {
  const { progress } = useProgress();

  return (
    <Html position={[0, 0.7, 0]} center prepend>
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <div className="mt-5 flex w-40 flex-col items-center gap-4 md:w-3xs">
          <Bars />
          <div className="w-full">
            <p className="mt-2 text-center text-sm text-white/50">{Math.floor(progress)}% loaded</p>
            <div className="h-2 rounded-full bg-white/50 transition-all duration-200" />
          </div>
        </div>
      </div>
    </Html>
  );
};
