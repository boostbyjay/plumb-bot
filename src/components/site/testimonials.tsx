"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/site-config";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating
              ? "fill-brand-accent text-brand-accent"
              : "fill-slate-200 text-slate-200",
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % testimonials.length),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const current = testimonials[index];

  return (
    <section id="reviews" className="bg-brand-navy py-16 text-white sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-accent">
            Customer Reviews
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Our Customers Are Saying
          </h2>
        </div>

        <div className="relative mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10">
            <Quote className="size-8 text-brand-accent/70" />
            <p className="mt-4 text-lg leading-relaxed text-slate-100 sm:text-xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold">{current.name}</p>
                <p className="text-sm text-slate-400">{current.location}</p>
              </div>
              <Stars rating={current.rating} />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show review ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "size-2 rounded-full transition-all",
                    i === index ? "w-6 bg-brand-accent" : "bg-white/25",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
