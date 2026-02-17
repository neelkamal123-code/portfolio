'use client';
import { CardStack } from './CardStack';
import { experience } from '@/app/data';
export function ExperienceSection() {
  return <CardStack label="Experience" items={experience} />;
}
