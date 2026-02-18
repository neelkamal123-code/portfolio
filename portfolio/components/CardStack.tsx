'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  companyAbout?: string;
}

interface CardStackProps {
  label: string;
  items: StackItem[];
  extraButtons?: (item: StackItem) => React.ReactNode;
  showVisitButton?: boolean;
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

export function CardStack({ label, items, extraButtons, showVisitButton = true }: CardStackProps) {
  const [active, setActive] = useState(0);
  const [panels, setPanels] = useState<Record<string, boolean>>({});
  const stackRef = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);
  const touchY = useRef(0);
  const touchT = useRef(0);
  const touchMode = useRef<'idle' | 'undecided' | 'horizontal' | 'vertical'>('idle');
  const mouseX = useRef(0);
  const mouseT = useRef(0);
  const mouseDown = useRef(false);
  const wheelCarry = useRef(0);
  const wheelLockUntil = useRef(0);

  const closeAllPanels = useCallback(() => {
    setPanels({});
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= items.length || idx === active) return;
    closeAllPanels();
    setActive(idx);
  }, [active, items.length, closeAllPanels]);

  const swipeHint = active === items.length - 1 ? 'Swipe right' : 'Swipe left';
  const swipeHintX = active === items.length - 1 ? [0, -8, 0] : [0, 8, 0];

  const togglePanel = (idx: number, type: 'desc' | 'tech' | 'about') => {
    const keys = ['desc', 'tech', 'about'];
    setPanels(prev => {
      const next = { ...prev } as Record<string, boolean>;
      keys.forEach(k => {
        const key = `${idx}-${k}`;
        next[key] = k === type ? !prev[key] : false;
      });
      return next;
    });
  };

  return (
    <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: '0 22px' }}>
      <p className="section-lbl">{label}</p>

      {/* Stack */}
      <div
        ref={stackRef}
        tabIndex={-1}
        style={{
          position: 'relative',
          perspective: 1400,
          perspectiveOrigin: '50% 60%',
          paddingBottom: 'calc(76px + var(--dock-offset, 0px))',
          touchAction: 'pan-y',
        }}
        onTouchStart={e => {
          touchX.current = e.touches[0].clientX;
          touchY.current = e.touches[0].clientY;
          touchT.current = Date.now();
          touchMode.current = 'undecided';
        }}
        onTouchMove={e => {
          const dx = e.touches[0].clientX - touchX.current;
          const dy = e.touches[0].clientY - touchY.current;
          const absX = Math.abs(dx);
          const absY = Math.abs(dy);

          if (touchMode.current === 'undecided' && (absX > 10 || absY > 10)) {
            touchMode.current = absX > absY * 1.1 ? 'horizontal' : 'vertical';
          }

          if (touchMode.current === 'horizontal') {
            e.preventDefault();
          }
        }}
        onTouchEnd={e => {
          if (touchMode.current !== 'horizontal') {
            touchMode.current = 'idle';
            return;
          }

          const dx = e.changedTouches[0].clientX - touchX.current;
          const vel = Math.abs(dx) / (Date.now() - touchT.current);
          if (Math.abs(dx) > 26 || (Math.abs(dx) > 14 && vel > 0.22)) goTo(active + (dx < 0 ? 1 : -1));
          touchMode.current = 'idle';
        }}
        onTouchCancel={() => { touchMode.current = 'idle'; }}
        onMouseDown={e => {
          mouseDown.current = true;
          mouseX.current = e.clientX;
          mouseT.current = Date.now();
        }}
        onMouseUp={e => {
          if (!mouseDown.current) return;
          mouseDown.current = false;
          const dx = e.clientX - mouseX.current;
          const vel = Math.abs(dx) / (Date.now() - mouseT.current);
          if (Math.abs(dx) > 40 || (Math.abs(dx) > 18 && vel > 0.35)) goTo(active + (dx < 0 ? 1 : -1));
        }}
        onMouseLeave={() => {
          mouseDown.current = false;
          wheelCarry.current = 0;
        }}
        onWheel={e => {
          const primaryDelta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
          if (Math.abs(primaryDelta) < 12) return;

          const now = Date.now();
          wheelCarry.current += primaryDelta;

          if (now < wheelLockUntil.current) {
            e.preventDefault();
            return;
          }

          if (Math.abs(wheelCarry.current) >= 60) {
            const dir = wheelCarry.current > 0 ? 1 : -1;
            const next = active + dir;
            if (next >= 0 && next < items.length) {
              e.preventDefault();
              goTo(next);
              wheelLockUntil.current = now + 260;
            }
            wheelCarry.current = 0;
          }
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
                      {item.companyAbout && (
                        <button
                          className={`pill${panels[`${i}-about`] ? ' on' : ''}`}
                          onClick={() => togglePanel(i, 'about')}
                        >About</button>
                      )}
                      {item.tech && item.tech.length > 0 && (
                        <button
                          className={`pill${panels[`${i}-tech`] ? ' on' : ''}`}
                          onClick={() => togglePanel(i, 'tech')}
                        >Tech Stack</button>
                      )}
                      {extraButtons?.(item)}
                      {showVisitButton && item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pill"
                          style={{ textDecoration: 'none' }}
                        >Visit ↗</a>
                      )}
                    </div>

                    {/* Desc expand */}
                    {item.desc && (
                      <div className={`ep${panels[`${i}-desc`] ? ' open' : ''}`}>
                        <div className="ep-inner">
                          <p className="ep-text">{item.desc}</p>
                        </div>
                      </div>
                    )}

                    {/* About expand */}
                    {item.companyAbout && (
                      <div className={`ep${panels[`${i}-about`] ? ' open' : ''}`}>
                        <div className="ep-inner">
                          <p className="ep-text">{item.companyAbout}</p>
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

        {items.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 'calc(22px + var(--dock-offset, 0px))',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: 30,
            }}
          >
            <motion.div
              animate={{ x: swipeHintX }}
              transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.55, ease: 'easeInOut' }}
              style={{
                fontSize: '.64rem',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'rgba(188,210,232,0.9)',
                border: '1px solid rgba(148,190,232,0.28)',
                borderRadius: 999,
                padding: '7px 12px',
                background: 'rgba(8,20,40,0.72)',
                backdropFilter: 'blur(4px)',
                whiteSpace: 'nowrap',
              }}
            >
              {swipeHint}
            </motion.div>
          </motion.div>
        )}
      </div>

      {items.length > 1 && (
        <div style={{ display: 'flex', gap: 7, alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
          {items.map((_, i) => (
            <div key={i} className={`sdot${i === active ? ' on' : ''}`} style={{ cursor: 'default' }} />
          ))}
        </div>
      )}
    </div>
  );
}
