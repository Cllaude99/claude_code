import { SiGithub } from 'react-icons/si';
import { FiGlobe } from 'react-icons/fi';
import type { ProjectLink } from '@/types/portfolio';

interface ProjectLinksProps {
  links?: ProjectLink[];
}

export function ProjectLinks({ links }: ProjectLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
        >
          {link.icon === 'github' ? (
            <SiGithub className="h-4 w-4" />
          ) : (
            <FiGlobe className="h-4 w-4" />
          )}
          {link.label}
        </a>
      ))}
    </div>
  );
}
