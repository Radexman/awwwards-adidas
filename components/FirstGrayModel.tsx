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

export function FirstGrayModel() {
  const groupRef = useRef<THREE.Group | null>(null);
  const shirtRef = useRef<THREE.Mesh | null>(null);
  const maskRef = useRef<THREE.Mesh | null>(null);

  const { nodes } = useGLTF('/models/gray/GrayStudio.glb') as unknown as GLTFResult;
  const textures = useShirtSectionTextures('gray', 'first');
  const stencil = useMask(1);

  useFirstAnimation(groupRef, shirtRef, maskRef);

  const materials = createMaterials(textures, stencil) as Record<
    TextureKey<'gray', 'first'>,
    THREE.MeshBasicMaterial
  >;

  return (
    <group>
      <Masking ref={maskRef} />
      <group ref={groupRef} dispose={null}>
        <mesh
          ref={shirtRef}
          geometry={nodes.Shirt_Gray.geometry}
          material={materials.shirt}
          position={[0, 0.7, 0]}
        />
        <mesh geometry={nodes.Floor.geometry} material={materials.floor} />
        <mesh geometry={nodes.Wall.geometry} material={materials.wall} />
        <mesh geometry={nodes.Asset.geometry} material={materials.assets} />
      </group>
    </group>
  );
}
