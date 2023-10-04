import AppHeader from '@sahayeta/components/AppHeader';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SAHAYATA',
  description: 'Web based Dontation App'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
