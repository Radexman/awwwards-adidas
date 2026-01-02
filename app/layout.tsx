import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';

import './globals.css';

const mulish = Mulish({
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'adidas',
  description: "Foot Locker and adidas Originals' latest collection breaks new ground.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} antialiased`}>{children}</body>
    </html>
  );
}
