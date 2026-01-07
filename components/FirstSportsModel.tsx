'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { useGLTF, useMask } from '@react-three/drei';

import { useShirtSectionTextures } from '@/lib/useTextures';
import { useFirstAnimation } from '@/lib/useFirstAnimation';
import { createMaterials } from '@/lib/material';
import { TextureKey } from '@/lib/textures';
import { Masking } from './Masking';

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};

export function FirstSportsModel() {
  const groupRef = useRef<THREE.Group | null>(null);
  const shirtRef = useRef<THREE.Mesh | null>(null);
  const maskRef = useRef<THREE.Mesh | null>(null);

  const { nodes } = useGLTF('/models/sport/SportStudio.glb') as unknown as GLTFResult;
  const textures = useShirtSectionTextures('sport', 'first');
  const stencil = useMask(1);

  useFirstAnimation(groupRef, shirtRef, maskRef);

  const materials = createMaterials(textures, stencil) as Record<
    TextureKey<'sport', 'first'>,
    THREE.MeshBasicMaterial
  >;

  return (
    <group>
      <Masking ref={maskRef} />
      <group ref={groupRef} dispose={null}>
        <mesh
          ref={shirtRef}
          geometry={nodes.Shirt_Sport.geometry}
          material={materials.shirt}
          position={[0, 0.7, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh geometry={nodes.Environment.geometry} material={materials.env} />
        <mesh geometry={nodes.Ramp.geometry} material={materials.ramp} />
        <mesh
          geometry={nodes.SakteBoard.geometry}
          material={materials.skateboard}
          position={[0, -0.012, 0]}
        />
      </group>
    </group>
  );
}
