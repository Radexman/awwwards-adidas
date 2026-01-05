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

export function FirstWhiteModel() {
  const groupRef = useRef<THREE.Group | null>(null);
  const shirtRef = useRef<THREE.Mesh | null>(null);
  const maskRef = useRef<THREE.Mesh | null>(null);

  const { nodes } = useGLTF('/models/white/WhiteStudio.glb') as unknown as GLTFResult;
  const textures = useShirtSectionTextures('white', 'first');
  const stencil = useMask(1);

  useFirstAnimation(groupRef, shirtRef, maskRef);

  const materials = createMaterials(textures, stencil) as Record<
    TextureKey<'white', 'first'>,
    THREE.MeshBasicMaterial
  >;

  return (
    <group>
      <Masking ref={maskRef} />
      <group ref={groupRef} dispose={null}>
        <mesh geometry={nodes.DJ_Table.geometry} material={materials.dj} />
        <mesh geometry={nodes.Speakers.geometry} material={materials.speakers} />
        <mesh geometry={nodes.LED_Cube_White.geometry} material={materials.studio} />
        <mesh
          ref={shirtRef}
          geometry={nodes.Shirt_White.geometry}
          material={materials.shirt}
          position={[0, 0.7, 0]}
        />
        <mesh geometry={nodes.Wall.geometry} material={materials.studio} />
        <mesh geometry={nodes.Floor.geometry} material={materials.studio} />
        <mesh geometry={nodes.TV.geometry} material={materials.studio} />
        <mesh geometry={nodes.TV_Screen.geometry} material={materials.tv} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/white/WhiteStudio.glb');
