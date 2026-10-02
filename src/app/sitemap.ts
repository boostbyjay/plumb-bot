import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllSlugs } from "@/lib/posts";

const highIncomeCities = [
  "beverly-hills", "bel-air", "pacific-palisades", "santa-monica",
  "brentwood", "west-hollywood", "palos-verdes", "rancho-palos-verdes",
  "rolling-hills", "newport-beach", "laguna-beach", "manhattan-beach",
  "redondo-beach", "el-segundo", "irvine", "pasadena", "san-marino",
  "south-pasadena", "arcadia", "la-canada-flintridge", "sherman-oaks",
  "studio-city", "encino", "woodland-hills", "torrance", "long-beach",
  "culver-city", "cerritos", "lakewood", "west-covina",
];

const services = [
  "emergency-repairs",
  "drain-cleaning",
  "water-heaters",
  "sewer-lines",
  "commercial",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const paths: Array<{ url: string; lastModified: Date; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }> = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  // Service-city pages
  for (const service of services) {
    for (const city of highIncomeCities) {
      paths.push({
        url: `${baseUrl}/service-city/${service}/${city}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  // Individual blog posts
  for (const slug of getAllSlugs()) {
    paths.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return paths;
}
