export const siteConfig = {
  name: "JJJ Plumbing",
  legalName: "JJJ Plumbing Inc",
  tagline: "Fast, Reliable Residential & Commercial Plumbing Services",
  phone: "(626) 506-6951",
  phoneHref: "tel:+16265066951",
  license: "CA LIC #842875",
  yearsInBusiness: 25,
  founded: new Date().getFullYear() - 25,
  hours: {
    standard: "Mon\u2013Sat, 8:00 AM \u2013 6:00 PM",
    emergency: "Same-Day Emergency Service Available",
  },
  region: "Los Angeles, Orange County & the San Gabriel Valley",
  address: {
    streetAddress: "",
    addressLocality: "San Gabriel",
    addressRegion: "CA",
    postalCode: "91776",
    addressCountry: "US",
  },
  geo: {
    latitude: 34.0961,
    longitude: -118.1058,
  },
  social: {
    facebook: "https://www.facebook.com/",
    google: "https://www.google.com/",
    yelp: "https://www.yelp.com/",
  },
  siteUrl: "https://www.jjjplumbing.com",
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Commercial", href: "#commercial" },
  { label: "About", href: "#about" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Reviews", href: "#reviews" },
];

export const serviceAreas = [
  // Los Angeles & greater LA County
  "Los Angeles",
  "East Los Angeles",
  "El Sereno",
  "Highland Park",
  "Eagle Rock",
  "Glassell Park",
  "Mount Washington",
  "Lincoln Heights",
  "Boyle Heights",
  "Atwater Village",
  "Silver Lake",
  "Echo Park",
  "Los Feliz",
  "Glendale",
  "Burbank",
  "Montebello",
  "Commerce",
  "Pico Rivera",
  "Whittier",
  "Downey",
  "Norwalk",
  "Bell",
  "Huntington Park",
  "South Gate",
  // Orange County
  "Anaheim",
  "Santa Ana",
  "Irvine",
  "Huntington Beach",
  "Garden Grove",
  "Fullerton",
  "Orange",
  "Costa Mesa",
  // San Gabriel Valley
  "San Gabriel",
  "Alhambra",
  "Monterey Park",
  "Rosemead",
  "Temple City",
  "Arcadia",
  "San Marino",
  "South Pasadena",
  "Pasadena",
  "El Monte",
  "South El Monte",
  "Baldwin Park",
  "West Covina",
  "Covina",
  "Azusa",
  "Duarte",
  "Monrovia",
  "Glendora",
];

export type Service = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon:
    | "flame"
    | "waves"
    | "thermometer"
    | "route"
    | "building2";
};

export const services: Service[] = [
  {
    id: "emergency-repairs",
    title: "Emergency Repairs",
    description:
      "Burst pipes, major leaks, and overflow emergencies handled fast, day or night.",
    bullets: [
      "Burst pipe & slab leak repair",
      "Emergency shutoff & mitigation",
      "Overflow & flooding response",
      "Same-day dispatch available",
    ],
    icon: "flame",
  },
  {
    id: "drain-cleaning",
    title: "Drain Cleaning & Hydro Jetting",
    description:
      "Blast through stubborn clogs and root intrusion with professional-grade hydro jetting.",
    bullets: [
      "Stubborn clog removal",
      "Root intrusion clearing",
      "High-pressure hydro jetting",
      "Video camera inspection",
    ],
    icon: "waves",
  },
  {
    id: "water-heaters",
    title: "Water Heater Services",
    description:
      "Tankless and traditional water heater repair, maintenance, and replacement.",
    bullets: [
      "Tankless water heater installs",
      "Traditional tank repair & replace",
      "Flushing & maintenance",
      "Energy-efficient upgrades",
    ],
    icon: "thermometer",
  },
  {
    id: "sewer-lines",
    title: "Sewer Line Repair & Replacement",
    description:
      "Trenchless repair and CIPP lining options that minimize disruption to your property.",
    bullets: [
      "Trenchless sewer repair",
      "CIPP pipe lining",
      "Full sewer line replacement",
      "Root & collapse repair",
    ],
    icon: "route",
  },
  {
    id: "commercial",
    title: "Commercial Plumbing",
    description:
      "Grease traps, backflow testing, and multi-unit maintenance for local businesses.",
    bullets: [
      "Grease trap service",
      "Backflow testing & certification",
      "Multi-unit property maintenance",
      "Scheduled preventive service",
    ],
    icon: "building2",
  },
];

export type Testimonial = {
  name: string;
  location: string;
  rating: 4 | 5;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Maria G.",
    location: "Alhambra, CA",
    rating: 5,
    quote:
      "Our kitchen pipe burst on a Sunday night and JJJ had someone at our door within the hour. Upfront pricing, no surprises, and the repair has held up perfectly.",
  },
  {
    name: "David L.",
    location: "Pasadena, CA",
    rating: 5,
    quote:
      "Replaced our old water heater with a tankless unit. The crew was professional, cleaned up after themselves, and explained everything before starting.",
  },
  {
    name: "Susan T.",
    location: "Monterey Park, CA",
    rating: 4,
    quote:
      "Great experience overall with our drain cleaning. Arrived a little later than the estimated window, but the work itself was thorough and the price was fair.",
  },
  {
    name: "Robert K.",
    location: "West Covina, CA",
    rating: 5,
    quote:
      "We manage a small restaurant and needed grease trap service on short notice. JJJ fit us in the same week and has been our go-to commercial plumber since.",
  },
  {
    name: "Angela P.",
    location: "Arcadia, CA",
    rating: 5,
    quote:
      "25 years of experience really shows. They diagnosed a sewer line issue two other companies missed and fixed it with trenchless repair in a single day.",
  },
  {
    name: "James H.",
    location: "Whittier, CA",
    rating: 4,
    quote:
      "Solid work on a slab leak repair. Communication could have been a touch faster, but the technician was knowledgeable and the guarantee gave us peace of mind.",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Do you charge extra for after-hours emergency calls?",
    answer:
      "We believe in transparent, upfront pricing you agree to before any work begins \u2014 you're always told the cost of your visit ahead of time so there are never hidden surprises on your invoice, even for same-day emergency dispatch.",
  },
  {
    question: "Are your plumbers licensed and insured?",
    answer: `Yes. JJJ Plumbing Inc is fully licensed (${siteConfig.license}) and insured, with 25 years of combined experience serving Los Angeles, Orange County, and the San Gabriel Valley. Every technician is background-checked and trained to the highest industry standards.`,
  },
  {
    question: "What areas do you service?",
    answer:
      "We proudly serve Los Angeles, Orange County, and the San Gabriel Valley \u2014 from central LA to the OC. If you're unsure whether we cover your neighborhood, give us a call \u2014 we're happy to check.",
  },
  {
    question: "How fast can you get to my home or business?",
    answer:
      "Same-day dispatch is available for most service areas, and we prioritize true emergencies like burst pipes or active leaks. Our standard service hours are Monday\u2013Saturday, 8:00 AM \u2013 6:00 PM.",
  },
  {
    question: "Do you offer any guarantees on your work?",
    answer:
      "Absolutely. We stand behind every job with a 100% satisfaction guarantee. If something isn't right, you let us know and we'll make it right \u2014 that's a promise we've kept for 25 years.",
  },
  {
    question: "Can you help with both residential and commercial properties?",
    answer:
      "Yes, we handle everything from single-family home repairs to multi-unit property maintenance, grease trap service, and backflow testing for local businesses.",
  },
];
