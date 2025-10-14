import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getAllPosts, getAllSlugs, getPostBySlug } from '@/lib/posts';
import { MarkdownContent } from '@/components/MarkdownContent';
import { Header } from '@/components/Header';
import { Comments } from '@/components/Comments';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `cllaude99 | ${post.title}`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#171717]">
      <Header posts={allPosts} variant="centered" />

      <article className="flex-1 mx-auto px-4 py-8 max-w-[52rem] w-full">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'yyyy년 MM월 dd일')}
            </time>
            <span>·</span>
            <span>{post.readingTime.text}</span>
            {post.author && (
              <>
                <span>·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownContent content={post.content} />
        </div>

        {/* 댓글 섹션 */}
        <Comments />
      </article>

      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Cllaude99</p>
        </div>
      </footer>
    </div>
  );
}
