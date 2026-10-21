import { siteConfig } from "@/lib/site-config";

export type CityProfile = {
  regionName: string;
  architecture: string;
  soilAndTrees: string;
  waterProfile: string;
  commonChallenge: string;
  dispatchHub: string;
};

const foothillSGV = new Set([
  "Pasadena",
  "South Pasadena",
  "San Marino",
  "Arcadia",
  "Monrovia",
  "Duarte",
  "Glendora",
  "Azusa",
  "La Cañada Flintridge",
  "Sierra Madre",
]);

const centralSGV = new Set([
  "San Gabriel",
  "Alhambra",
  "Monterey Park",
  "Temple City",
  "Rosemead",
  "West Covina",
  "Covina",
  "El Monte",
  "South El Monte",
  "Baldwin Park",
  "Whittier",
  "Montebello",
  "Pico Rivera",
]);

const westsideLuxury = new Set([
  "Beverly Hills",
  "Bel Air",
  "Brentwood",
  "Pacific Palisades",
  "Santa Monica",
  "West Hollywood",
  "Culver City",
  "Malibu",
]);

const valleyCities = new Set([
  "Glendale",
  "Burbank",
  "Sherman Oaks",
  "Studio City",
  "Encino",
  "Woodland Hills",
]);

const northeastLA = new Set([
  "Highland Park",
  "Eagle Rock",
  "Glassell Park",
  "Mount Washington",
  "Silver Lake",
  "Echo Park",
  "Los Feliz",
  "Atwater Village",
  "Lincoln Heights",
  "Boyle Heights",
  "El Sereno",
  "East Los Angeles",
]);

const coastalSouthBayOC = new Set([
  "Manhattan Beach",
  "Redondo Beach",
  "El Segundo",
  "Torrance",
  "Palos Verdes",
  "Rancho Palos Verdes",
  "Rolling Hills",
  "Long Beach",
  "Huntington Beach",
  "Newport Beach",
  "Laguna Beach",
  "Costa Mesa",
]);

