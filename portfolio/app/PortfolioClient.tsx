'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav } from '@/components/Nav';
import { Starfield } from '@/components/Starfield';
import { ProfileSection } from '@/components/ProfileSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { CertificationsSection } from '@/components/CertificationsSection';

type Tab = 'profile'|'experience'|'education'|'projects'|'skills'|'certifications';

const pages: Record<Tab, React.ReactNode> = {
  profile: <ProfileSection />,
  experience: <ExperienceSection />,
  education: <EducationSection />,
  projects: <ProjectsSection />,
  skills: <SkillsSection />,
  certifications: <CertificationsSection />,
};

const pv = {
  initial: { opacity:0, y:16 },
  enter:   { opacity:1, y:0,  transition:{ duration:.42, ease:[0,0,0.2,1] as [number,number,number,number] } },
  exit:    { opacity:0, y:-10, transition:{ duration:.24, ease:[0,0,0.2,1] as [number,number,number,number] } },
};

export default function PortfolioClient() {
  const [tab, setTab] = useState<Tab>('profile');

  return (
    <div style={{ minHeight:'100vh', position:'relative' }}>
      <Starfield />
      {/* Nebulas */}
      {[
        { w:800, h:560, top:'-80px', left:'50%', tr:'translateX(-50%)', bg:'rgba(28,48,92,0.5)' },
        { w:440, h:440, top:'18%',   left:'8%',  tr:'',                  bg:'rgba(18,34,72,0.32)' },
        { w:380, h:380, top:'28%',   right:'5%', tr:'',                  bg:'rgba(14,28,62,0.26)' },
      ].map((n,i) => (
        <div key={i} style={{
          position:'fixed', zIndex:0, pointerEvents:'none', borderRadius:'50%', filter:'blur(90px)',
          width:n.w, height:n.h, top:n.top, left:'left' in n ? n.left : 'auto',
          right:'right' in n ? (n as any).right : 'auto',
          transform:n.tr || 'none',
          background:`radial-gradient(ellipse,${n.bg} 0%,transparent 68%)`,
        }} />
      ))}

      <Nav activeTab={tab} onTabChange={t => setTab(t as Tab)} />

      <main style={{ position:'relative', zIndex:10, paddingTop:76, paddingBottom:80 }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab} variants={pv} initial="initial" animate="enter" exit="exit">
            {pages[tab]}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer style={{ position:'relative', zIndex:10, maxWidth:520, margin:'0 auto', padding:'0 22px 32px' }}>
        <div style={{ height:1, background:'rgba(255,255,255,0.04)', marginBottom:14 }} />
        <p style={{ fontSize:'.66rem', fontWeight:300, color:'rgba(138,165,198,0.17)', letterSpacing:'.035em' }}>Neel Kamal · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
