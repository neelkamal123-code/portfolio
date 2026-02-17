import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Neel Kamal — Software Engineer II',
  description: 'Software Engineer II at Deloitte specializing in .NET Core, Azure cloud solutions, and scalable enterprise application development.',
  openGraph: {
    title: 'Neel Kamal — Software Engineer II',
    description: 'Software Engineer II at Deloitte specializing in .NET Core, Azure cloud solutions, and scalable enterprise application development.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
