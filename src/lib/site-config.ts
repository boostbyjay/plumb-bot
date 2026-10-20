export const siteConfig = {
  name: "JJJ Plumbing",
  legalName: "JJJ Plumbing Inc",
  tagline: "Fast, Reliable Residential & Commercial Plumbing Services",
  phone: "(626) 506-6951",
  phoneHref: "tel:+16265066951",
  email: "jjjplumbinginc@gmail.com",
  emailHref: "mailto:jjjplumbinginc@gmail.com",
  smsHref:
    "sms:+16265066951?body=Hi%20JJJ%20Plumbing,%20here%20is%20a%20photo%20of%20my%20plumbing%20issue%20($75%20voucher):%0A%0AName:%20%0ACity:%20%0ADescribe%20issue:%20",
  voucher: {
    code: "JJJ-75OFF",
    amount: "$75 Off",
    description: "Unlocked when you submit an estimate form or text in a photo of your issue (valid on repairs $300+, limit once per customer).",
    disclaimer: "Valid on repairs $300+. Limit one voucher per customer.",
  },
  cslbUrl: "https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=842875",
  bilingual: "Se Habla Español",
  financing: {
    heading: "Flexible 0% APR Financing",
    terms: "Up to 18 Months 0% Interest or as low as $79/mo",
    note: "Pre-qualify in 60 seconds with no impact on your credit score.",
  },
  coupons: [
    {
      id: "hydro-149",
      code: "HYDRO149",
      title: "$149 Hydro-Jetting Drain Cleaning",
      badge: "Heavy-Duty Clearing",
      serviceId: "drain-cleaning",
      amount: "$149",
      savings: "Save $250+",
      description: "High-pressure hydro-jetting blasts away heavy grease, sludge, tree roots, and stubborn buildup to restore pipes to like-new flow. Free video camera inspection included.",
      disclaimer: "Valid for residential main drain or cleanout access. Normal business hours. Limit one coupon per customer. Cannot be combined with other offers.",
      popular: true,
    },
    {
      id: "repair-75",
      code: "JJJ-75OFF",
      title: "$75 Off Any Repair",
      badge: "General Plumbing",
      serviceId: "emergency-repairs",
      amount: "$75 Off",
      savings: "Instant Discount",
      description: "Save $75 on any qualifying plumbing repair or replacement of $300 or more. Approved upfront before any work begins.",
      disclaimer: "Valid on repairs $300+. Limit one coupon per customer. Must mention at time of booking.",
      popular: false,
    },
    {
      id: "water-heater-150",
      code: "HEAT150",
      title: "$150 Off Water Heater",
      badge: "High-Ticket Savings",
      serviceId: "water-heaters",
      amount: "$150 Off",
      savings: "Save $150",
      description: "Save $150 on the purchase and professional installation of any tankless or traditional high-efficiency water heater.",
      disclaimer: "Valid on complete replacement and installation. Includes earthquake strapping and code compliance.",
      popular: false,
    },
    {
      id: "sewer-2nd-opinion",
      code: "SEWER-2ND",
      title: "Free 2nd Opinion & Sewer Camera",
      badge: "Sewer & Main Line",
      serviceId: "sewer-lines",
      amount: "100% Free",
      savings: "Save $250+ Diagnostic",
      description: "Got a high quote from another rooter company? We provide a 100% free second opinion and video camera inspection on sewer replacements.",
      disclaimer: "Must present written competitor estimate or camera footage. Residential sewer lateral lines.",
      popular: false,
    },
  ],
  license: "CA LIC #842875",
  yearsInBusiness: 25,
  founded: 2001,
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
    google: "https://www.google.com/search?q=JJJ+Plumbing+Inc+San+Gabriel+CA#lrd=0x80c2dbb505bf4799:0x8544c0175b922d5f,1,,,",
    yelp: "https://www.yelp.com/search?find_desc=JJJ+Plumbing&find_loc=San+Gabriel%2C+CA",
  },
  siteUrl: "https://www.jjjplumbing.com",
};

export const navLinks = [
  { label: "Specials", href: "/#specials" },
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#recent-work" },
  { label: "Financing", href: "/#financing" },
  { label: "Commercial", href: "/#commercial" },
  { label: "About", href: "/#about" },
  { label: "Reviews", href: "/#reviews" },
];

