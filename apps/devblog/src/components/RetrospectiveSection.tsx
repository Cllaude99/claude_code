import type { RetrospectiveItem } from '@/types/portfolio';

interface RetrospectiveSectionProps {
  items: RetrospectiveItem[];
}

export function RetrospectiveSection({ items }: RetrospectiveSectionProps) {
  return (
    <section>
      <p className="mb-6 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
        회고
      </p>
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title}>
            <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">{item.title}</h4>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
