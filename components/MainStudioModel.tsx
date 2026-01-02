import * as THREE from 'three';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { useGLTF } from '@react-three/drei';

import { useMainStudioTextures } from '@/lib/useTextures';
import { createMaterials } from '@/lib/material';
import { studioTextures } from '@/lib/textures';

gsap.registerPlugin(useGSAP);

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};

export function MainStudioModel() {
  const { nodes } = useGLTF('/models/main/MainStudio.glb') as unknown as GLTFResult;
  const textures = useMainStudioTextures();

  const materials = createMaterials(textures) as Record<
    keyof typeof studioTextures.main,
    THREE.MeshBasicMaterial
  >;

  const shirts = [
    {
      position: [0.65, 0.7, -0.45] as [number, number, number],
      rotation: [0, Math.PI / 9, 0] as [number, number, number],
      geometry: nodes.Shirt_White.geometry,
      material: materials.whiteShirt,
      hoverMaterial: materials.whiteStudio,
      slug: 'white',
    },
    {
      position: [0, 0.7, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      geometry: nodes.Shirt_Sport.geometry,
      material: materials.sportsShirt,
      hoverMaterial: materials.redStudio,
      slug: 'sport',
    },
    {
      position: [-0.65, 0.7, -0.45] as [number, number, number],
      rotation: [0, -Math.PI / 9, 0] as [number, number, number],
      geometry: nodes.Shirt_Gray.geometry,
      material: materials.grayShirt,
      hoverMaterial: materials.grayStudio,
      slug: 'gray',
    },
  ];

  const [envMaterial, setEnvMaterial] = useState<THREE.MeshBasicMaterial>(materials.defaultStudio);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const tlRefs = useRef<GSAPTimeline[]>([]);

  useGSAP(() => {
    if (!meshRefs.current) return;

    meshRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      tlRefs.current[index] = gsap
        .timeline({ paused: true, ease: 'power1.inOut' })
        .to(mesh.rotation, { y: 0, duration: 1 })
        .to(mesh.scale, { x: 1.05, y: 1.05, z: 1.5, duration: 1 }, '<');
    });
  });

  const enterHandler = (index: number, material: THREE.MeshBasicMaterial) => {
    document.body.style.cursor = 'pointer';
    setEnvMaterial(material);
    tlRefs.current[index].play();
  };

  const leaveHandler = (index: number) => {
    document.body.style.cursor = 'auto';
    tlRefs.current[index].reverse();
  };

  return (
    <group dispose={null}>
      <mesh geometry={nodes.Environment.geometry} material={envMaterial} />
      {shirts.map((shirt, index) => (
        <mesh
          key={index}
          ref={(m) => {
            if (!m) return;
            meshRefs.current[index] = m;
          }}
          geometry={shirt.geometry}
          material={shirt.material}
          position={shirt.position}
          rotation={shirt.rotation}
          onPointerEnter={() => enterHandler(index, shirt.hoverMaterial)}
          onPointerLeave={() => leaveHandler(index)}
        />
      ))}
      <mesh
        geometry={nodes.Hitbox.geometry}
        scale={[2.52, 1, 1]}
        onPointerLeave={() => setEnvMaterial(materials.defaultStudio)}
        visible={false}
      />
    </group>
  );
}

useGLTF.preload('/models/main/MainStudio.glb');
