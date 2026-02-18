'use client';
import { CardStack } from './CardStack';
import { certifications } from '@/app/data';
export function CertificationsSection() {
  return (
    <CardStack
      label="Certifications"
      items={certifications}
      showVisitButton={false}
      extraButtons={(item) => (
        <a href={item.url || '#'} target="_blank" rel="noopener noreferrer" className="pill">
          View Credential ↗
        </a>
      )}
    />
  );
}
