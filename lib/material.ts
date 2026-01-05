import * as THREE from 'three';
import { useMask } from '@react-three/drei';

export const createMaterials = (
  textures: Record<string, THREE.Texture>,
  stencil?: ReturnType<typeof useMask>
) => {
  const materials: Record<string, THREE.MeshBasicMaterial> = {};

  for (const [key, texture] of Object.entries(textures)) {
    materials[key] = new THREE.MeshBasicMaterial({ map: texture, ...(stencil ?? {}) });
  }

  return materials;
};
