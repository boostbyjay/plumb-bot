export type Neighborhood = {
  slug: string;
  name: string;
  city: string;
  region: string;
  focus: string;
  description: string;
  geo: { lat: number; lng: number };
};

export const neighborhoods: Neighborhood[] = [
  {
    slug: "silver-lake",
    name: "Silver Lake",
    city: "Los Angeles",
    region: "Los Angeles",
    focus: "Emergency plumbing, slab leaks",
    description:
      "Silver Lake's hillside homes and aging plumbing systems need experienced technicians. From slab leaks to emergency repiping, JJJ Plumbing handles the unique challenges of Silver Lake properties.",
    geo: { lat: 34.087, lng: -118.270 },
  },
  {
    slug: "echo-park",
    name: "Echo Park",
    city: "Los Angeles",
    region: "Los Angeles",
    focus: "Drain cleaning, hydro jetting",
    description:
      "Echo Park's historic bungalows and mature tree systems create unique drain and sewer challenges. Our hydro jetting and camera inspection services keep Echo Park homes flowing smoothly.",
    geo: { lat: 34.078, lng: -118.260 },
  },
  {
    slug: "highland-park",
    name: "Highland Park",
    city: "Los Angeles",
    region: "Los Angeles",
    focus: "Water heaters, repiping",
    description:
      "Highland Park's century-old homes often need full repiping and water heater upgrades. JJJ Plumbing specializes in bringing historic LA plumbing up to code without disrupting your home.",
    geo: { lat: 34.111, lng: -118.196 },
  },
  {
    slug: "eagle-rock",
    name: "Eagle Rock",
    city: "Los Angeles",
    region: "Los Angeles",
    focus: "Sewer line repair, emergency",
    description:
      "Eagle Rock properties deal with clay sewer lines and tree root intrusion. Our trenchless repair and CIPP lining solutions fix sewer lines without tearing up your yard.",
    geo: { lat: 34.139, lng: -118.215 },
  },
  {
    slug: "los-feliz",
    name: "Los Feliz",
    city: "Los Angeles",
    region: "Los Angeles",
    focus: "Drain cleaning, garbage disposal",
    description:
      "Los Feliz's mix of vintage apartments and luxury homes demands versatile plumbing expertise. From garbage disposal repairs to full drain cleaning, we handle it all.",
    geo: { lat: 34.104, lng: -118.286 },
  },
  {
    slug: "beverly-hills",
    name: "Beverly Hills",
    city: "Beverly Hills",
    region: "Los Angeles",
    focus: "High-end water heaters, commercial",
    description:
      "Beverly Hills properties require premium service and discretion. JJJ Plumbing delivers tankless water heater installations, smart home plumbing integration, and commercial plumbing for local businesses.",
    geo: { lat: 34.073, lng: -118.400 },
  },
  {
    slug: "brentwood",
    name: "Brentwood",
    city: "Los Angeles",
    region: "Los Angeles",
    focus: "Slab leak repair, water heaters",
    description:
      "Brentwood's slab foundations and hard water demand expert slab leak detection and water heater maintenance. Our non-invasive slab leak repair saves your floors and your budget.",
    geo: { lat: 34.052, lng: -118.463 },
  },
  {
    slug: "pacific-palisades",
    name: "Pacific Palisades",
    city: "Los Angeles",
    region: "Los Angeles",
    focus: "Emergency repairs, sewer lines",
    description:
      "Pacific Palisades hillside homes face unique plumbing challenges — from earthquake-related pipe damage to sewer lines on steep slopes. Our emergency dispatch team is ready 24/7.",
    geo: { lat: 34.047, lng: -118.528 },
  },
  {
    slug: "santa-monica",
    name: "Santa Monica",
    city: "Los Angeles",
    region: "Los Angeles",
    focus: "Drain cleaning, hydro jetting",
    description:
      "Santa Monica's coastal properties deal with salt-air corrosion and older plumbing infrastructure. Our hydro jetting and camera inspection services keep drains clear and pipes healthy.",
    geo: { lat: 34.019, lng: -118.491 },
  },
  {
    slug: "west-hollywood",
    name: "West Hollywood",
    city: "Los Angeles",
    region: "Los Angeles",
    focus: "Emergency plumbing, drain cleaning",
    description:
      "West Hollywood's dense urban landscape means plumbing emergencies happen fast. Our same-day dispatch and emergency repair services get you back up and running quickly.",
    geo: { lat: 34.090, lng: -118.361 },
  },
  {
    slug: "sherman-oaks",
    name: "Sherman Oaks",
    city: "Los Angeles",
    region: "San Fernando Valley",
    focus: "Water heaters, sewer lines",
    description:
      "Sherman Oaks homeowners trust JJJ Plumbing for water heater repairs and sewer line services. Our licensed technicians handle everything from maintenance to full replacements.",
    geo: { lat: 34.151, lng: -118.449 },
  },
  {
    slug: "studio-city",
    name: "Studio City",
    city: "Los Angeles",
    region: "San Fernando Valley",
    focus: "Emergency repairs, drain cleaning",
    description:
      "Studio City's mix of hillside estates and valley homes needs versatile plumbing expertise. From emergency burst pipe repairs to routine drain cleaning, we're your local plumbing partner.",
    geo: { lat: 34.149, lng: -118.395 },
  },
  {
    slug: "encino",
    name: "Encino",
    city: "Los Angeles",
    region: "San Fernando Valley",
    focus: "Sewer lines, water heaters",
    description:
      "Encino properties often deal with aging sewer lines and water heater issues. Our trenchless repair technology and expert water heater service keep Encino homes running smoothly.",
    geo: { lat: 34.159, lng: -118.501 },
  },
  {
    slug: "torrance",
    name: "Torrance",
    city: "Los Angeles",
    region: "South Bay",
    focus: "Commercial plumbing, drain cleaning",
    description:
      "Torrance businesses and homeowners rely on JJJ Plumbing for commercial grease trap service, backflow testing, and residential drain cleaning. Serving the South Bay since 2001.",
    geo: { lat: 33.836, lng: -118.341 },
  },
  {
    slug: "long-beach",
    name: "Long Beach",
    city: "Long Beach",
    region: "South Bay",
    focus: "Emergency plumbing, water heaters",
    description:
      "Long Beach's coastal properties face unique plumbing challenges — from salt corrosion to aging infrastructure. Our emergency repair team and water heater experts are ready to help.",
    geo: { lat: 33.770, lng: -118.194 },
  },
];
