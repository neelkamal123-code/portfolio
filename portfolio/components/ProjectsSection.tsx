'use client';
import { useState } from 'react';
import { CardStack } from './CardStack';
import { Modal } from './Modal';
import { projects } from '@/app/data';

export function ProjectsSection() {
  const [modal, setModal] = useState<{ title: string; url: string } | null>(null);
  return (
    <>
      <CardStack
        label="Projects"
        items={projects}
        extraButtons={(item) => (
          <>
            {item.sourceUrl && (
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="pill">Source ↗</a>
            )}
            {item.demoUrl && (
              <button className="pill" onClick={() => setModal({ title: item.name, url: item.demoUrl! })}>Live Demo</button>
            )}
          </>
        )}
      />
      <Modal isOpen={!!modal} onClose={() => setModal(null)} title={modal?.title} url={modal?.url} />
    </>
  );
}
