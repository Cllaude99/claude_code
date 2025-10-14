import { Header } from '@/components/Header';
import { AboutContent } from '@/components/AboutContent';
import { getAllPosts } from '@/lib/posts';

function AboutPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#171717]">
      <Header posts={posts} variant="centered" />
      <AboutContent />
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Cllaude99</p>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
