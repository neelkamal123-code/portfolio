'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface StackItem {
  id: string;
  name: string;
  accent?: boolean;
  sub: string;
  period: string;
  desc?: string;
  tech?: string[];
  url?: string;
  sourceUrl?: string;
  demoUrl?: string | null;
}

interface CardStackProps {
  label: string;
  items: StackItem[];
  extraButtons?: (item: StackItem) => React.ReactNode;
}

const POS: Record<number, React.CSSProperties> = {
  0: { position:'relative', zIndex:12, transform:'translate3d(0,0,0) scale3d(1,1,1) rotateX(0deg)', opacity:1 },
  1: { position:'absolute', zIndex:9,  transform:'translate3d(0,-46px,-40px) scale3d(0.94,0.94,1) rotateX(1.8deg)', opacity:0.70 },
  2: { position:'absolute', zIndex:6,  transform:'translate3d(0,-80px,-90px) scale3d(0.87,0.87,1) rotateX(3.5deg)', opacity:0.42 },
  3: { position:'absolute', zIndex:3,  transform:'translate3d(0,-106px,-140px) scale3d(0.80,0.80,1) rotateX(5deg)',   opacity:0.18 },
  4: { position:'absolute', zIndex:1,  transform:'translate3d(0,-122px,-180px) scale3d(0.74,0.74,1) rotateX(6deg)',   opacity:0,   pointerEvents:'none' },
};

function getPos(i: number, active: number) {
  const diff = i - active;
  if (diff < 0) return 4;
  return Math.min(diff, 4);
}

const chipV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const chipI = {
  hidden: { opacity: 0, y: 5 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.26, ease: [0,0,0.2,1] as [number,number,number,number] } },
};

