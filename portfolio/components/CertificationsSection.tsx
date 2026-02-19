'use client';

import { certifications } from '@/app/data';
import { trackEvent } from '@/lib/analytics';
import { CardStack } from './CardStack';

type CertificationsSectionProps = {
  query?: string;
};

export function CertificationsSection({ query = '' }: CertificationsSectionProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCertifications = normalizedQuery
    ? certifications.filter(certification => {
        const searchable = [
          certification.name,
          certification.sub,
          certification.period,
          certification.desc,
          certification.tech?.join(' '),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return searchable.includes(normalizedQuery);
      })
    : certifications;

  if (filteredCertifications.length === 0) {
    return (
      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: '0 22px' }}>
        <p className="section-lbl">Certifications</p>
        <div className="glass" style={{ padding: '22px 24px', borderRadius: 26 }}>
          <p style={{ color: 'rgba(182,204,226,0.66)', fontSize: '.86rem', lineHeight: 1.6 }}>
            No certifications matched your search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CardStack
      label="Certifications"
      items={filteredCertifications}
      showVisitButton={false}
      extraButtons={(item) => (
        <a
          href={item.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="pill"
          onClick={() => trackEvent('credential_click', { certification_id: item.id, certification_name: item.name })}
        >
          {'View Credential \u2197'}
        </a>
      )}
    />
  );
}
