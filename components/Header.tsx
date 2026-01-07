'use client';

import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';

import { MusicStreamLine } from './MusicStreamLine';

export const Header = () => {
  const color = useParams().slug === 'white' ? 'bg-black' : 'bg-white';
  const { replace } = useRouter();

  return (
    <header className="fixed z-10 flex w-full items-center justify-between px-5 pt-3 md:px-20 md:pt-10">
      <div
        onClick={() => replace('/')}
        className={clsx(
          'hover-animation h-16 w-40 mask-[url(/icons/footLocker.svg)] mask-no-repeat md:w-44',
          color
        )}
      />
      <MusicStreamLine color={color} />
    </header>
  );
};
