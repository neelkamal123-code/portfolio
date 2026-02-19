'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Braces, Cloud, Code2, Cpu, Database, GitBranch, Server, Smartphone } from 'lucide-react';
import { skills } from '@/app/data';

const container = { hidden:{}, show:{ transition:{ staggerChildren:0.07 } } };
const item = { hidden:{ opacity:0, y:12 }, show:{ opacity:1, y:0, transition:{ duration:.44, ease:[0,0,0.2,1] } } };

function getSkillIcon(name: string) {
  const n = name.toLowerCase();
  const iconProps = { size: 14, strokeWidth: 1.8, color: 'rgba(168,196,226,0.54)' };

  if (n.includes('azure') || n.includes('cloud')) return <Cloud {...iconProps} />;
  if (n.includes('sql') || n.includes('dbms')) return <Database {...iconProps} />;
  if (n.includes('flutter') || n.includes('dart')) return <Smartphone {...iconProps} />;
  if (n.includes('microservices')) return <GitBranch {...iconProps} />;
  if (n.includes('docker') || n.includes('kubernetes')) return <Server {...iconProps} />;
  if (n.includes('api') || n.includes('backend')) return <Braces {...iconProps} />;
  if (n.includes('c#') || n.includes('oop') || n.includes('.net')) return <Code2 {...iconProps} />;

  return <Cpu {...iconProps} />;
}

export function SkillsSection() {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 110); return () => clearTimeout(t); }, []);

  return (
    <div style={{ width:'100%', maxWidth:520, margin:'0 auto', padding:'0 22px' }}>
      <p className="section-lbl">Skills</p>
      <motion.div variants={container} initial="hidden" animate="show" className="glass" style={{ padding:'28px 24px', display:'flex', flexDirection:'column', gap:22 }}>
        {skills.map((s) => (
          <motion.div key={s.name} variants={item} style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:'.77rem', fontWeight:300, color:'rgba(178,200,224,0.48)' }}>{s.name}</span>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:'.69rem', fontWeight:600, color:'rgba(148,175,208,0.22)', fontVariantNumeric:'tabular-nums' }}>{s.level}</span>
                {getSkillIcon(s.name)}
              </span>
            </div>
            <div style={{ height:1, background:'rgba(255,255,255,0.07)', borderRadius:1, overflow:'hidden' }}>
              <motion.div
                className="skill-fill"
                initial={{ scaleX:0 }}
                animate={go ? { scaleX: s.level / 100 } : { scaleX:0 }}
                transition={{ duration:1.1, ease:[0.4,0,0.2,1] }}
                style={{ height:'100%' }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
