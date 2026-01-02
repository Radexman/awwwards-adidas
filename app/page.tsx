'use client';

import { useState } from 'react';
import { View } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';

import { MainStudioModel } from '@/components/MainStudioModel';

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 400 });
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < 2) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <>
      <View className="h-dvh w-full">
        <MainStudioModel currentIndex={currentIndex} scale={isMobile ? 0.8 : 1} />
      </View>
      <p className="absolute top-11/12 z-10 place-self-center text-[10px] font-medium tracking-wider text-white/80 md:text-xs">
        SELECT A PRODUCT TO BEGIN
      </p>
      <div
        onClick={handlePrev}
        className="hover-animation absolute top-10/12 left-1/12 z-20 block size-12 border bg-white mask-[url(/icons/left.svg)] mask-no-repeat md:hidden"
      />
      <div
        onClick={handleNext}
        className="hover-animation absolute top-10/12 right-1/12 z-20 block size-12 border bg-white mask-[url(/icons/right.svg)] mask-no-repeat md:hidden"
      />
    </>
  );
}
