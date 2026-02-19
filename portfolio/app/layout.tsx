import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { certifications, profile, projects } from './data';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.title,
      description: 'Software Engineer II specializing in .NET Core, Azure cloud solutions, and scalable enterprise applications.',
      email: `mailto:${profile.email}`,
      url: siteUrl,
      sameAs: [profile.github, profile.linkedin].filter(Boolean),
      homeLocation: profile.location,
    },
    {
      '@type': 'WebSite',
      name: `${profile.name} Portfolio`,
      url: siteUrl,
    },
    ...projects.slice(0, 8).map(project => ({
      '@type': 'CreativeWork',
      name: project.name,
      description: project.desc,
      url: project.sourceUrl || project.demoUrl || siteUrl,
      creator: { '@type': 'Person', name: profile.name },
      keywords: project.tech?.join(', '),
    })),
    ...certifications.slice(0, 8).map(certification => ({
      '@type': 'EducationalOccupationalCredential',
      name: certification.name,
      description: certification.desc,
      url: certification.url || siteUrl,
      recognizedBy: { '@type': 'Organization', name: certification.sub },
    })),
  ],
};

export const metadata: Metadata = {
  title: 'Neel Kamal - Software Engineer II',
  description: 'Software Engineer II at Deloitte specializing in .NET Core, Azure cloud solutions, and scalable enterprise application development.',
  openGraph: {
    title: 'Neel Kamal - Software Engineer II',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <Analytics />
      </body>
    </html>
  );
}
