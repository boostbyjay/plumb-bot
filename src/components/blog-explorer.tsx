"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/post-card";
import type { PostMeta } from "@/lib/types";

export function BlogExplorer({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = !activeCategory || post.category === activeCategory;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="blog-search"
            name="blog-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, e.g. “water heater” or “clogged drain”"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setActiveCategory(null)}>
            <Badge
              variant={activeCategory === null ? "default" : "secondary"}
              className="cursor-pointer font-normal"
            >
              All topics
            </Badge>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category === activeCategory ? null : category)}
            >
              <Badge
                variant={activeCategory === category ? "default" : "secondary"}
                className="cursor-pointer font-normal"
              >
                {category}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "guide" : "guides"}
        {activeCategory ? ` in “${activeCategory}”` : ""}
        {query ? ` matching “${query}”` : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
          <p>No guides match that search yet. Try a different keyword or topic.</p>
        </div>
      )}
    </div>
  );
}