export function getCityProfile(cityName: string): CityProfile {
  if (foothillSGV.has(cityName)) {
    return {
      regionName: "San Gabriel Valley Foothills",
      architecture: "1920s–1950s Craftsman bungalows, Tudor estates, and custom hillside homes",
      soilAndTrees: "granitic foothill soil and deep-rooted mature camphor, oak, and ficus trees",
      waterProfile: "mineral-heavy foothill groundwater (12–16 gpg hardness) and high-pressure gravity zones (often exceeding 85–100 PSI)",
      commonChallenge: "original cast-iron drain scaling, clay sewer lateral root intrusion, and high-pressure water hammer stress on copper risers",
      dispatchHub: "our San Gabriel Valley master dispatch center",
    };
  }
  if (centralSGV.has(cityName)) {
    return {
      regionName: "San Gabriel Valley",
      architecture: "mid-century ranch homes, multi-generational residences, and busy commercial restaurant corridors",
      soilAndTrees: "expansive clay-loam valley soil and established parkway trees",
      waterProfile: "hard municipal water that accelerates calcium scale buildup inside water heaters and fixture cartridges",
      commonChallenge: "slab leaks beneath concrete foundations, main sewer root blockages, and commercial grease trap backups",
      dispatchHub: "our nearby San Gabriel headquarters (minutes away via I-10 & I-605)",
    };
  }
  if (westsideLuxury.has(cityName)) {
    return {
      regionName: "Westside & Coastal Los Angeles",
      architecture: "custom architectural estates, luxury hillside residences, and multi-story boutique properties",
      soilAndTrees: "steep canyon grades, shifting hillside soil, and dense privacy hedges",
      waterProfile: "high-demand multi-bath domestic water systems requiring balanced recirculation and smart leak shutoff protection",
      commonChallenge: "complex hillside sewer laterals, custom designer fixture servicing, and high-capacity condensing tankless installations",
      dispatchHub: "our Westside & Central LA rapid-response unit",
    };
  }
  if (valleyCities.has(cityName)) {
    return {
      regionName: "San Fernando & Verdugo Valleys",
      architecture: "post-war ranch properties, hillside view homes, and multi-unit apartment buildings",
      soilAndTrees: "warm valley soil where ficus, magnolia, and liquidambar roots aggressively seek moisture in sewer joints",
      waterProfile: "mineral-rich valley water and summer thermal expansion spikes",
      commonChallenge: "root-choked vitrified clay sewer pipes, aging 40–50 gallon tank water heaters, and pinhole copper slab leaks",
      dispatchHub: "our Valley & Glendale/Pasadena corridor crew",
    };
  }
  if (northeastLA.has(cityName)) {
    return {
      regionName: "Northeast & Central Los Angeles",
      architecture: "historic 1910s–1940s bungalows, hillside split-levels, and vintage duplexes",
      soilAndTrees: "steep terraced lots and century-old street trees",
      waterProfile: "fluctuating street main pressures and legacy galvanized supply piping",
      commonChallenge: "corroded galvanized water lines causing low pressure, tuberculated cast-iron stacks, and offset clay sewer joints",
      dispatchHub: "our Northeast LA & San Gabriel Valley rapid dispatch team",
    };
  }
  if (coastalSouthBayOC.has(cityName)) {
    return {
      regionName: "South Bay & Coastal Orange County",
      architecture: "coastal multi-level homes, beachside townhomes, and high-value commercial plazas",
      soilAndTrees: "sandy coastal subgrades, marine-air exposure, and high water tables",
      waterProfile: "chloramine-treated municipal water and salt-air corrosion on exterior plumbing assemblies",
      commonChallenge: "exterior tankless heat-exchanger scaling, corroded shutoff valves and PRVs, and main sewer line bellies in sandy soil",
      dispatchHub: "our South Bay & Orange County mobile jetting and service fleet",
    };
  }
  return {
    regionName: "Greater Los Angeles & Orange County",
    architecture: "established single-family neighborhoods, HOA townhome communities, and commercial centers",
    soilAndTrees: "compacted Southern California clay soil and mature residential landscaping",
    waterProfile: "hard Southern California municipal water (10–15 gpg) requiring routine descaling and pressure regulation",
    commonChallenge: "main line drain stoppages, aging water heater tanks, slab leaks, and failing pressure reducing valves",
    dispatchHub: "our local LA & Orange County dispatch fleet",
  };
}

export type ServiceDeepContent = {
  id: string;
  label: string;
  shortLabel: string;
  heroPhoto: string;
  heroPhotoAlt: string;
  couponCode: string;
  couponBadge: string;
  couponOffer: string;
  couponDesc: string;
  equipmentUsed: string[];
  processSteps: { title: string; detail: string }[];
  buildUniqueIntro: (cityName: string, profile: CityProfile, variant: number) => string;
  buildTechnicalSection: (cityName: string, profile: CityProfile, variant: number) => {
    heading: string;
    paragraphs: string[];
  };
  buildFaqs: (cityName: string, profile: CityProfile) => { question: string; answer: string }[];
};

