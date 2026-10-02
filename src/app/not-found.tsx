import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-extrabold text-brand-navy">404</h1>
      <p className="mt-4 text-xl font-semibold text-brand-navy">
        Page not found
      </p>
      <p className="mt-2 max-w-md text-slate-600">
        Looks like you&apos;ve taken a wrong turn. Don&apos;t worry — we can
        still help. Give us a call and we&apos;ll get you sorted.
      </p>
      <Button
        render={<a href={siteConfig.phoneHref} />}
        nativeButton={false}
        size="lg"
        className="mt-8 bg-brand-accent px-8 font-bold text-brand-navy-dark hover:bg-sky-300"
      >
        <Phone className="size-4" />
        Call (626) 506-6951
      </Button>
      <a
        href="/"
        className="mt-4 text-sm font-medium text-brand-blue hover:text-brand-accent"
      >
        ← Back to home
      </a>
    </div>
  );
}
