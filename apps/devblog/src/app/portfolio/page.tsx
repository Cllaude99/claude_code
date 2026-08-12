import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { PortfolioHero } from '@/components/PortfolioHero';
import { ProjectCard } from '@/components/ProjectCard';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { EducationSection } from '@/components/EducationSection';
import { getAllPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: 'cllaude99 | Portfolio',
  description: '김태윤의 프로젝트 포트폴리오',
};

function PortfolioPage() {
  const posts = getAllPosts();
  const projects = getAllProjects();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#171717]">
      <Header posts={posts} variant="centered" />
      <main className="mx-auto w-full max-w-[52rem] flex-1 px-6 py-16">
        <PortfolioHero />

        <section className="mb-20">
          <p className="mb-6 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Projects
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <div className="mb-20">
          <ExperienceTimeline />
        </div>

        <EducationSection />
      </main>
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Cllaude99</p>
        </div>
      </footer>
    </div>
  );
}

export default PortfolioPage;
