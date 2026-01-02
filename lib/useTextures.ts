import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

import { SectionType, ShirtType, studioTextures } from './textures';

export const useMainStudioTextures = () => {
  return useModifiedTextures(studioTextures.main, true);
};

export const useShirtSectionTextures = (
  shirtType: ShirtType,
  section: SectionType,
  setModifier = true
) => {
  const paths = studioTextures.shirts[shirtType][section];
  return useModifiedTextures(paths, setModifier);
};

function useModifiedTextures(paths: Record<string, string>, setModifier: boolean) {
  const textures = useTexture(paths);

  if (setModifier) {
    Object.values(textures).forEach((texture) => {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
    });
  }

  return textures;
}
