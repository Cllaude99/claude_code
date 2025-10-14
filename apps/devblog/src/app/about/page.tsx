import { Header } from '@/components/Header';
import { getAllPosts } from '@/lib/posts';
import { Code2, Coffee } from 'lucide-react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { HiMail } from 'react-icons/hi';

export const metadata = {
  title: 'About - Cllaude99',
  description: '개발자 Cllaude99를 소개합니다.',
};

export default function AboutPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-[#171717] dark:to-[#0a0a0a]">
      <Header posts={posts} />

      <main className="flex-1 mx-auto px-4 py-12 max-w-[52rem] w-full">
        {/* 인사말 섹션 */}
        <section className="mb-16 animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <Code2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              안녕하세요, Cllaude99입니다
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              더 나은 코드와 사용자 경험을 만들어가는 개발자입니다
            </p>
          </div>
        </section>

        {/* 자기소개 카드 */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Coffee className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              About Me
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                저는{' '}
                <strong className="text-blue-600 dark:text-blue-400">
                  코드의 간결함과 명료함
                </strong>
                을 중요시합니다. 복잡한 문제를 간결하고 명료한으로 풀어내는 것을
                즐깁니다.
              </p>
              <p>
                또한, 문제를 오래 논의하기보다는{' '}
                <strong className="text-purple-600 dark:text-purple-400">
                  빠르게 실행하고 직접 부딪히며 배움
                </strong>
                을 얻는 편입니다.
              </p>
              <p>
                새로운 분야나 주제를 꾸준히 탐색하면서{' '}
                <strong className="text-indigo-600 dark:text-indigo-400">
                  스스로의 지속적으로 성장
                </strong>
                하기 위해 노력하고 있습니다.
              </p>
              <p>
                개인의 성장에서 멈추는 것이 아니라, 주도적으로 일하며{' '}
                <strong className="text-pink-600 dark:text-pink-400">
                  개인의 성장과 팀의 시너지
                </strong>
                를 함께 추구하고 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 연락처 섹션 */}
        <section>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Connect With Me
            </h2>
            <div className="flex justify-center items-center gap-6">
              <a
                href="https://github.com/Cllaude99"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-200 hover:opacity-70"
                aria-label="GitHub"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 dark:bg-gray-200">
                  <SiGithub className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/%ED%83%9C%EC%9C%A4-%EA%B9%80-a94635301/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-200 hover:opacity-70"
                aria-label="LinkedIn"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 dark:bg-gray-200">
                  <SiLinkedin className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
              </a>

              <a
                href="mailto:cllaude1025@gmail.com"
                className="group transition-all duration-200 hover:opacity-70"
                aria-label="Email"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 dark:bg-gray-200">
                  <HiMail className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
              </a>
            </div>
            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              궁금한 점이나 협업 제안이 있으시다면 언제든 연락주세요! 🚀
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Cllaude99</p>
        </div>
      </footer>
    </div>
  );
}
