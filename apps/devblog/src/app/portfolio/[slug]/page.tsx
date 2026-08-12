import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { PortfolioProjectHero } from '@/components/PortfolioProjectHero';
import { CaseStudySection } from '@/components/CaseStudySection';
import { RetrospectiveSection } from '@/components/RetrospectiveSection';
import { getAllPosts } from '@/lib/posts';
import { getAllProjects, getAllProjectSlugs, getProjectBySlug } from '@/lib/portfolio';

interface PortfolioProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PortfolioProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `cllaude99 | ${project.title}`,
    description: project.tagline,
  };
}

export default async function PortfolioProjectPage({ params }: PortfolioProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const posts = getAllPosts();

  if (!project) {
    notFound();
  }

  const otherProject = getAllProjects().find((p) => p.slug !== project.slug);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#171717]">
      <Header posts={posts} variant="centered" />
      <main className="mx-auto w-full max-w-[52rem] flex-1 px-6 py-16">
        <PortfolioProjectHero project={project} />

        <section className="mb-20">
          <p className="mb-4 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Background
          </p>
          <p className="mb-8 text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
            {project.background}
          </p>
          {project.stackRationale && project.stackRationale.length > 0 && (
            <div className="space-y-3">
              {project.stackRationale.map((item) => (
                <p key={item.tech} className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-mono font-medium text-gray-900 dark:text-gray-100">
                    {item.tech}
                  </span>
                  {': '}
                  {item.reason}
                </p>
              ))}
            </div>
          )}
        </section>

        <section className="mb-20">
          <p className="mb-4 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
            맡은 업무
          </p>
          <ul className="list-inside list-disc space-y-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {project.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-20 space-y-20">
          {project.caseStudies.map((caseStudy, index) => (
            <CaseStudySection key={caseStudy.slug} caseStudy={caseStudy} index={index} />
          ))}
        </section>

        <section className="mb-20">
          <RetrospectiveSection items={project.retrospective} />
        </section>

        <nav className="flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800">
          <Link
            href="/portfolio"
            className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← 전체 프로젝트
          </Link>
          {otherProject && (
            <Link
              href={`/portfolio/${otherProject.slug}`}
              className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              {otherProject.title} 보기 →
            </Link>
          )}
        </nav>
      </main>
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Cllaude99</p>
        </div>
      </footer>
    </div>
  );
}
