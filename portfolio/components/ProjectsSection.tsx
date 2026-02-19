'use client';
import { CardStack } from './CardStack';
import { projects } from '@/app/data';
import { trackEvent } from '@/lib/analytics';

type ProjectsSectionProps = {
  query?: string;
};

export function ProjectsSection({ query = '' }: ProjectsSectionProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProjects = normalizedQuery
    ? projects.filter(project => {
        const searchable = [
          project.name,
          project.sub,
          project.period,
          project.desc,
          project.tech?.join(' '),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return searchable.includes(normalizedQuery);
      })
    : projects;

  if (filteredProjects.length === 0) {
    return (
      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: '0 22px' }}>
        <p className="section-lbl">Projects</p>
        <div className="glass" style={{ padding: '22px 24px', borderRadius: 26 }}>
          <p style={{ color: 'rgba(182,204,226,0.66)', fontSize: '.86rem', lineHeight: 1.6 }}>
            No projects matched your search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CardStack
        label="Projects"
        items={filteredProjects}
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

