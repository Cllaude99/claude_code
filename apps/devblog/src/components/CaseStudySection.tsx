import Image from 'next/image';
import { MetricStat } from './MetricStat';
import type { CaseStudy } from '@/types/portfolio';

interface CaseStudySectionProps {
  caseStudy: CaseStudy;
  index: number;
}

const BLOCKS: { key: 'problem' | 'solution' | 'result'; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'result', label: 'Result' },
];

export function CaseStudySection({ caseStudy, index }: CaseStudySectionProps) {
  return (
    <article className="scroll-mt-24" id={caseStudy.slug}>
      <p className="mb-2 text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-600">
        Case {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="mb-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
        {caseStudy.title}
      </h3>

      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-x-10 gap-y-6">
          {caseStudy.metrics.map((metric) => (
            <MetricStat key={metric.label} {...metric} />
          ))}
        </div>
      )}

      <div className="mb-8 space-y-6">
        {BLOCKS.map(({ key, label }) => (
          <div key={key} className="border-l-2 border-gray-200 pl-6 dark:border-gray-800">
            <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
              {label}
            </p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {caseStudy[key]}
            </p>
          </div>
        ))}
      </div>

      {caseStudy.images && caseStudy.images.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {caseStudy.images.map((image) => (
            <div key={image.src}>
              <div className="relative h-64 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 md:h-72">
                <Image
                  src={image.src}
                  alt={image.caption ?? caseStudy.title}
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              {image.caption && (
                <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-500">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {caseStudy.decisionRationale && (
        <div className="mb-6 border-l-2 border-gray-200 pl-6 dark:border-gray-800">
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
            기술적 의사결정
          </p>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {caseStudy.decisionRationale}
          </p>
        </div>
      )}

      {caseStudy.tradeoffs && caseStudy.tradeoffs.length > 0 && (
        <div className="border-l-2 border-gray-200 pl-6 dark:border-gray-800">
          <p className="mb-3 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
            트레이드오프
          </p>
          <div className="space-y-4">
            {caseStudy.tradeoffs.map((tradeoff) => (
              <div key={tradeoff.chosen} className="text-sm">
                <p className="text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{tradeoff.chosen}</span>
                  <span className="text-gray-400 dark:text-gray-600"> vs. {tradeoff.alternative}</span>
                </p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{tradeoff.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
