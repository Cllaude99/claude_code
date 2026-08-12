import { ProjectCoverArt } from './ProjectCoverArt';
import { ProjectLinks } from './ProjectLinks';
import type { Project } from '@/types/portfolio';

interface PortfolioProjectHeroProps {
  project: Project;
}

export function PortfolioProjectHero({ project }: PortfolioProjectHeroProps) {
  const teamSummary = project.team.map((t) => `${t.role} ${t.count}명`).join(' · ');

  return (
    <header className="mb-16">
      <ProjectCoverArt image={project.image} title={project.title} size="hero" />
      <div className="mt-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400 md:text-lg">
          {project.tagline}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-500">
          <span className="tabular-nums">
            {project.period.start} – {project.period.end}
          </span>
          <span>·</span>
          <span>{teamSummary}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.links && (
          <div className="mt-6">
            <ProjectLinks links={project.links} />
          </div>
        )}
      </div>
    </header>
  );
}
