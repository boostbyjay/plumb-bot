export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};
