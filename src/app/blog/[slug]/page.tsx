import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CtaBanner } from "@/components/cta-banner";
import { PostCard } from "@/components/post-card";
import { getAllPostsMeta, getAllSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const postUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "JJJ Plumbing",
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: `${siteConfig.siteUrl}/work/hydrojetting-truck-hero-1920.jpg`,
          width: 1920,
          height: 1080,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${siteConfig.siteUrl}/work/hydrojetting-truck-hero-1920.jpg`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPostsMeta()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const postUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-accent transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All guides
        </Link>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <header className="mb-8 space-y-4">
            <Badge variant="secondary" className="font-normal">
              {post.category}
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </header>

          <div
            className="prose prose-neutral max-w-none prose-headings:tracking-tight prose-headings:text-brand-navy prose-a:text-brand-blue prose-a:font-medium"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </article>

        {/* BlogPosting + BreadcrumbList schema for this post */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BlogPosting",
                  headline: post.title,
                  description: post.excerpt,
                  datePublished: post.date,
                  dateModified: post.date,
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": postUrl,
                  },
                  image: `${siteConfig.siteUrl}/work/hydrojetting-truck-hero-1920.jpg`,
                  author: {
                    "@type": "Organization",
                    name: siteConfig.legalName,
                    url: siteConfig.siteUrl,
                  },
                  publisher: {
                    "@type": "Organization",
                    name: siteConfig.legalName,
                    logo: {
                      "@type": "ImageObject",
                      url: `${siteConfig.siteUrl}/jjj-plumbing-logo-v2.png`,
                    },
                  },
                },
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
                    { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.siteUrl}/blog` },
                    { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
                  ],
                },
              ],
            }),
          }}
        />

        <div className="my-10">
          <CtaBanner />
        </div>

        {related.length > 0 && (
          <>
            <Separator className="mb-10" />
            <div className="space-y-6">
              <h2 className="text-xl font-semibold tracking-tight text-brand-navy">
                More on {post.category}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Internal linking: blog → service city pages */}
        <div className="mt-12 rounded-2xl border border-brand-accent/30 bg-brand-navy p-8 text-white sm:p-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Need a Licensed Plumber Today?
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Stop troubleshooting and get it fixed right the first time. JJJ Plumbing
            is licensed ({siteConfig.license}), insured, and serving 75+ cities across Los Angeles, Orange County, and the
            San Gabriel Valley for 25+ years.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/#estimate"
              className="inline-flex items-center rounded-xl bg-brand-accent px-6 py-3 text-sm font-bold text-brand-navy-dark hover:bg-sky-300 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
            >
              Get a Free Estimate
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Call {siteConfig.phone}
            </a>
          </div>
          <div className="mt-6 border-t border-white/15 pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2.5">
              Popular Local Plumbing Hubs
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { label: "San Gabriel Plumbers", href: "/service-city/emergency-repairs/san-gabriel" },
                { label: "Pasadena Plumbers", href: "/service-city/emergency-repairs/pasadena" },
                { label: "Alhambra Drain Cleaning", href: "/service-city/drain-cleaning/alhambra" },
                { label: "Arcadia Water Heaters", href: "/service-city/water-heaters/arcadia" },
                { label: "Monterey Park Sewer Repair", href: "/service-city/sewer-lines/monterey-park" },
                { label: "Los Angeles Plumbers", href: "/service-city/emergency-repairs/los-angeles" },
                { label: "Glendale Plumbers", href: "/service-city/emergency-repairs/glendale" },
                { label: "Anaheim Plumbers", href: "/service-city/emergency-repairs/anaheim" },
                { label: "Irvine Plumbers", href: "/service-city/emergency-repairs/irvine" },
                { label: "Whittier Plumbers", href: "/service-city/emergency-repairs/whittier" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-slate-200 hover:border-brand-accent hover:text-brand-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
