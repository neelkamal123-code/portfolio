'use client';

import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { profile } from '@/app/data';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

export function ProfileSection() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: '40px 24px 0', display: 'flex', flexDirection: 'column', gap: 0 }}
    >
      {/* Badge */}
      <motion.div variants={item} style={{ marginBottom: 28 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '5px 12px 5px 8px', borderRadius: 100,
          background: 'rgba(134,239,172,0.08)',
          border: '1px solid rgba(134,239,172,0.18)',
        }}>
          <div className="badge-dot" style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#86EFAC', flexShrink: 0,
          }} />
          <span style={{ fontSize: '.7rem', fontWeight: 400, letterSpacing: '.06em', color: 'rgba(134,239,172,0.8)' }}>
            Open to opportunities
          </span>
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1 variants={item} style={{
        fontSize: 'clamp(3rem,9vw,5.5rem)', fontWeight: 800,
        letterSpacing: '-.045em', lineHeight: .97, color: '#EBF4FF',
        marginBottom: 14,
      }}>
        {profile.name.split(' ').map((w, i) => (
          <span key={i} style={{ display: 'block' }}>{w}</span>
        ))}
      </motion.h1>

      {/* Title */}
      <motion.p variants={item} style={{
        fontSize: '.84rem', fontWeight: 300, letterSpacing: '.015em',
        color: 'rgba(170,195,220,0.42)', marginBottom: 28,
      }}>
        {profile.title} · {profile.location}
      </motion.p>

      {/* Bio */}
      <motion.p variants={item} style={{
        fontSize: '.94rem', fontWeight: 300, lineHeight: 1.75, letterSpacing: '-.005em',
        color: 'rgba(185,205,225,0.5)', maxWidth: 380, marginBottom: 36,
      }}>
        {profile.bio}
      </motion.p>

      <motion.div variants={item} style={{ height: 1, maxWidth: 340, background: 'rgba(255,255,255,0.055)', marginBottom: 28 }} />

      {/* Actions */}
      <motion.div variants={item} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        <a href={profile.resumeUrl} download className="action-pill primary">
          <Download size={13} strokeWidth={1.5} />
          Resume
        </a>
        <a href={`mailto:${profile.email}`} className="action-pill primary">
          <Mail size={13} strokeWidth={1.5} />
          Contact
        </a>
      </motion.div>

      {/* Social */}
      <motion.div variants={item} style={{ display: 'flex', gap: 18 }}>
        {[['GitHub', profile.github], ['LinkedIn', profile.linkedin]].map(([label, url]) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
            fontSize: '.72rem', fontWeight: 300, letterSpacing: '.06em',
            color: 'rgba(150,175,205,0.28)', textDecoration: 'none',
            transition: 'color .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(185,210,235,0.6)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(150,175,205,0.28)')}
          >
            {label} ↗
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
