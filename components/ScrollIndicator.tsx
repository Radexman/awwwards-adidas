'use client';

import clsx from 'clsx';
import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { ShirtType } from '@/lib/textures';

gsap.registerPlugin(useGSAP);

type ScrollIndicatorProps = {
  shirtType: ShirtType;
};

export const ScrollIndicator = ({ shirtType }: ScrollIndicatorProps) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useGSAP(() => {
    if (!divRef.current) return;

    gsap.to(divRef.current, { y: 50, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={clsx(
        'fixed top-4/5 z-10 flex flex-col items-center gap-5 place-self-center transition-opacity duration-500',
        isScrolling ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="relative h-16 w-10">
        <div className="flex justify-between opacity-50">
          <div
            className={clsx(
              'h-16 w-px place-self-center',
              shirtType === 'white' ? 'bg-black' : 'bg-white'
            )}
          />
          <div
            className={clsx(
              'h-16 w-px place-self-center',
              shirtType === 'white' ? 'bg-black' : 'bg-white'
            )}
          />
        </div>
        <div
          ref={divRef}
          className={clsx(
            'absolute top-0 left-[12] size-4 rounded-full border',
            shirtType === 'white' ? 'text-black' : 'text-white'
          )}
        />
      </div>
      <div
        className={clsx(
          'text-xs tracking-wider md:text-sm',
          shirtType === 'white' ? 'text-black' : 'text-white'
        )}
      >
        SCROLL TO EXPLORE
      </div>
    </div>
  );
};
