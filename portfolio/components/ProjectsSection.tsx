'use client';
import { CardStack } from './CardStack';
import { projects } from '@/app/data';

export function ProjectsSection() {
  return (
    <>
      <CardStack
        label="Projects"
        items={projects}
        extraButtons={(item) => (
          <>
            {item.sourceUrl && (
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="pill">{'Source \u2197'}</a>
            )}
          </>
        )}
      />
    </>
  );
}

