import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/app/context/AuthContext';
import 'leaflet/dist/leaflet.css';
import { HuntProvider } from './context/huntContext';
const spaceGrotesk = Space_Grotesk({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'MNNITHunt - Campus Adventure',
  description: 'Embark on an exciting scavenger hunt adventure at MNNIT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans`}>
      <HuntProvider>

      <AuthProvider> 
        {children}
        <Toaster />
        </AuthProvider>
      </HuntProvider>
       
      </body>
    </html>
  );
}