export const serviceAreas = [
  // Tier 1 — Core high-value markets
  "Los Angeles",
  "Anaheim",
  "Irvine",
  "Orange",
  "Pasadena",
  "Huntington Beach",
  "Glendale",
  "Long Beach",
  "Santa Ana",
  "Fullerton",
  // Tier 2 — Secondary SGV / LA County
  "West Covina",
  "Whittier",
  "Alhambra",
  "Monterey Park",
  "Arcadia",
  "Covina",
  "El Monte",
  "South Pasadena",
  "San Gabriel",
  "Glendora",
  "Baldwin Park",
  "Azusa",
  "Downey",
  "Montebello",
  "Pico Rivera",
  "Temple City",
  "San Marino",
  "Rosemead",
  "Duarte",
  "Monrovia",
  // Tier 3 — LA neighborhoods
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
  "Bell",
  "Commerce",
  "Norwalk",
  "Huntington Park",
  "South Gate",
  "South El Monte",
  // Tier 4 — OC
  "Garden Grove",
  "Costa Mesa",
  // Tier 5 — Blog cities (high-value markets with dedicated pages)
  "Burbank",
  "Cerritos",
  "Compton",
  "Culver City",
  "El Segundo",
  "Encino",
  "La Cañada Flintridge",
  "Laguna Beach",
  "Lakewood",
  "Manhattan Beach",
  "Newport Beach",
  "Pacific Palisades",
  "Palos Verdes",
  "Rancho Palos Verdes",
  "Redondo Beach",
  "Rolling Hills",
  "Santa Monica",
  "Sherman Oaks",
  "Studio City",
  "Torrance",
  "West Hollywood",
  "Woodland Hills",
  "Bel Air",
  "Beverly Hills",
  "Brentwood",
];

export function cityToSlug(city: string): string {
  return city
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function slugToCity(slug: string): string {
  return (
    serviceAreas.find((c) => cityToSlug(c) === slug) ||
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

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
      "Burst pipes, major leaks, and overflow emergencies handled fast with same-day dispatch.",
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
      "Our kitchen pipe burst on a Saturday afternoon and JJJ had someone at our door within the hour. Upfront pricing, no surprises, and the repair has held up perfectly.",
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
    question: "How does the diagnostic fee credit work?",
    answer:
      "Your service diagnostic fee is 100% credited toward the cost of any approved repair, drain cleaning, or replacement. You approve the exact written quote before work begins, and the evaluation fee is deducted directly from your final invoice — you never pay twice.",
  },
  {
    question: "Can I get a ballpark estimate from a photo before you dispatch?",
    answer:
      "Yes! Simply text a photo or short video of your plumbing problem to (626) 506-6951 with your city. Our dispatch team will review the issue, reply with a ballpark estimate, and automatically lock in your $75 repair voucher.",
  },
  {
    question: "How does JJJ Plumbing compare in price to large corporate franchise plumbers?",
    answer:
      "As an independent, master-plumber-operated company with 25 years of local history, we have zero corporate franchise fees, call center bureaucracy, or multi-million dollar TV ad budgets. We deliver higher master-craftsmanship standards with upfront written pricing that is typically 20% to 35% lower than corporate franchise rooters.",
  },
  {
    question: "Do you help with insurance documentation for burst pipes or slab leaks?",
    answer:
      "Yes. In the event of emergency water leaks, burst pipes, or foundation slab leaks, we supply your homeowners insurance adjuster with itemized diagnostic invoices, moisture damage documentation, and HD camera footage to help expedite your claim.",
  },
  {
    question: "What water heater and fixture brands do you install?",
    answer:
      "We stock and install premium residential and commercial brands including Bradford White, Rheem, Navien, Noritz, Rinnai, AO Smith, Moen, Kohler, and Delta. All water heater installations include earthquake strapping, thermal expansion mitigation, and full code compliance.",
  },
  {
    question: "Are your plumbers licensed, bonded, and insured in California?",
    answer: `Yes. JJJ Plumbing Inc holds active California CSLB License #${siteConfig.license.replace("CA LIC #", "")} with full commercial general liability and workers' compensation coverage. Every technician is background-checked, trained, and operates under direct master plumber supervision.`,
  },
  {
    question: "What areas in Southern California do you offer same-day dispatch?",
    answer:
      "We provide same-day emergency dispatch across Los Angeles, Orange County, and the San Gabriel Valley — including Alhambra, Pasadena, Glendale, Arcadia, Monterey Park, West Covina, Anaheim, Irvine, and surrounding neighborhoods.",
  },
  {
    question: "What guarantees do you offer on your plumbing repairs?",
    answer:
      "We back every job with our ironclad 'Fixed Right or It's Free' guarantee and 100% upfront pricing. If our repair does not solve your plumbing issue, we return and make it right at zero additional cost to you.",
  },
];
