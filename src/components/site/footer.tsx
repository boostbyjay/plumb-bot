import type { SVGProps } from "react";
import Image from "next/image";
import { MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-navy-dark pb-24 pt-14 text-slate-300 lg:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex items-center rounded-md bg-white/95 px-2.5 py-1.5">
              <Image
                src="/jjj-plumbing-logo.png"
                alt="JJJ Plumbing logo"
                width={1300}
                height={484}
                className="h-8 w-auto"
              />
            </div>
            <p className="mt-4 text-sm text-slate-400">
              {siteConfig.tagline}. Serving the San Gabriel Valley and Los
              Angeles County for {siteConfig.yearsInBusiness} years.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="size-4 text-brand-accent" />
              {siteConfig.license}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-brand-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="text-sm text-slate-400 hover:text-brand-accent"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2 hover:text-brand-accent"
                >
                  <Phone className="size-4" />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {siteConfig.region}
              </li>
              <li>{siteConfig.hours.standard}</li>
              <li className="font-semibold text-brand-accent">
                {siteConfig.hours.emergency}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Follow &amp; Review Us
            </h3>
            <div className="mt-4 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand-accent hover:text-brand-navy-dark"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.google}
                target="_blank"
                rel="noreferrer"
                aria-label="Google Reviews"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand-accent hover:text-brand-navy-dark"
              >
                <Star className="size-4" />
              </a>
            </div>
            <p className="mt-5 text-xs text-slate-500">
              &copy; {new Date().getFullYear()} {siteConfig.legalName}. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
