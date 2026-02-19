'use client';

import { certifications } from '@/app/data';
import { trackEvent } from '@/lib/analytics';
import { CardStack } from './CardStack';

export function CertificationsSection() {
  return (
    <CardStack
      label="Certifications"
      items={certifications}
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
