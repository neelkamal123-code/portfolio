'use client';
import { CardStack } from './CardStack';
import { education } from '@/app/data';
export function EducationSection() {
  return <CardStack label="Education" items={education} />;
}
