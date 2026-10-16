import Image from "next/image";
import { MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";

export function Footer() {
  const topFooterCities = [
    { name: "Los Angeles", slug: "los-angeles" },
    { name: "Pasadena", slug: "pasadena" },
    { name: "San Gabriel", slug: "san-gabriel" },
    { name: "West Covina", slug: "west-covina" },
    { name: "Arcadia", slug: "arcadia" },
    { name: "Glendale", slug: "glendale" },
    { name: "Alhambra", slug: "alhambra" },
    { name: "Beverly Hills", slug: "beverly-hills" },
    { name: "Santa Monica", slug: "santa-monica" },
    { name: "Long Beach", slug: "long-beach" },
    { name: "Anaheim", slug: "anaheim" },
    { name: "Irvine", slug: "irvine" },
  ];

  return (
    <footer className="bg-brand-navy-dark pb-20 pt-10 text-slate-300 lg:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/jjj-plumbing-logo-v3.png"
              alt="JJJ Plumbing logo"
              width={1179}
              height={403}
              className="h-12 w-auto rounded-md sm:h-14"
            />
            <p className="mt-4 text-sm text-slate-400">
              {siteConfig.tagline}. Serving Los Angeles, Orange County, and the
              San Gabriel Valley for {siteConfig.yearsInBusiness} years.
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
                  href="/neighborhoods"
                  className="text-sm text-slate-400 hover:text-brand-accent"
                >
                  Neighborhoods Served
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-sm text-slate-400 hover:text-brand-accent"
                >
                  Plumbing Blog &amp; Guides
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-sm text-slate-400 hover:text-brand-accent"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Top Service Areas
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
              {topFooterCities.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/service-city/emergency-repairs/${c.slug}`}
                    className="text-xs text-slate-400 hover:text-brand-accent transition-colors"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/#service-areas"
              className="mt-3 inline-block text-xs font-bold text-brand-accent hover:underline"
            >
              View All 65+ Cities →
            </a>
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
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {siteConfig.legalName}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