export function CardStack({ label, items, extraButtons }: CardStackProps) {
  const [active, setActive] = useState(0);
  const [panels, setPanels] = useState<Record<string, boolean>>({});
  const stackRef = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);
  const touchT = useRef(0);

  const closeAllPanels = useCallback(() => {
    setPanels({});
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= items.length || idx === active) return;
    closeAllPanels();
    setActive(idx);
  }, [active, items.length, closeAllPanels]);

  const togglePanel = (idx: number, type: 'desc' | 'tech') => {
    const key = `${idx}-${type}`;
    const other = `${idx}-${type === 'desc' ? 'tech' : 'desc'}`;
    setPanels(prev => ({ ...prev, [other]: false, [key]: !prev[key] }));
  };

  // Keyboard navigation
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(active + 1);
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(active - 1);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  return (
    <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: '0 22px' }}>
      <p className="section-lbl">{label}</p>

      {/* Stack */}
      <div
        ref={stackRef}
        tabIndex={-1}
        style={{ position: 'relative', perspective: 1400, perspectiveOrigin: '50% 60%', paddingBottom: 52 }}
        onTouchStart={e => { touchX.current = e.touches[0].clientX; touchT.current = Date.now(); }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          const vel = Math.abs(dx) / (Date.now() - touchT.current);
          if (Math.abs(dx) > 40 || (Math.abs(dx) > 18 && vel > 0.35)) goTo(active + (dx < 0 ? 1 : -1));
        }}
      >
        {items.map((item, i) => {
          const pos = getPos(i, active);
          const isActive = i === active;

          return (
            <div
              key={item.id}
              onClick={!isActive ? () => goTo(i) : undefined}
              style={{
                ...POS[pos],
                inlineSize: '100%',
                left: 0, right: 0,
                transition: 'transform 420ms cubic-bezier(0.32,0.72,0,1), opacity 420ms cubic-bezier(0,0,0.2,1)',
                transformOrigin: 'center 110%',
                willChange: 'transform, opacity',
                cursor: isActive ? 'default' : 'pointer',
              }}
            >
              <div
                className="glass"
                style={{
                  padding: isActive ? '32px 28px 26px' : '22px 24px 18px',
                  position: 'relative', overflow: 'hidden', borderRadius: 26,
                }}
              >
                {/* Shine on active */}
                {isActive && (
                  <div style={{
                    position:'absolute', top:0, left:'-80%',
                    width:'50%', height:'100%', pointerEvents:'none',
                    background:'linear-gradient(110deg,transparent 30%,rgba(255,255,255,0.032) 50%,transparent 70%)',
                  }} />
                )}

                {isActive ? (
                  /* ── Hero card ── */
                  <>
                    <div style={{ display:'flex', alignItems:'flex-end', gap:6, marginBottom:3 }}>
                      <span style={{ fontSize:'clamp(1.9rem,6vw,2.6rem)', fontWeight:800, letterSpacing:'-.04em', lineHeight:.98, color:'#EBF4FF' }}>{item.name}</span>
                      {item.accent && <div style={{ width:9, height:9, borderRadius:'50%', flexShrink:0, marginBottom:5, background:'#86EFAC', boxShadow:'0 0 10px rgba(134,239,172,0.55)' }} />}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:10, margin:'15px 0 5px' }}>
                      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)' }} />
                      <span style={{ fontSize:'.72rem', fontWeight:500, letterSpacing:'.13em', textTransform:'uppercase', color:'rgba(188,210,232,0.58)' }}>{item.sub}</span>
                      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)' }} />
                    </div>
                    <p style={{ fontSize:'.68rem', fontWeight:300, letterSpacing:'.08em', textTransform:'uppercase', color:'rgba(155,183,212,0.34)', textAlign:'center' }}>{item.period}</p>
                    <div style={{ height:1, margin:'22px 0', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.06) 20%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 80%,transparent)' }} />

                    {/* Pills */}
                    <div style={{ display:'flex', gap:9, flexWrap:'wrap' }}>
                      {item.desc && (
                        <button
                          className={`pill${panels[`${i}-desc`] ? ' on' : ''}`}
                          onClick={() => togglePanel(i, 'desc')}
                        >Description</button>
                      )}
                      {item.tech && item.tech.length > 0 && (
                        <button
                          className={`pill${panels[`${i}-tech`] ? ' on' : ''}`}
                          onClick={() => togglePanel(i, 'tech')}
                        >Tech Stack</button>
                      )}
                      {extraButtons?.(item)}
                    </div>

                    {/* Desc expand */}
                    {item.desc && (
                      <div className={`ep${panels[`${i}-desc`] ? ' open' : ''}`}>
                        <div className="ep-inner">
                          <p className="ep-text">{item.desc}</p>
                        </div>
                      </div>
                    )}

                    {/* Tech expand */}
                    {item.tech && item.tech.length > 0 && (
                      <div className={`ep${panels[`${i}-tech`] ? ' open' : ''}`}>
                        <div className="ep-inner">
                          <AnimatePresence>
                            {panels[`${i}-tech`] && (
                              <motion.div variants={chipV} initial="hidden" animate="show" style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                                {item.tech.map(t => (
                                  <motion.span key={t} variants={chipI} className="tech-chip">{t}</motion.span>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* ── Preview card ── */
                  <>
                    <div style={{ fontSize:'1.35rem', fontWeight:700, letterSpacing:'-.025em', color:'rgba(198,218,238,0.68)', marginBottom:3 }}>{item.name}</div>
                    <div style={{ fontSize:'.75rem', fontWeight:400, color:'rgba(158,183,210,0.45)', marginBottom:2 }}>{item.sub}</div>
                    <div style={{ fontSize:'.68rem', fontWeight:300, color:'rgba(130,158,190,0.3)', marginBottom:14 }}>{item.period}</div>
                    <div style={{ height:1, background:'rgba(255,255,255,0.05)', marginBottom:12 }} />
                    <div style={{ display:'flex', gap:8 }}>
                      {item.desc && <span className="pill" style={{ pointerEvents:'none', fontSize:'.62rem' }}>Description</span>}
                      {item.tech && item.tech.length > 0 && <span className="pill" style={{ pointerEvents:'none', fontSize:'.62rem' }}>Tech Stack</span>}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Nav */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:18, marginTop:28 }}>
        <button
          className="sarr"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
        >
          <ChevronLeft size={18} strokeWidth={1.3} />
        </button>
        <div style={{ display:'flex', gap:7, alignItems:'center' }}>
          {items.map((_, i) => (
            <div
              key={i}
              className={`sdot${i === active ? ' on' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          className="sarr"
          onClick={() => goTo(active + 1)}
          disabled={active === items.length - 1}
          aria-label="Next"
        >
          <ChevronRight size={18} strokeWidth={1.3} />
        </button>
      </div>
    </div>
  );
}
