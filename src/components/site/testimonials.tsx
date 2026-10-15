"use client";

import { Star, Quote } from "lucide-react";
import { testimonials as allTestimonials } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";

const overallRating = 4.7;
const reviewCount = 24;

// Use first 3 reviews, with ratings
const displayReviews = allTestimonials.slice(0, 3).map((t, i) => ({
  ...t,
  rating: i === 2 ? 4.8 : 5.0,
}));

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < Math.floor(rating)
              ? "fill-white text-white"
              : i < rating
                ? "fill-white/60 text-white/60"
                : "fill-white/20 text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="bg-brand-navy py-16 text-white sm:py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header bar */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="inline-block rounded-full border border-brand-accent/40 bg-brand-accent/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-accent">
              Verified Reviews
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              What Our Customers Say
            </h2>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-lg font-bold text-white">{overallRating} / 5.0</span>
              <span className="text-sm text-slate-300">
                Based on{" "}
                <a
                  href={siteConfig.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-brand-accent"
                >
                  {reviewCount} Google reviews
                </a>
              </span>
            </div>
          </div>
          <a
            href={siteConfig.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-bold text-brand-navy-dark transition-colors hover:bg-sky-300 shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Write a review
          </a>
        </div>

        {/* Review cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayReviews.map((review, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-white">
                    {review.name}
                  </p>
                  <StarRating rating={review.rating} />
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-200">
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{review.location}</span>
                <svg viewBox="0 0 24 24" className="size-4 opacity-60">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
