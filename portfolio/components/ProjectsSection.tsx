'use client';
import { CardStack } from './CardStack';
import { projects } from '@/app/data';
import { trackEvent } from '@/lib/analytics';

export function ProjectsSection() {
  return (
    <>
      <CardStack
        label="Projects"
        items={projects}
        extraButtons={(item) => (
          <>
            {item.sourceUrl && (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
                onClick={() => trackEvent('project_source_click', { project_id: item.id, project_name: item.name })}
              >
                {'Source \u2197'}
              </a>
            )}
          </>
        )}
      />
    </>
  );
}

