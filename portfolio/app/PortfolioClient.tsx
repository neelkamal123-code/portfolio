'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav } from '@/components/Nav';
import { Starfield } from '@/components/Starfield';
import { ProfileSection } from '@/components/ProfileSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { LiquidPageDock } from '@/components/LiquidPageDock';
import { trackEvent } from '@/lib/analytics';

type Tab = 'profile' | 'experience' | 'education' | 'projects' | 'skills' | 'certifications';

const tabs: { id: Tab; label: string; short: string }[] = [
  { id: 'profile', label: 'Profile', short: 'PR' },
  { id: 'experience', label: 'Experience', short: 'EX' },
  { id: 'education', label: 'Education', short: 'ED' },
  { id: 'projects', label: 'Projects', short: 'PJ' },
  { id: 'skills', label: 'Skills', short: 'SK' },
  { id: 'certifications', label: 'Certifications', short: 'CT' },
];

const pages: Record<Tab, React.ReactNode> = {
  profile: <ProfileSection />,
  experience: <ExperienceSection />,
  education: <EducationSection />,
  projects: <ProjectsSection />,
  skills: <SkillsSection />,
  certifications: <CertificationsSection />,
};

const pv = {
  initial: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.24, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function PortfolioClient() {
  const [tab, setTab] = useState<Tab>('profile');
  const [isLinkedInInApp, setIsLinkedInInApp] = useState(false);
  const [bottomUiOffset, setBottomUiOffset] = useState(0);

  useEffect(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const ref = typeof document !== 'undefined' ? document.referrer : '';
    const linkedIn = /LinkedInApp|LIAPP|LinkedIn/i.test(ua) || /linkedin\./i.test(ref);
    setIsLinkedInInApp(linkedIn);

    const updateViewportOffsets = () => {
      const vv = window.visualViewport;
      const base = linkedIn ? 96 : 0;
      if (!vv) {
        setBottomUiOffset(base);
        return;
      }

      const overlay = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      setBottomUiOffset(Math.max(base, overlay + (linkedIn ? 14 : 0)));
    };

    updateViewportOffsets();
    window.addEventListener('resize', updateViewportOffsets);
    window.visualViewport?.addEventListener('resize', updateViewportOffsets);
    window.visualViewport?.addEventListener('scroll', updateViewportOffsets);

    return () => {
      window.removeEventListener('resize', updateViewportOffsets);
      window.visualViewport?.removeEventListener('resize', updateViewportOffsets);
      window.visualViewport?.removeEventListener('scroll', updateViewportOffsets);
    };
  }, []);

  useEffect(() => {
    trackEvent('section_view', { section: tab });
  }, [tab]);

  return (
    <div
      style={{
        minHeight: '100dvh',
        position: 'relative',
        ['--dock-offset' as string]: `${bottomUiOffset}px`,
      }}
    >
      <Starfield />

      {[
        { w: 800, h: 560, top: '-80px', left: '50%', tr: 'translateX(-50%)', bg: 'rgba(28,48,92,0.5)' },
        { w: 440, h: 440, top: '18%', left: '8%', tr: '', bg: 'rgba(18,34,72,0.32)' },
        { w: 380, h: 380, top: '28%', right: '5%', tr: '', bg: 'rgba(14,28,62,0.26)' },
      ].map((n, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            zIndex: 0,
            pointerEvents: 'none',
            borderRadius: '50%',
            filter: 'blur(90px)',
            width: n.w,
            height: n.h,
            top: n.top,
            left: 'left' in n ? n.left : 'auto',
            right: 'right' in n ? (n as { right: string }).right : 'auto',
            transform: n.tr || 'none',
            background: `radial-gradient(ellipse,${n.bg} 0%,transparent 68%)`,
          }}
        />
      ))}

      <Nav activeTab={tab} onTabChange={t => setTab(t as Tab)} />

      <main
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: isLinkedInInApp ? 84 : 76,
          paddingBottom: 118 + bottomUiOffset,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={tab} variants={pv} initial="initial" animate="enter" exit="exit">
            {pages[tab]}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: bottomUiOffset,
          zIndex: 120,
          maxWidth: 560,
          margin: '0 auto',
          padding: tab === 'profile' ? '8px 22px 16px' : '12px 22px 16px',
          background: 'linear-gradient(to top, rgba(5,8,16,0.98) 62%, rgba(5,8,16,0))',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        <LiquidPageDock tabs={tabs} activeTab={tab} onTabChange={t => setTab(t as Tab)} />
        <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: 14 }} />
        <p style={{ fontSize: '.66rem', fontWeight: 300, color: 'rgba(138,165,198,0.17)', letterSpacing: '.035em' }}>
          Neel Kamal - {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
