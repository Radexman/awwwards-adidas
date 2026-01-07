'use client';

import clsx from 'clsx';
import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type MusicStreamLineProps = {
  color: string;
};

export const MusicStreamLine = ({ color }: MusicStreamLineProps) => {
  const [isPlay, setIsPlay] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useGSAP(() => {
    if (!divRef.current) return;
    const bars = Array.from(divRef.current.children);

    gsap.killTweensOf(bars);

    bars.forEach((bar, index) => {
      const randomDuration = 0.3 + Math.random() * 0.2;
      const randomDelay = index * 0.1 + Math.random() * 0.1;
      const randomScale = 3 + Math.random() * 2;
      if (isPlay)
        gsap.to(bar, {
          scaleY: randomScale,
          duration: randomDuration,
          delay: randomDelay,
          yoyo: true,
          repeat: -1,
        });
      else
        gsap.to(bar, {
          scaleY: 1,
          duration: 0.2,
          ease: 'power1.out',
        });
    });
  }, [isPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlay) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Autoplay blocked or failed', error);
          setIsPlay(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlay]);

  return (
    <div
      onClick={() => setIsPlay((prev) => !prev)}
      className="hover-animation flex size-10 items-center justify-center"
    >
      <div ref={divRef} className="flex gap-1">
        <div className={clsx('h-1 w-0.5', color)} />
        <div className={clsx('h-1 w-0.5', color)} />
        <div className={clsx('h-1 w-0.5', color)} />
      </div>
      <audio ref={audioRef} src={'/main-optimized.mp3'} preload="auto" loop />
    </div>
  );
};
