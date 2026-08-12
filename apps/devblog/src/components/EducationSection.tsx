import { education } from '@/data/portfolio';

export function EducationSection() {
  return (
    <section>
      <p className="mb-4 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
        Education
      </p>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {education.school}
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            {education.degree}
          </span>
        </p>
        <p className="tabular-nums text-sm text-gray-500 dark:text-gray-500">
          {education.period.start} – {education.period.end}
        </p>
      </div>
    </section>
  );
}
