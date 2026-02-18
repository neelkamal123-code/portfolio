'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

type DockTab = {
  id: string;
  label: string;
  short: string;
};

export function LiquidPageDock({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: DockTab[];
  activeTab: string;
  onTabChange: (t: string) => void;
}) {
  const gestureX = useRef(0);
  const gestureY = useRef(0);
  const gestureT = useRef(0);
  const gestureMode = useRef<'idle' | 'undecided' | 'horizontal' | 'vertical'>('idle');
  const pointerId = useRef<number | null>(null);
  const lastWheelAt = useRef(0);

  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  const goByDelta = (delta: -1 | 1) => {
    if (activeIndex < 0) return;
    const next = activeIndex + delta;
    if (next < 0 || next >= tabs.length) return;
    onTabChange(tabs[next].id);
  };

  const finishGesture = (endX: number) => {
    if (gestureMode.current !== 'horizontal') {
      gestureMode.current = 'idle';
      return;
    }

    const dx = endX - gestureX.current;
    const dt = Math.max(1, Date.now() - gestureT.current);
    const vel = Math.abs(dx) / dt;
    if (Math.abs(dx) > 18 || (Math.abs(dx) > 10 && vel > 0.22)) {
      goByDelta(dx < 0 ? 1 : -1);
    }
    gestureMode.current = 'idle';
  };

  return (
    <div
      className="liquid-dock-wrap"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={e => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        pointerId.current = e.pointerId;
        gestureX.current = e.clientX;
        gestureY.current = e.clientY;
        gestureT.current = Date.now();
        gestureMode.current = 'undecided';
      }}
      onPointerMove={e => {
        if (pointerId.current !== e.pointerId) return;
        const dx = e.clientX - gestureX.current;
        const dy = e.clientY - gestureY.current;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        if (gestureMode.current === 'undecided' && (absX > 8 || absY > 8)) {
          gestureMode.current = absX > absY * 1.05 ? 'horizontal' : 'vertical';
        }

        if (gestureMode.current === 'horizontal' && e.cancelable) {
          e.preventDefault();
        }
      }}
      onPointerUp={e => {
        if (pointerId.current !== e.pointerId) return;
        finishGesture(e.clientX);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        pointerId.current = null;
      }}
      onPointerCancel={e => {
        if (pointerId.current === e.pointerId) {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
          gestureMode.current = 'idle';
          pointerId.current = null;
        }
      }}
      onWheel={e => {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 6) return;
        const now = Date.now();
        if (now - lastWheelAt.current < 220) return;
        if (e.cancelable) {
          e.preventDefault();
        }
        lastWheelAt.current = now;
        goByDelta(e.deltaX > 0 ? 1 : -1);
      }}
    >
      <motion.div
        className="liquid-dot-dock"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
        role="tablist"
        aria-label="Page navigation"
      >
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              className="liquid-dot-btn"
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              onClick={() => onTabChange(tab.id)}
            >
              <span className={`sdot liquid-dot${isActive ? ' on' : ''}`} />
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
