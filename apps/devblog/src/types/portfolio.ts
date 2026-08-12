export interface PortfolioMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Tradeoff {
  chosen: string;
  alternative: string;
  reason: string;
}

export interface CaseStudyImage {
  src: string;
  caption?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  metrics?: PortfolioMetric[];
  decisionRationale?: string;
  tradeoffs?: Tradeoff[];
  images?: CaseStudyImage[];
}

export interface ProjectLink {
  label: string;
  url: string;
  icon: 'github' | 'external';
}

export interface RetrospectiveItem {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  period: { start: string; end: string };
  background: string;
  team: { role: string; count: number }[];
  stack: string[];
  stackRationale?: { tech: string; reason: string }[];
  headlineMetrics: PortfolioMetric[];
  image?: string;
  accent?: 'sky' | 'violet' | 'emerald';
  responsibilities: string[];
  caseStudies: CaseStudy[];
  retrospective: RetrospectiveItem[];
  links?: ProjectLink[];
}

export interface ExperienceCaseStudy {
  title: string;
  problem: string;
  solution: string;
  result: string;
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  period: { start: string; end: string; current?: boolean };
  summary: string;
  bullets?: string[];
  caseStudies?: ExperienceCaseStudy[];
  reflection?: string;
}
