import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import { useShirtSectionTextures } from '@/lib/useTextures';
import { createMaterials } from '@/lib/material';
import { TextureKey } from '@/lib/textures';

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};

export function FirstSportsModel() {
  const { nodes } = useGLTF('/models/sport/SportStudio.glb') as unknown as GLTFResult;
  const textures = useShirtSectionTextures('sport', 'first');

  const materials = createMaterials(textures) as Record<
    TextureKey<'sport', 'first'>,
    THREE.MeshBasicMaterial
  >;

  return (
    <group dispose={null}>
      <mesh
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
  );
}

useGLTF.preload('/models/sport/SportStudio.glb');
