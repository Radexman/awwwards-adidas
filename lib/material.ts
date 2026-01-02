import * as THREE from 'three';

export const createMaterials = (textures: Record<string, THREE.Texture>) => {
  const materials: Record<string, THREE.MeshBasicMaterial> = {};

  for (const [key, texture] of Object.entries(textures)) {
    materials[key] = new THREE.MeshBasicMaterial({ map: texture });
  }

  return materials;
};
