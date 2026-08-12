import Image from 'next/image';
import { SiGithub } from 'react-icons/si';
import { HiMail } from 'react-icons/hi';

export function PortfolioHero() {
  return (
    <section className="mb-20">
      <div className="mb-6 flex items-center gap-6">
        <Image
          src="/favicon.png"
          alt="김태윤"
          width={112}
          height={112}
          className="shrink-0 rounded-full"
        />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
          김태윤
        </h1>
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-gray-700 dark:text-gray-300 md:text-base">
        변화에 유연한 코드와 사용자 관찰로 완성도를 높이는 개발자 김태윤입니다.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-700 dark:text-gray-300 md:text-base">
        구조와 재사용성을 고려해 지속가능한 코드를 설계하고자 노력합니다.
        <br />
        문제를 정확히 이해하고, 그에 가장 알맞은 기술로 풀어내는 것을 중요하게 생각합니다.
        <br />
        일에 대한 책임감을 가지고 주도적으로 움직이며, 동료와의 소통과 배움을 소중히 여깁니다.
        <br />
        예상대로 동작하는 코드에 안주하지 않고, 사용자 관점에서 더 나은 경험을 만들기 위해 끊임없이 개선합니다.
      </p>
      <div className="mt-6 flex items-center gap-4">
        <a
          href="https://github.com/Cllaude99"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          aria-label="GitHub"
        >
          <SiGithub className="h-5 w-5" />
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-700">
            GitHub
          </span>
        </a>
        <a
          href="mailto:cllaude1025@gmail.com"
          className="group relative text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          aria-label="Email"
        >
          <HiMail className="h-5 w-5" />
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-700">
            이메일
          </span>
        </a>
      </div>
    </section>
  );
}
