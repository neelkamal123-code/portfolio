'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TABS = [
  { id:'profile', label:'Profile' },
  { id:'experience', label:'Experience' },
  { id:'education', label:'Education' },
  { id:'projects', label:'Projects' },
  { id:'skills', label:'Skills' },
  { id:'certifications', label:'Certifications' },
];

export function Nav({ activeTab, onTabChange }: { activeTab:string; onTabChange:(t:string)=>void }) {
  const [open, setOpen] = useState(false);
  const go = (id: string) => { onTabChange(id); setOpen(false); };

  return (
    <>
      <header
        style={{
          position:'fixed',
          top:0,
          left:0,
          right:0,
          zIndex:100,
          display:'flex',
          alignItems:'center',
          height:'calc(64px + env(safe-area-inset-top, 0px))',
          padding:'env(safe-area-inset-top, 0px) 40px 0',
        }}
      >
        <nav className="hidden md:flex items-center gap-8">
          {TABS.map(t => (
            <button key={t.id} onClick={() => go(t.id)} className={`nav-btn${activeTab===t.id?' active':''}`}>{t.label}</button>
          ))}
        </nav>
        <button
          className="md:hidden ml-auto"
          onClick={() => setOpen(true)}
          style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(185,205,228,0.4)', padding:6, display:'flex' }}
          aria-label="Menu"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="0" y1="1" x2="18" y2="1"/><line x1="0" y1="7" x2="18" y2="7"/><line x1="0" y1="13" x2="12" y2="13"/>
          </svg>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:.2 }}
            style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(4,7,14,0.96)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4 }}
          >
            <button onClick={() => setOpen(false)} style={{ position:'absolute', top:22, right:22, background:'none', border:'none', cursor:'pointer', color:'rgba(185,205,228,0.4)', padding:8 }}>
              <X size={18} />
            </button>
            {TABS.map((t,i) => (
              <motion.button
                key={t.id}
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.04, duration:.22 }}
                onClick={() => go(t.id)}
                style={{ fontSize:'1.65rem', fontWeight:700, letterSpacing:'-.025em', color: activeTab===t.id ? 'rgba(215,232,252,0.9)' : 'rgba(185,205,228,0.3)', background:'none', border:'none', cursor:'pointer', padding:'8px 0', transition:'color .18s' }}
              >{t.label}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
