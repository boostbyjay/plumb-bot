import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import type { PostMeta } from "@/lib/types";

// Maps blog categories to relevant service city links
const categoryServiceMap: Record<string, { service: string; label: string }[]> = {
  "Plumbing 101": [
    { service: "emergency-repairs", label: "Emergency Repairs" },
    { service: "drain-cleaning", label: "Drain Cleaning" },
  ],
  "Water Heaters": [
    { service: "water-heaters", label: "Water Heater Service" },
  ],
  "Drains": [
    { service: "drain-cleaning", label: "Drain Cleaning" },
  ],
  "Emergency": [
    { service: "emergency-repairs", label: "Emergency Plumbing" },
  ],
  "Sewer Lines": [
    { service: "sewer-lines", label: "Sewer Line Repair" },
  ],
  "Commercial": [
    { service: "commercial", label: "Commercial Plumbing" },
  ],
};

const topCities = [
  "beverly-hills", "pasadena", "irvine", "santa-monica", "west-hollywood",
  "torrance", "long-beach", "newport-beach", "glendale", "sherman-oaks",
];

export function PostCard({ post }: { post: PostMeta }) {
  const serviceLinks = categoryServiceMap[post.category] || categoryServiceMap["Plumbing 101"];
  const citySlug = topCities[Math.abs(post.title.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)) % topCities.length];

  return (
    <Card className="group flex h-full flex-col justify-between gap-4 border-slate-200 bg-white py-5 transition-all hover:-translate-y-0.5 hover:border-brand-accent/40 hover:shadow-lg">
      <CardHeader className="gap-3">
        <Badge variant="secondary" className="font-normal">
          {post.category}
        </Badge>
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-brand-navy group-hover:text-brand-accent transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-accent transition-colors"
        >
          Read the guide
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        {serviceLinks.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
            {serviceLinks.slice(0, 2).map((link) => (
              <Link
                key={`${link.service}-${citySlug}`}
                href={`/service-city/${link.service}/${citySlug}`}
                className="inline-flex items-center rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-navy-light"
              >
                {link.label} in {citySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
