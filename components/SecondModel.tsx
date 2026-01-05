import * as THREE from 'three';
import gsap from 'gsap';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';

import type { ShirtType, TextureKey } from '@/lib/textures';
import { useShirtSectionTextures } from '@/lib/useTextures';
import { createMaterials } from '@/lib/material';
import { shirtColors } from '@/lib/colors';

gsap.registerPlugin(useGSAP);

const TOP_BOTTOM_TEXT_WIDTH = 5.7;
const MIDDLE_TEXT_WIDTH = 6.2;
const DURATION = 50;

type SecondModelProps = {
  shirtType: ShirtType;
};

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};

export function SecondModel({ shirtType }: SecondModelProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { nodes } = useGLTF('/models/ShirtScrolling.glb') as unknown as GLTFResult;
  const textures = useShirtSectionTextures(shirtType, 'second');

  const marqueeText1Ref = useRef<THREE.Mesh | null>(null);
  const marqueeText1DupRef = useRef<THREE.Mesh | null>(null);
  const marqueeText2Ref = useRef<THREE.Mesh | null>(null);
  const marqueeText2DupRef = useRef<THREE.Mesh | null>(null);

  const getTextColor = () => shirtColors[shirtType]?.text ?? 'black';

  const materials = createMaterials(textures) as Record<
    TextureKey<typeof shirtType, 'second'>,
    THREE.MeshBasicMaterial
  >;

  const marqueeMaterial = new THREE.MeshBasicMaterial({
    color: getTextColor(),
    transparent: true,
    opacity: 1,
  });

  const textsMaterial = new THREE.MeshBasicMaterial({
    color: getTextColor(),
    transparent: true,
    opacity: 1,
  });

  useGSAP(() => {
    if (
      !marqueeText1Ref.current ||
      !marqueeText1DupRef.current ||
      !marqueeText2Ref.current ||
      !marqueeText2DupRef.current
    )
      return;

    gsap.to(marqueeText1Ref.current.position, {
      x: `-=${TOP_BOTTOM_TEXT_WIDTH}`,
      duration: DURATION,
      ease: 'none',
      repeat: -1,
    });
    gsap.to(marqueeText1DupRef.current.position, {
      x: `-=${TOP_BOTTOM_TEXT_WIDTH}`,
      duration: DURATION,
      ease: 'none',
      repeat: -1,
    });
    gsap.to(marqueeText2Ref.current.position, {
      x: `+=${MIDDLE_TEXT_WIDTH}`,
      duration: DURATION,
      ease: 'none',
      repeat: -1,
    });
    gsap.to(marqueeText2DupRef.current.position, {
      x: `+=${MIDDLE_TEXT_WIDTH}`,
      duration: DURATION,
      ease: 'none',
      repeat: -1,
    });
  });

  return (
    <group dispose={null} scale={isMobile ? 1.5 : 2.2}>
      <mesh geometry={nodes.Shirt.geometry} material={materials.shirt} />
      <mesh geometry={nodes.Sphere_ENV.geometry} material={materials.sphere} />
      <group>
        {Object.entries(nodes)
          .filter(([key]) => key.startsWith('Texts'))
          .map(([key, node]) => (
            <mesh
              key={key}
              geometry={node.geometry}
              material={textsMaterial}
              position={node.position}
            />
          ))}
      </group>
      <mesh
        ref={marqueeText1Ref}
        geometry={nodes.Marquee_Top_Bottom.geometry}
        material={marqueeMaterial}
        position={[0, 0, 0]}
      />
      <mesh
        ref={marqueeText1DupRef}
        geometry={nodes.Marquee_Top_Bottom.geometry}
        material={marqueeMaterial}
        position={[TOP_BOTTOM_TEXT_WIDTH, 0, 0]}
      />
      <mesh
        ref={marqueeText2Ref}
        geometry={nodes.Marquee_Middle.geometry}
        material={marqueeMaterial}
        position={[0, 0, 0]}
      />
      <mesh
        ref={marqueeText2DupRef}
        geometry={nodes.Marquee_Middle.geometry}
        material={marqueeMaterial}
        position={[-MIDDLE_TEXT_WIDTH, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/models/ShirtScrolling.glb');
