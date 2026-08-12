'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { experience } from '@/data/portfolio';

const CASE_STUDY_BLOCKS = [
  { key: 'problem', label: 'Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'result', label: 'Result' },
] as const;

export function ExperienceTimeline() {
  const [openOrg, setOpenOrg] = useState<string | null>(null);

  return (
    <section>
      <p className="mb-4 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
        Experience
      </p>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {experience.map((entry) => {
          const isOpen = openOrg === entry.organization;
          const hasDetail = Boolean(
            entry.bullets?.length || entry.caseStudies?.length || entry.reflection,
          );

          return (
            <div key={entry.organization}>
              <button
                type="button"
                onClick={() => hasDetail && setOpenOrg(isOpen ? null : entry.organization)}
                aria-expanded={isOpen}
                disabled={!hasDetail}
                className="flex w-full items-start justify-between gap-4 py-4 text-left disabled:cursor-default"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {entry.organization}
                    </p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{entry.role}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{entry.summary}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 pt-0.5">
                  <p className="tabular-nums text-sm text-gray-500 dark:text-gray-500">
                    {entry.period.start} – {entry.period.current ? '현재' : entry.period.end}
                  </p>
                  {hasDetail && (
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>
              </button>

              {isOpen && hasDetail && (
                <div className="space-y-8 pb-6 pr-2 md:pr-8">
                  {entry.bullets && entry.bullets.length > 0 && (
                    <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {entry.caseStudies?.map((caseStudy) => (
                    <div key={caseStudy.title}>
                      <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {caseStudy.title}
                      </p>
                      <div className="space-y-3">
                        {CASE_STUDY_BLOCKS.map(({ key, label }) => (
                          <div
                            key={key}
                            className="border-l-2 border-gray-200 pl-4 dark:border-gray-800"
                          >
                            <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
                              {label}
                            </p>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                              {caseStudy[key]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {entry.reflection && (
                    <div className="border-l-2 border-gray-200 pl-4 dark:border-gray-800">
                      <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
                        회고
                      </p>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {entry.reflection}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
