export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags?: string[];
  category?: string;
  author?: string;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface PostFrontMatter {
  title: string;
  description: string;
  date: string;
  published?: boolean;
  tags?: string[];
  category?: string;
  author?: string;
}
