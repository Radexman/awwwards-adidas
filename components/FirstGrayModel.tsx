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

export function FirstGrayModel() {
  const { nodes } = useGLTF('/models/gray/GrayStudio.glb') as unknown as GLTFResult;
  const textures = useShirtSectionTextures('gray', 'first');

  const materials = createMaterials(textures) as Record<
    TextureKey<'gray', 'first'>,
    THREE.MeshBasicMaterial
  >;

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Shirt_Gray.geometry}
        material={materials.shirt}
        position={[0, 0.7, 0]}
      />
      <mesh geometry={nodes.Floor.geometry} material={materials.floor} />
      <mesh geometry={nodes.Wall.geometry} material={materials.wall} />
      <mesh geometry={nodes.Asset.geometry} material={materials.assets} />
    </group>
  );
}

useGLTF.preload('/models/gray/GrayStudio.glb');
