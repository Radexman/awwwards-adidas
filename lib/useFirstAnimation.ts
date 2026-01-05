import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RefObject } from 'react';

gsap.registerPlugin(useGSAP);

export const useFirstAnimation = (
  groupRef: RefObject<THREE.Group | null>,
  shirtRef: RefObject<THREE.Mesh | null>,
  maskRef: RefObject<THREE.Mesh | null>
) => {
  useGSAP(() => {
    if (!groupRef.current || !shirtRef.current || !maskRef.current) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#first-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
        },
      })
      .to(groupRef.current.position, { y: 1.5 })
      .to(shirtRef.current.rotation, { y: Math.PI / 2 }, '<')
      .to(maskRef.current.position, { y: 5 }, '<')
      .to(maskRef.current.rotation, { z: -0.2 }, '<');
  }, []);
};
