'use client';

import { notFound, useParams } from 'next/navigation';

import Scene from '@/components/Scene';
import { ShirtType } from '@/lib/textures';

const page = () => {
  const params = useParams();
  const shirtType = params?.slug as ShirtType;

  if (!shirtType) return notFound();

  return (
    <>
      <Scene shirtType={shirtType} />
    </>
  );
};

export default page;
