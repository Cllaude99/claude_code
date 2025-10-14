'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import type { Post } from '@/types/post';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
}

export function SearchModal({ isOpen, onClose, posts }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredPosts([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const results = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchQuery);
      const descriptionMatch = post.description
        .toLowerCase()
        .includes(searchQuery);
      const tagsMatch = post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery),
      );

      return titleMatch || descriptionMatch || tagsMatch;
    });

    setFilteredPosts(results);
  }, [query, posts]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      setFilteredPosts([]);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="fixed left-1/2 top-[10vh] w-full max-w-2xl -translate-x-1/2 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* 검색 입력창 */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="글 제목, 설명, 태그로 검색하세요..."
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* 검색 결과 */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                글 제목, 설명, 태그로 검색하세요
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="py-2">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/post/${post.slug}`}
                    onClick={onClose}
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Search className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {post.description}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                검색 결과가 없습니다
              </div>
            )}
          </div>

          {/* 푸터 */}
          {filteredPosts.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {filteredPosts.length}개의 결과를 찾았습니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
