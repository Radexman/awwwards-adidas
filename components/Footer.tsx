'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';

export const Footer = () => {
  const color = useParams().slug === 'white' ? 'text-black' : 'text-white';

  return (
    <div
      className={clsx(
        'fixed bottom-2 flex items-center justify-start gap-2 px-5 text-[10px] text-nowrap md:gap-5 md:px-20 md:text-xs md:tracking-widest',
        color
      )}
    >
      <p className="hover-animation">© 2026 ADIDAS AG</p>
      <p className="hover-animation">TERMS & CONDITIONS</p>
      <p className="hover-animation">PRIVACY</p>
      <p className="hover-animation">COOKIES</p>
    </div>
  );
};