export const serviceDeepContent: Record<string, ServiceDeepContent> = {
  "emergency-repairs": {
    id: "emergency-repairs",
    label: "Emergency Plumber",
    shortLabel: "Emergency Repairs",
    heroPhoto: "tech-descaling-drain",
    heroPhotoAlt: "JJJ Plumbing master technician performing same-day emergency plumbing repair with floor protection",
    couponCode: "JJJ-75OFF",
    couponBadge: "Same-Day Emergency Offer",
    couponOffer: "$75 Off Qualifying Repair",
    couponDesc: "Save $75 on any approved repair of $250 or more, plus 100% of your diagnostic fee is credited toward the fix.",
    equipmentUsed: [
      "Ultrasonic acoustic slab-leak detection & thermal imaging cameras",
      "Lead-free brass Wilkins pressure reducing valves (PRVs) & Moen Flo smart shutoffs",
      "Type-L heavy-wall copper, Uponor PEX-a, and seismic-rated shielded couplings",
      "Truck-stocked emergency isolation valves, cartridges, and burst-pipe repair kits",
    ],
    processSteps: [
      {
        title: "5-Minute Text Confirmation & Mitigation Guidance",
        detail: "As soon as you request service, we text you within 5 minutes and walk you through shutting off your main water or gas valve if needed.",
      },
      {
        title: "Non-Invasive Electronic Pinpointing",
        detail: "We use acoustic listening equipment, pressure gauges, and thermal cameras to locate hidden slab or wall leaks without unnecessary drywall demolition.",
      },
      {
        title: "Upfront Written Quote & Same-Day Fix",
        detail: "You approve the exact flat-rate price in writing before we turn a wrench. Your diagnostic fee is 100% credited toward the repair.",
      },
    ],
    buildUniqueIntro: (cityName, profile, v) => {
      const intros = [
        `When a pressurized copper line ruptures inside a wall, a slab leak warms up your flooring, or a main sewer cleanout overflows in ${cityName}, waiting until tomorrow is not an option. Operating out of ${profile.dispatchHub}, JJJ Plumbing dispatches licensed master technicians across ${cityName} with fully stocked trucks to stop active water damage on the first visit.`,
        `Plumbing emergencies in ${cityName} often strike without warning—frequently triggered by ${profile.waterProfile}. Because ${cityName} features ${profile.architecture}, our owner-operated crew arrives with electronic leak-locating gear, floor protection, and code-compliant replacement parts to resolve the crisis cleanly the same day.`,
        `Homeowners across ${cityName} (${profile.regionName}) rely on JJJ Plumbing when active leaks, sudden pressure drops, or fixture backups threaten their property. With 25+ years of hands-on experience and ${siteConfig.license}, we combine rapid same-day dispatch with transparent, flat-rate pricing you approve before any work begins.`,
      ];
      return intros[v % intros.length];
    },
    buildTechnicalSection: (cityName, profile, v) => ({
      heading: `Why Plumbing Emergencies Happen in ${cityName} & How We Fix Them Permanently`,
      paragraphs: [
        `In ${cityName}, many emergency calls trace back to ${profile.commonChallenge}. Properties built with ${profile.architecture} are particularly susceptible to pressure spikes when municipal street pressure surges above the code-safe 80 PSI limit. During every emergency call in ${cityName}, our technicians test your static water pressure and inspect your main Pressure Reducing Valve (PRV) so a repaired pipe doesn't blow out at the next weak joint.`,
        v % 2 === 0
          ? `For hidden slab leaks and in-wall pinhole leaks in ${cityName}, we never guess with a sledgehammer. We pressurize and isolate hot and cold manifolds, use electronic acoustic amplification to pinpoint the exact leak location, and give you clear options—from targeted spot repairs to overhead PEX-a or Type-L copper reroutes that permanently bypass compromised under-slab piping.`
          : `Whether you are dealing with a burst washing-machine supply valve, a failed main shutoff gate valve, or a sudden sewage backup into ground-floor showers in ${cityName}, our trucks carry commercial-grade extraction, descaling, and press-fit/sweat copper fittings to restore water service the same day.`,
      ],
    }),
    buildFaqs: (cityName, profile) => [
      {
        question: `How fast can your emergency plumber arrive in ${cityName}?`,
        answer: `We provide same-day dispatch across ${cityName} from ${profile.dispatchHub}. Once you submit our online form or call ${siteConfig.phone}, our dispatch team texts you within 5 minutes to confirm your arrival window.`,
      },
      {
        question: `Is the diagnostic fee credited if I approve the repair in ${cityName}?`,
        answer: `Yes — 100% of your on-site diagnostic fee is credited directly toward the cost of your approved repair, and you receive a written flat-rate price before we start work.`,
      },
      {
        question: `How do you detect slab leaks in ${cityName} homes without tearing up floors?`,
        answer: `We use non-invasive electronic acoustic listening sensors, line-pressure isolation, and infrared thermal imaging to pinpoint leaks beneath concrete slabs or behind tile in ${cityName} properties with millimeter accuracy.`,
      },
      {
        question: `Are your technicians licensed and insured to work in ${cityName}?`,
        answer: `Yes. JJJ Plumbing Inc holds active California Contractor License ${siteConfig.license}, carries full general liability and workers' compensation insurance, and backs every repair in ${cityName} with a 100% workmanship guarantee.`,
      },
    ],
  },

  "drain-cleaning": {
    id: "drain-cleaning",
    label: "Drain Cleaning",
    shortLabel: "Drain Cleaning & Hydro Jetting",
    heroPhoto: "root-removal-drain-machine",
    heroPhotoAlt: "Heavy tree root mass extracted from a residential sewer drain by JJJ Plumbing",
    couponCode: "HYDRO249",
    couponBadge: "Most Popular Drain Special",
    couponOffer: "$249 Hydro-Jetting Special",
    couponDesc: "High-pressure hydro-jetting blasts away grease, sludge, and roots—includes a FREE HD video camera inspection.",
    equipmentUsed: [
      "Truck-mounted 4,000 PSI @ 18 GPM commercial hydro-jetting system",
      "RIDGID FlexShaft high-speed chain knockers for safe cast-iron descaling",
      "Heavy-duty sectional root-cutting cable machines",
      "Self-leveling HD color sewer camera with 512Hz sonde transmitter",
    ],
    processSteps: [
      {
        title: "Initial Flow Assessment & Cleanout Access",
        detail: "We locate your main line cleanout or pull the affected trap with drop cloths down to keep your bathroom or kitchen spotless.",
      },
      {
        title: "Mechanical Root Cutting or 4,000 PSI Hydro-Jetting",
        detail: "Unlike cheap $49 rooter companies that poke a 1-inch hole through sludge, we scour the full 360-degree interior pipe wall.",
      },
      {
        title: "Free Video Camera Verification",
        detail: "With our hydro-jetting service, we run an HD sewer camera down the line so you can see on screen that roots and grease are 100% gone.",
      },
    ],
    buildUniqueIntro: (cityName, profile, v) => {
      const intros = [
        `Slow tubs, gurgling toilets, and recurring kitchen sink backups in ${cityName} are rarely fixed for long by a basic hand snake. Because ${cityName} neighborhoods feature ${profile.soilAndTrees}, roots and calcified grease buildup require professional-grade clearing. JJJ Plumbing brings 4,000 PSI hydro-jetting and high-speed descaling directly to ${cityName} homes and businesses.`,
        `If you've paid a big-box rooter company to snake your drain in ${cityName} only for the clog to return weeks later, it's because a standard cable only pokes a narrow hole through soft sludge. In ${cityName} (${profile.regionName}), where ${profile.commonChallenge} are widespread, we restore pipes to 100% original diameter and verify the result on camera.`,
        `From stubborn kitchen grease lines to root-invaded main sewer laterals in ${cityName}, JJJ Plumbing delivers permanent drain restoration. Serving ${cityName} for 25+ years (${siteConfig.license}), our master plumbers pair rotary root cutting and 4,000 PSI @ 18 GPM hydro-jetting with upfront pricing and zero upsell games.`,
      ];
      return intros[v % intros.length];
    },
    buildTechnicalSection: (cityName, profile, v) => ({
      heading: `Hydro-Jetting vs. Basic Snaking for ${cityName} Drains`,
      paragraphs: [
        `Properties in ${cityName}—consisting largely of ${profile.architecture}—often have cast-iron waste branches connected to vitrified clay main sewer laterals. Over decades, ${profile.waterProfile} creates rough rust scale (tuberculation) inside cast iron that snags paper, while ${profile.soilAndTrees} send feeder roots into clay pipe joints.`,
        v % 2 === 0
          ? `Our truck-mounted 4,000 PSI @ 18 GPM hydro-jetter uses rear-thruster and rotary warthog nozzles to slice through dense root masses and emulsify years of hardened kitchen grease. For older ${cityName} homes with delicate cast iron, we also deploy RIDGID FlexShaft chain knockers that polish away rust scale without risking pipe wall damage.`
          : `Every hydro-jetting service in ${cityName} includes a complimentary HD video camera inspection. We show you the live monitor footage of your cleaned pipe and, if we spot an offset joint or break, we use our 512Hz locator wand to mark the exact depth and spot in your yard—so you never pay for guesswork.`,
      ],
    }),
    buildFaqs: (cityName, profile) => [
      {
        question: `What is included in your $249 Hydro-Jetting special in ${cityName}?`,
        answer: `Our $249 residential hydro-jetting special (code HYDRO249) includes high-pressure water jetting through an accessible main cleanout plus a complimentary HD video camera inspection to verify your ${cityName} drain line is completely clear.`,
      },
      {
        question: `Is hydro-jetting safe for older cast-iron or clay pipes in ${cityName}?`,
        answer: `Yes, when performed by a licensed master plumber. We calibrate PSI and nozzle selection to match ${cityName}'s ${profile.architecture}, and use FlexShaft descalers when aging cast iron requires gentle mechanical restoration.`,
      },
      {
        question: `Why do tree roots keep growing back into my ${cityName} sewer drain?`,
        answer: `Because ${cityName} has ${profile.soilAndTrees}, roots enter microscopic gaps in clay pipe mortar joints. A standard snake leaves root tentacles behind; 4,000 PSI hydro-jetting flushes the roots flush to the pipe wall.`,
      },
      {
        question: `How fast can you clear a backed-up main drain in ${cityName}?`,
        answer: `We offer same-day drain and sewer dispatch across ${cityName}. Submit your request online or call ${siteConfig.phone} and we will text you within 5 minutes.`,
      },
    ],
  },

  "water-heaters": {
    id: "water-heaters",
    label: "Water Heater",
    shortLabel: "Water Heater Repair & Tankless",
    heroPhoto: "tankless-exterior-noritz",
    heroPhotoAlt: "Noritz condensing tankless water heater installed by JJJ Plumbing with brass isolation service valves",
    couponCode: "HEAT150",
    couponBadge: "Installation Savings",
    couponOffer: "$150 Off Water Heater Install",
    couponDesc: "Save $150 on any new tankless or high-efficiency tank water heater installation—includes code-compliant seismic strapping.",
    equipmentUsed: [
      "Authorized service & installs for Noritz, Navien, Rinnai, Bradford White & Rheem",
      "Heavy-duty brass tankless isolation & flush valve kits",
      "California-code double seismic earthquake strapping & sediment traps",
      "Thermal expansion tanks, T&P relief lines, and dedicated recirculation pumps",
    ],
    processSteps: [
      {
        title: "Burner, Thermocouple & Heat-Exchanger Diagnostic",
        detail: "We test gas manifold pressure, igniters, flame sensors, and error codes to determine if a simple part swap can save your existing unit.",
      },
      {
        title: "Same-Day Tank or Tankless Replacement",
        detail: "If your tank has ruptured, we haul away the old unit and install a new Bradford White, Rheem, Noritz, or Navien system the same day.",
      },
      {
        title: "Full California Code & Rebate Compliance",
        detail: "Every installation includes seismic strapping, sediment drip legs, proper flue venting, and documentation for available SoCalGas rebates.",
      },
    ],
    buildUniqueIntro: (cityName, profile, v) => {
      const intros = [
        `Waking up to an ice-cold shower or discovering water pooling beneath your garage tank in ${cityName} requires fast, honest diagnostics. Because ${cityName} receives ${profile.waterProfile}, mineral sediment settles at the bottom of tank water heaters and coats tankless heat exchangers—shortening unit lifespans if left unserviced.`,
        `Whether you need an urgent igniter or gas control valve repair, an annual tankless descaling flush, or a same-day Bradford White or Noritz replacement in ${cityName}, JJJ Plumbing delivers master-level workmanship. We serve ${cityName}'s ${profile.architecture} with upfront pricing and zero-interest financing options.`,
        `Homeowners in ${cityName} (${profile.regionName}) trust JJJ Plumbing for same-day water heater repair and high-efficiency tankless upgrades. Backed by 25+ years of experience (${siteConfig.license}), our trucks carry OEM components and commercial-grade units so your family gets hot water back today.`,
      ];
      return intros[v % intros.length];
    },
    buildTechnicalSection: (cityName, profile, v) => ({
      heading: `Tank & Tankless Water Heater Solutions Built for ${cityName} Water Conditions`,
      paragraphs: [
        `Hard water is the #1 killer of water heaters in ${cityName}. As ${profile.waterProfile} heats up, dissolved calcium precipitates into rock-like scale. In traditional 40-, 50-, and 75-gallon tanks, this layer traps heat against the lower steel dome until the glass lining cracks. In tankless systems (Noritz, Navien, Rinnai), scale restricts flow through the copper or stainless-steel heat exchanger and triggers diagnostic shutoff codes.`,
        v % 2 === 0
          ? `When we install a new tank or condensing tankless water heater in ${cityName}, we engineer it to last: sweat-soldered copper connections, full-port brass isolation valves, California-code dual seismic earthquake straps, a code-required gas sediment trap, and pressure-tested T&P discharge piping.`
          : `Upgrading to an ENERGY STAR® condensing tankless unit in ${cityName} not only gives your household endless hot water and frees up valuable floor space, but many models also qualify for utility energy rebates and our flexible 0% APR / Buy Now, Pay Later financing plans.`,
      ],
    }),
    buildFaqs: (cityName, profile) => [
      {
        question: `Can you replace a leaking water heater the same day in ${cityName}?`,
        answer: `Yes. We stock professional-grade Bradford White and Rheem tank water heaters as well as Noritz and Navien tankless systems for same-day installation in ${cityName}, including haul-away of your old tank.`,
      },
      {
        question: `How often should tankless water heaters be flushed in ${cityName}?`,
        answer: `Because ${cityName} has ${profile.waterProfile}, manufacturers like Noritz, Navien, and Rinnai recommend an annual vinegar/descaling flush to keep heat exchangers clean and maintain your warranty.`,
      },
      {
        question: `Do your ${cityName} water heater installations include earthquake strapping?`,
        answer: `Every water heater we install in ${cityName} includes California-code dual seismic strapping, a gas sediment trap, new braided stainless connectors or hard copper, and T&P relief valve verification.`,
      },
      {
        question: `Do you offer financing on tankless water heaters in ${cityName}?`,
        answer: `Yes! You can apply our $150 Off Water Heater coupon (code HEAT150) and take advantage of 0% APR financing or Buy Now, Pay Later monthly payment options.`,
      },
    ],
  },

  "sewer-lines": {
    id: "sewer-lines",
    label: "Sewer Line",
    shortLabel: "Sewer Line Repair & Trenchless",
    heroPhoto: "sewer-cast-iron-wye",
    heroPhotoAlt: "Heavy-duty cast iron and trenchless sewer line installation by JJJ Plumbing",
    couponCode: "FREE-2ND",
    couponBadge: "Free 2nd Opinion",
    couponOffer: "Free 2nd Opinion on Major Jobs",
    couponDesc: "Got an expensive quote from another company for repiping, copper repairs, or sewer work? We'll inspect your system and give an honest written 2nd opinion 100% FREE.",
    equipmentUsed: [
      "Trenchless CIPP (Cured-In-Place Pipe) structural epoxy sewer lining",
      "Pneumatic pipe bursting & SDR-17 HDPE fusion-welded sewer pipe",
      "Self-leveling HD sewer camera with 512Hz electronic depth/spot locator",
      "Heavy-gauge cast iron & ABS schedule-40 piping with seismic shielded couplings",
    ],
    processSteps: [
      {
        title: "HD Camera Inspection & 512Hz Electronic Locating",
        detail: "We record live video of your sewer lateral and pinpoint the exact depth and yard coordinates of any crack, root intrusion, or belly.",
      },
      {
        title: "Free Second Opinion & Transparent Options",
        detail: "Many commission-paid plumbers push full replacements when a targeted spot repair or trenchless liner will solve the issue for thousands less.",
      },
      {
        title: "Trenchless Lining or Precision Excavation",
        detail: "We rehabilitate pipes using CIPP epoxy lining or pipe bursting—preserving your driveway, mature landscaping, and hardscaping.",
      },
    ],
    buildUniqueIntro: (cityName, profile, v) => {
      const intros = [
        `Being told your main sewer line has collapsed or is choked with roots in ${cityName} is stressful—especially if a big-box franchise plumber just quoted you $15,000+ without showing you clear camera footage. JJJ Plumbing provides ${cityName} homeowners with honest master-plumber sewer diagnostics, free second opinions, and no-dig trenchless repair options.`,
        `Across ${cityName}, where properties feature ${profile.architecture} and ${profile.soilAndTrees}, original vitrified clay and cast-iron sewer laterals frequently develop offset joints, root intrusion, and channel rot. Operating from ${profile.dispatchHub}, our licensed crew (${siteConfig.license}) repairs and rehabilitates ${cityName} sewer lines in as little as one day.`,
        `Before you allow anyone to jackhammer your ${cityName} driveway or dig up your front yard, get a free video camera second opinion from JJJ Plumbing. With 25+ years serving ${profile.regionName}, we specialize in trenchless CIPP pipe lining, targeted spot repairs, and code-compliant main line replacements backed by 0% APR financing.`,
      ];
      return intros[v % intros.length];
    },
    buildTechnicalSection: (cityName, profile, v) => ({
      heading: `Trenchless Sewer Repair vs. Traditional Digging in ${cityName}`,
      paragraphs: [
        `In ${cityName}, most homes built prior to 1980 rely on 4-inch or 6-inch vitrified clay sewer pipe (VCP) or cast iron running from the foundation cleanout to the city saddle connection. Over time, ${profile.soilAndTrees} shift pipe sections apart, allowing roots to enter and trap waste. However, a damaged section rarely means you need to trench your entire property.`,
        v % 2 === 0
          ? `With Cured-In-Place Pipe (CIPP) trenchless lining, we hydro-jet and descale your existing ${cityName} sewer pipe, then invert an epoxy-saturated felt liner through a single access point. Once cured, it forms a seamless, joint-free, root-proof "pipe within a pipe" rated for 50+ years—saving you thousands in concrete, tile, and landscaping restoration.`
          : `If a section of pipe in ${cityName} has a severe grade belly or complete collapse, we use our 512Hz sonde locator to mark the exact footprint and perform a surgical spot repair or trenchless pipe-bursting pull using SDR-17 high-density polyethylene (HDPE).`,
      ],
    }),
    buildFaqs: (cityName, profile) => [
      {
        question: `Is your second opinion really 100% free in ${cityName}?`,
        answer: `Yes! If another plumbing company gave you an expensive quote for sewer replacement, copper pipe fixing, slab leak repair, or whole-home repiping in ${cityName}, we will inspect your system and provide an honest master-plumber second opinion at zero cost (code FREE-2ND).`,
      },
      {
        question: `Can you fix my ${cityName} sewer line without digging up my driveway or yard?`,
        answer: `In most cases, yes. Our trenchless CIPP epoxy pipe lining and pipe-bursting methods rehabilitate ${cityName} sewer lines through small access points without destroying driveways, patios, or mature landscaping.`,
      },
      {
        question: `How long does a trenchless sewer repair take in ${cityName}?`,
        answer: `Most residential trenchless sewer liners and spot repairs in ${cityName} are completed in a single day, restoring full sewer service by that evening.`,
      },
      {
        question: `Do you offer financing for sewer line replacements in ${cityName}?`,
        answer: `Yes. We offer 0% APR promotional financing, Buy Now Pay Later options, and low fixed monthly payments starting at $79/mo for qualifying sewer repairs in ${cityName}.`,
      },
    ],
  },

  "commercial": {
    id: "commercial",
    label: "Commercial Plumber",
    shortLabel: "Commercial Plumbing",
    heroPhoto: "commercial-mechanical-room",
    heroPhotoAlt: "Commercial water heating manifold, recirculation pump, and copper piping installed by JJJ Plumbing",
    couponCode: "JJJ-75OFF",
    couponBadge: "Commercial Priority Dispatch",
    couponOffer: "$75 Off Commercial Service",
    couponDesc: "Priority same-day dispatch for restaurants, HOAs, retail, medical facilities, and multi-unit properties.",
    equipmentUsed: [
      "4,000 PSI @ 18 GPM truck-mounted commercial grease-line hydro-jetter",
      "Commercial manifold water heaters, mixing valves & recirculation pumps",
      "Certified backflow prevention assemblies & PRV stations",
      "Heavy-gauge cast iron, schedule-40/80 PVC, and Type-L brazed/sweated copper",
    ],
    processSteps: [
      {
        title: "Priority Commercial Dispatch & Minimal Downtime",
        detail: "We coordinate directly with property managers, restaurant owners, and facility directors to work around peak business hours.",
      },
      {
        title: "Code-Compliant Diagnostics & Preventive Maintenance",
        detail: "From health-department grease trap compliance to multi-story domestic hot-water recirculation, we keep your building up to municipal code.",
      },
      {
        title: "Clear Documentation, W-9 / COI & Upfront Billing",
        detail: "We provide full before/after camera documentation, itemized scopes of work, and certificate of insurance (COI) for HOAs and commercial accounts.",
      },
    ],
    buildUniqueIntro: (cityName, profile, v) => {
      const intros = [
        `For restaurants, HOA boards, medical offices, retail centers, and multi-unit apartment buildings in ${cityName}, a plumbing failure means lost revenue, tenant complaints, or health-code shutdowns. JJJ Plumbing Inc (${siteConfig.license}) is a licensed, insured commercial plumbing partner serving ${cityName} businesses with priority same-day dispatch.`,
        `Commercial properties in ${cityName} (${profile.regionName}) demand heavy-duty equipment that residential handymen simply don't carry. From our 4,000 PSI @ 18 GPM truck-mounted hydro-jetter for main grease lines to commercial boiler/water-heater manifolds and hospital-grade cast-iron waste replacements, we keep ${cityName} facilities operating without interruption.`,
        `Property managers and business owners across ${cityName} rely on JJJ Plumbing for predictable upfront pricing, rapid emergency response, and preventative maintenance contracts. With 25+ years of commercial experience, we handle everything from grease interceptor clearing to multi-tenant repiping.`,
      ];
      return intros[v % intros.length];
    },
    buildTechnicalSection: (cityName, profile, v) => ({
      heading: `Full-Scope Commercial & HOA Plumbing Capabilities in ${cityName}`,
      paragraphs: [
        `Commercial buildings and HOAs in ${cityName} face intense daily usage combined with ${profile.waterProfile}. In food-service and retail properties, Fats, Oils, and Grease (FOG) solidify inside horizontal waste lines, requiring scheduled 4,000 PSI hydro-jetting and grease trap maintenance to prevent floor-sink backups during peak hours.`,
        v % 2 === 0
          ? `For multi-family apartments, hotels, and medical facilities in ${cityName}, we engineer and service high-recovery commercial water heaters, thermostatic mixing valves, and continuous hot-water recirculation loops—eliminating tenant wait times while cutting natural gas waste.`
          : `We work seamlessly with ${cityName} property management companies and HOA boards: providing W-9s, Certificates of Insurance (COI), detailed technician notes with photo/video proof, and clear flat-rate proposals before any work begins.`,
      ],
    }),
    buildFaqs: (cityName, profile) => [
      {
        question: `Do you offer scheduled preventive maintenance for restaurants and HOAs in ${cityName}?`,
        answer: `Yes. We design custom quarterly and semi-annual hydro-jetting, grease trap, and water heater maintenance programs for ${cityName} restaurants, HOAs, and multi-unit properties to prevent costly emergency shutdowns.`,
      },
      {
        question: `Can you provide a Certificate of Insurance (COI) and W-9 for ${cityName} commercial properties?`,
        answer: `Absolutely. JJJ Plumbing Inc (${siteConfig.license}) is fully licensed and insured for commercial and multi-family work across ${cityName} and can issue COI documentation promptly for your property management company.`,
      },
      {
        question: `How fast can you respond to a commercial main line backup in ${cityName}?`,
        answer: `Commercial emergencies receive priority same-day dispatch from ${profile.dispatchHub}. Call ${siteConfig.phone} or submit our form for a 5-minute dispatch text confirmation.`,
      },
      {
        question: `Do you service commercial water heaters and recirculation pumps in ${cityName}?`,
        answer: `Yes—we repair, descale, and replace commercial tank and rack-mounted tankless water heaters, storage tanks, thermostatic mixing valves, and recirculation pumps throughout ${cityName}.`,
      },
    ],
  },
};
