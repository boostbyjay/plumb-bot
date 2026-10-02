import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Post, PostMeta } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function readRawPost(slug: string): { data: Record<string, unknown>; content: string } {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content };
}

export function getAllPostsMeta(): PostMeta[] {
  const slugs = readSlugs();
  const posts = slugs.map((slug) => {
    const { data, content } = readRawPost(slug);
    return {
      slug: (data.slug as string) || slug,
      title: (data.title as string) || slug,
      excerpt: (data.excerpt as string) || "",
      category: (data.category as string) || "Plumbing 101",
      tags: (data.tags as string[]) || [],
      date: (data.date as string) || new Date().toISOString().slice(0, 10),
      readTime: readingTime(content).text,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllCategories(): string[] {
  const posts = getAllPostsMeta();
  const set = new Set(posts.map((p) => p.category));
  return Array.from(set).sort();
}

export function getAllSlugs(): string[] {
  return readSlugs();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const { data, content } = readRawPost(slug);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const contentHtml = processed.toString();

  return {
    slug: (data.slug as string) || slug,
    title: (data.title as string) || slug,
    excerpt: (data.excerpt as string) || "",
    category: (data.category as string) || "Plumbing 101",
    tags: (data.tags as string[]) || [],
    date: (data.date as string) || new Date().toISOString().slice(0, 10),
    readTime: readingTime(content).text,
    contentHtml,
  };
}
