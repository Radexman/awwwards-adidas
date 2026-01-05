import * as THREE from 'three';
import { useCubeTexture, useTexture, useVideoTexture } from '@react-three/drei';

import {
  SectionType,
  ShirtType,
  studioTextures,
  environmentPaths,
  videoTextures,
} from './textures';

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

export const useShirtEnvCube = (shirtType: ShirtType) => {
  const path = environmentPaths[shirtType];
  return useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], {
    path,
  });
};

export const useShirtVideoTexure = (shirtType: ShirtType) => {
  const path = videoTextures[shirtType];
  return useVideoTexture(path);
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
