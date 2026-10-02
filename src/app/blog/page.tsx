import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog-explorer";
import { getAllCategories, getAllPostsMeta } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Plumbing Blog — DIY Guides & Pro Tips | JJJ Plumbing",
  description:
    "Browse practical plumbing guides: simple DIY fixes, warning signs to watch for, and honest advice on when to call a professional.",
  openGraph: {
    title: "Plumbing Blog — DIY Guides & Pro Tips | JJJ Plumbing",
    description:
      "Browse practical plumbing guides: simple DIY fixes, warning signs to watch for, and honest advice on when to call a professional.",
    url: `${siteConfig.siteUrl}/blog`,
    siteName: "JJJ Plumbing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plumbing Blog — DIY Guides & Pro Tips | JJJ Plumbing",
    description:
      "Browse practical plumbing guides: simple DIY fixes, warning signs to watch for, and honest advice on when to call a professional.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-blue">
            Plumbing Guides
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            The JJJ Plumbing Blog
          </h1>
          <p className="mt-4 text-slate-600">
            {posts.length} guides and counting — simple fixes you can try today,
            and the honest signs it&rsquo;s time to bring in a pro.
          </p>
        </div>

        <div className="mt-10">
          <BlogExplorer posts={posts} categories={categories} />
        </div>
      </div>
    </div>
  );
}
