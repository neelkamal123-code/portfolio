'use client';

import type { CSSProperties } from 'react';
import { certifications } from '@/app/data';
import { trackEvent } from '@/lib/analytics';
import { Building2, Github, GraduationCap, ShieldCheck } from 'lucide-react';
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

  const getIssuerIcon = (issuer: string) => {
    const normalized = issuer.toLowerCase();
    const iconProps = { size: 14, strokeWidth: 1.8, color: 'rgba(168,196,226,0.62)' };

    if (normalized.includes('github')) return <Github {...iconProps} />;
    if (normalized.includes('microsoft')) return <ShieldCheck {...iconProps} />;
    if (normalized.includes('elite')) return <GraduationCap {...iconProps} />;
    return <Building2 {...iconProps} />;
  };

  const getIssuerWebsite = (issuer: string) => {
    const normalized = issuer.toLowerCase();
    if (normalized.includes('microsoft')) return 'https://www.microsoft.com/';
    if (normalized.includes('wipro')) return 'https://www.wipro.com/';
    if (normalized.includes('elite')) return 'https://www.capabl.in/';
    if (normalized.includes('incubate')) return 'https://incubateind.com/';
    return null;
  };

  return (
    <CardStack
      label="Certifications"
      items={filteredCertifications}
      subAdornment={(item) => {
        const issuerWebsite = getIssuerWebsite(item.sub);
        const badgeStyle: CSSProperties = {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          borderRadius: 999,
          border: '1px solid rgba(174,205,236,0.22)',
          background: 'rgba(9,20,38,0.5)',
          color: 'rgba(168,196,226,0.7)',
        };

        if (!issuerWebsite) {
          return <span style={badgeStyle} title={item.sub}>{getIssuerIcon(item.sub)}</span>;
        }

        return (
          <a
            href={issuerWebsite}
            target="_blank"
            rel="noopener noreferrer"
            style={badgeStyle}
            title={`${item.sub} website`}
            onClick={() => trackEvent('cert_issuer_click', { issuer: item.sub, issuer_website: issuerWebsite })}
          >
            {getIssuerIcon(item.sub)}
          </a>
        );
      }}
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
