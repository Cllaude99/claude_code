import { projects } from '@/data/portfolio';
import type { Project } from '@/types/portfolio';

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) || null;
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
