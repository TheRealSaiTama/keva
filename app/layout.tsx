import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KEVA - AI Automation for Modern Businesses',
  description: 'Premium software solutions and AI automation for modern businesses',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent zoom on mobile */
            html {
              -webkit-text-size-adjust: 100%;
              -moz-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              text-size-adjust: 100%;
              touch-action: manipulation;
            }
            
            /* Fix for small screens */
            @media screen and (max-width: 480px) {
              body {
                font-size: 14px !important;
              }
              
              /* Force minimum text size */
              * {
                -webkit-text-size-adjust: none !important;
                text-size-adjust: none !important;
              }
            }
            
            /* Ultra small screens */
            @media screen and (max-width: 360px) {
              html {
                font-size: 14px !important;
              }
            }
            
            /* iOS Safari fixes */
            @supports (-webkit-touch-callout: none) {
              .min-h-screen {
                min-height: -webkit-fill-available;
              }
            }
          `
        }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}