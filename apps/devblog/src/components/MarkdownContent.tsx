'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { MermaidDiagram } from './MermaidDiagram';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        code(props) {
          const { node, inline, className, children, ...rest } = props as {
            node?: unknown;
            inline?: boolean;
            className?: string;
            children?: React.ReactNode;
          };
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';

          if (!inline && language === 'mermaid') {
            return (
              <MermaidDiagram chart={String(children).replace(/\n$/, '')} />
            );
          }

          return (
            <code className={className} {...rest}>
              {children}
            </code>
          );
        },
        img(props) {
          const { src, alt } = props as {
            src?: string;
            alt?: string;
          };

          // src가 없으면 기본 img 태그 반환
          if (!src) {
            return <img {...props} />;
          }

          return (
            <Image
              src={src}
              alt={alt || ''}
              width={1200}
              height={800}
              className="rounded-lg my-6"
              style={{ width: '100%', height: 'auto' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              loading="lazy"
              priority={false}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
