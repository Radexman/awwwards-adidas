import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';

type GLTFResult = {
	nodes: {
		[name: string]: THREE.Mesh;
	};
};

export function Cube() {
	const { nodes } = useGLTF('/test/cube.glb') as unknown as GLTFResult;
	const bakedTexture = useTexture('/test/baked-texture.png');

	bakedTexture.flipY = false;
	bakedTexture.colorSpace = THREE.SRGBColorSpace;

	return (
		<group dispose={null}>
			<mesh
				position={[1, 0, 0]}
				geometry={nodes.Cube.geometry}
				material={nodes.Cube.material}
			>
				<meshBasicMaterial map={bakedTexture} />
			</mesh>
		</group>
	);
}

useGLTF.preload('/test/cube.glb');
