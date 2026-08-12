import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ProjectCoverArt } from './ProjectCoverArt';
import type { Project } from '@/types/portfolio';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const metric = project.headlineMetrics[0];

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block transition-transform hover:-translate-y-0.5"
    >
      <ProjectCoverArt image={project.image} title={project.title} size="card" />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
            {project.title}
            <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </h3>
          <p className="mt-1 line-clamp-2 min-h-10 text-sm text-gray-600 dark:text-gray-400">
            {project.tagline}
          </p>
        </div>
        {metric && (
          <div className="shrink-0 text-right">
            <p className="text-lg font-bold tabular-nums text-gray-900 dark:text-gray-100">
              {metric.value}
            </p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
              {metric.label}
            </p>
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
