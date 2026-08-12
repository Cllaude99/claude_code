interface MetricStatProps {
  label: string;
  value: string;
  detail?: string;
}

export function MetricStat({ label, value, detail }: MetricStatProps) {
  return (
    <div>
      <p className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-gray-100">
        {value}
      </p>
      <p className="mt-1 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500">
        {label}
      </p>
      {detail && (
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{detail}</p>
      )}
    </div>
  );
}
