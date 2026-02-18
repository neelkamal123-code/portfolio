'use client';

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
  return (
    <div className="liquid-dock-wrap">
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
