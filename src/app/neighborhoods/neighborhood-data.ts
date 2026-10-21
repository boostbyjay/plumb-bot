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
    "slug": "san-gabriel",
    "name": "San Gabriel",
    "city": "San Gabriel",
    "region": "San Gabriel Valley",
    "focus": "Master plumbing, hydro jetting & water heaters",
    "description": "San Gabriel residents receive rapid same-day response for 4,000 PSI hydro jetting, tankless water heater upgrades, and non-invasive camera diagnostics from our licensed master plumbers.",
    "geo": {
      "lat": 34.0961,
      "lng": -118.1058
    }
  },
  {
    "slug": "alhambra",
    "name": "Alhambra",
    "city": "Alhambra",
    "region": "San Gabriel Valley",
    "focus": "Emergency plumbing, drain cleaning & sewer line repair",
    "description": "From historic Craftsman homes along Main Street to modern multi-family residences, JJJ Plumbing provides fast drain clearing, copper repiping, and licensed emergency plumbing in Alhambra.",
    "geo": {
      "lat": 34.0953,
      "lng": -118.127
    }
  },
  {
    "slug": "pasadena",
    "name": "Pasadena",
    "city": "Pasadena",
    "region": "San Gabriel Valley",
    "focus": "Historic home repiping, tankless water heaters & sewer lining",
    "description": "Pasadena's historic architecture requires delicate, code-compliant plumbing care. We specialize in non-invasive copper and PEX repiping, tankless upgrades, and trenchless sewer repair across Pasadena.",
    "geo": {
      "lat": 34.1478,
      "lng": -118.1445
    }
  },
  {
    "slug": "south-pasadena",
    "name": "South Pasadena",
    "city": "South Pasadena",
    "region": "San Gabriel Valley",
    "focus": "Copper repiping, slab leak repair & drain snaking",
    "description": "South Pasadena tree-lined avenues often experience aggressive root intrusion and aging galvanized pipe leaks. We deliver lasting trenchless sewer repairs and precision slab leak detection.",
    "geo": {
      "lat": 34.1161,
      "lng": -118.1503
    }
  },
  {
    "slug": "arcadia",
    "name": "Arcadia",
    "city": "Arcadia",
    "region": "San Gabriel Valley",
    "focus": "Luxury plumbing fixtures, tankless conversions & sewer repairs",
    "description": "Serving Arcadia estates and residential communities with premium plumbing services, high-efficiency Navien tankless water heaters, whole-home water filtration, and emergency drain clearing.",
    "geo": {
      "lat": 34.1397,
      "lng": -118.0353
    }
  },
  {
    "slug": "san-marino",
    "name": "San Marino",
    "city": "San Marino",
    "region": "San Gabriel Valley",
    "focus": "Estate plumbing, whole-home repiping & water filtration",
    "description": "San Marino properties demand white-glove plumbing craftsmanship and meticulous care. Our master technicians provide non-destructive leak detection, whole-house repiping, and fixture upgrades.",
    "geo": {
      "lat": 34.1214,
      "lng": -118.1065
    }
  },
  {
    "slug": "monterey-park",
    "name": "Monterey Park",
    "city": "Monterey Park",
    "region": "San Gabriel Valley",
    "focus": "Hydro jetting, commercial grease traps & rooter service",
    "description": "From bustling Atlantic Boulevard restaurants to residential hillside neighborhoods, we provide heavy-duty 4,000 PSI hydro jetting, grease interceptor maintenance, and same-day emergency repairs.",
    "geo": {
      "lat": 34.0625,
      "lng": -118.1228
    }
  },
  {
    "slug": "temple-city",
    "name": "Temple City",
    "city": "Temple City",
    "region": "San Gabriel Valley",
    "focus": "Slab leak detection, water heaters & emergency drain clearing",
    "description": "Temple City homeowners count on JJJ Plumbing for prompt water heater replacements, electronic slab leak detection, and clear, upfront flat-rate pricing on all plumbing repairs.",
    "geo": {
      "lat": 34.1072,
      "lng": -118.0578
    }
  },
  {
    "slug": "rosemead",
    "name": "Rosemead",
    "city": "Rosemead",
    "region": "San Gabriel Valley",
    "focus": "Fast emergency drain clearing, water heater repairs & gas line fixes",
    "description": "Minutes from our dispatch depot, Rosemead residents receive rapid 45-minute emergency plumbing service for severe clogs, gas leaks, water line ruptures, and water heater breakdowns.",
    "geo": {
      "lat": 34.0806,
      "lng": -118.0728
    }
  },
  {
    "slug": "el-monte",
    "name": "El Monte",
    "city": "El Monte",
    "region": "San Gabriel Valley",
    "focus": "Same-day plumbing repairs, sewer line hydro jetting & water heaters",
    "description": "JJJ Plumbing delivers honest, high-quality plumbing to El Monte homeowners and commercial facilities, offering sewer descaling, emergency drain clearing, and complete fixture replacements.",
    "geo": {
      "lat": 34.0686,
      "lng": -118.0276
    }
  },
  {
    "slug": "south-el-monte",
    "name": "South El Monte",
    "city": "South El Monte",
    "region": "San Gabriel Valley",
    "focus": "Commercial and residential emergency drain and pipe repairs",
    "description": "Providing heavy-duty commercial plumbing, industrial pipe maintenance, and residential emergency repairs across South El Monte with fully stocked service trucks and licensed plumbers.",
    "geo": {
      "lat": 34.0492,
      "lng": -118.0506
    }
  },
  {
    "slug": "west-covina",
    "name": "West Covina",
    "city": "West Covina",
    "region": "San Gabriel Valley",
    "focus": "Tankless water heater upgrades, main line root clearing & slab leaks",
    "description": "West Covina homeowners rely on our team for fast water heater replacements, trenchless sewer repairs, and professional drain clearing backed by our 100% satisfaction guarantee.",
    "geo": {
      "lat": 34.0686,
      "lng": -117.939
    }
  },
  {
    "slug": "covina",
    "name": "Covina",
    "city": "Covina",
    "region": "San Gabriel Valley",
    "focus": "Emergency rooter service, sewer replacements & water heater flush",
    "description": "Covina homes benefit from our comprehensive plumbing services, including main drain hydro jetting, copper water pipe repairs, and fast response times for unexpected plumbing emergencies.",
    "geo": {
      "lat": 34.09,
      "lng": -117.8903
    }
  },
  {
    "slug": "glendora",
    "name": "Glendora",
    "city": "Glendora",
    "region": "San Gabriel Valley",
    "focus": "Foothill home repiping, gas leak detection & cleanout installs",
    "description": "In the Pride of the Foothills, JJJ Plumbing solves high water pressure issues, aging cast iron sewer problems, and water heater failures with durable, code-compliant workmanship.",
    "geo": {
      "lat": 34.1361,
      "lng": -117.8653
    }
  },
  {
    "slug": "azusa",
    "name": "Azusa",
    "city": "Azusa",
    "region": "San Gabriel Valley",
    "focus": "Hydro jetting drain lines, water pressure regulators & emergency fixes",
    "description": "Azusa properties near the canyon frequently encounter high municipal water pressure and hard mineral scale. We install top-grade pressure regulators and descale sewer lines quickly.",
    "geo": {
      "lat": 34.1336,
      "lng": -117.9076
    }
  },
  {
    "slug": "duarte",
    "name": "Duarte",
    "city": "Duarte",
    "region": "San Gabriel Valley",
    "focus": "Main sewer line repairs, trenchless pipe bursting & drain unclogging",
    "description": "Duarte homeowners trust our experienced plumbers for no-dig trenchless sewer line repairs, emergency rooter services, and clean, courteous residential plumbing care.",
    "geo": {
      "lat": 34.1394,
      "lng": -117.9773
    }
  },
  {
    "slug": "monrovia",
    "name": "Monrovia",
    "city": "Monrovia",
    "region": "San Gabriel Valley",
    "focus": "Craftsman home pipe restoration, copper repiping & root clearing",
    "description": "Monrovia's historic neighborhoods feature classic bungalows with vintage plumbing. We update old water and sewer lines with modern copper and Uponor PEX without destroying architectural character.",
    "geo": {
      "lat": 34.1442,
      "lng": -118.0019
    }
  },
  {
    "slug": "baldwin-park",
    "name": "Baldwin Park",
    "city": "Baldwin Park",
    "region": "San Gabriel Valley",
    "focus": "Emergency plumbing dispatch, water heater replacements & main cleanouts",
    "description": "Offering 24/7 emergency dispatch to Baldwin Park for stubborn toilet back-ups, ruptured water supply lines, water heater leaks, and outdoor cleanout installations.",
    "geo": {
      "lat": 34.0853,
      "lng": -117.9609
    }
  },
  {
    "slug": "whittier",
    "name": "Whittier",
    "city": "Whittier",
    "region": "San Gabriel Valley",
    "focus": "Historic district plumbing repairs, slab leak detection & water heaters",
    "description": "Whittier's historic Uptown and sprawling residential hills require specialized leak detection and sewer line camera inspections. We protect your property with non-invasive diagnostics.",
    "geo": {
      "lat": 33.9792,
      "lng": -118.0328
    }
  },
  {
    "slug": "montebello",
    "name": "Montebello",
    "city": "Montebello",
    "region": "San Gabriel Valley",
    "focus": "Residential drain cleaning, commercial backflow prevention & leak repair",
    "description": "From residential repairs near Beverly Boulevard to commercial backflow testing, JJJ Plumbing keeps Montebello water systems safe, efficient, and running cleanly.",
    "geo": {
      "lat": 34.0165,
      "lng": -118.1137
    }
  },
  {
    "slug": "pico-rivera",
    "name": "Pico Rivera",
    "city": "Pico Rivera",
    "region": "San Gabriel Valley",
    "focus": "Hydro jetting heavy grease, toilet overflows & hot water repairs",
    "description": "Fast, reliable plumbing service in Pico Rivera. We quickly resolve drain clogs, replace rusted water heaters, and repair slab leaks before extensive water damage occurs.",
    "geo": {
      "lat": 33.9831,
      "lng": -118.0967
    }
  },
  {
    "slug": "la-canada-flintridge",
    "name": "La Cañada Flintridge",
    "city": "La Cañada Flintridge",
    "region": "San Gabriel Valley",
    "focus": "Hillside estate plumbing, pressure regulators & whole-house repiping",
    "description": "La Cañada Flintridge hillside homes demand specialized pressure mitigation and earthquake shut-off valves. We provide expert repiping, water heater service, and precision sewer diagnostics.",
    "geo": {
      "lat": 34.2068,
      "lng": -118.2
    }
  },
  {
    "slug": "los-angeles",
    "name": "Los Angeles",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Emergency plumbing, commercial & residential repairs",
    "description": "Comprehensive plumbing services across Greater Los Angeles. Our master technicians handle high-rise commercial plumbing, emergency main leaks, sewer restorations, and residential upgrades.",
    "geo": {
      "lat": 34.0522,
      "lng": -118.2437
    }
  },
  {
    "slug": "silver-lake",
    "name": "Silver Lake",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Emergency plumbing, slab leaks",
    "description": "Silver Lake's hillside homes and aging plumbing systems need experienced technicians. From slab leaks to emergency repiping, JJJ Plumbing handles the unique challenges of Silver Lake properties.",
    "geo": {
      "lat": 34.087,
      "lng": -118.27
    }
  },
  {
    "slug": "echo-park",
    "name": "Echo Park",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Drain cleaning, hydro jetting",
    "description": "Echo Park's historic bungalows and mature tree systems create unique drain and sewer challenges. Our hydro jetting and camera inspection services keep Echo Park homes flowing smoothly.",
    "geo": {
      "lat": 34.078,
      "lng": -118.26
    }
  },
  {
    "slug": "highland-park",
    "name": "Highland Park",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Water heaters, repiping",
    "description": "Highland Park's century-old homes often need full repiping and water heater upgrades. JJJ Plumbing specializes in bringing historic LA plumbing up to code without disrupting your home.",
    "geo": {
      "lat": 34.111,
      "lng": -118.196
    }
  },
  {
    "slug": "eagle-rock",
    "name": "Eagle Rock",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Sewer line repair, emergency",
    "description": "Eagle Rock properties deal with clay sewer lines and tree root intrusion. Our trenchless repair and CIPP lining solutions fix sewer lines without tearing up your yard.",
    "geo": {
      "lat": 34.139,
      "lng": -118.215
    }
  },
  {
    "slug": "los-feliz",
    "name": "Los Feliz",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Drain cleaning, garbage disposal",
    "description": "Los Feliz's mix of vintage apartments and luxury homes demands versatile plumbing expertise. From garbage disposal repairs to full drain cleaning, we handle it all.",
    "geo": {
      "lat": 34.104,
      "lng": -118.286
    }
  },
  {
    "slug": "beverly-hills",
    "name": "Beverly Hills",
    "city": "Beverly Hills",
    "region": "Los Angeles",
    "focus": "High-end water heaters, commercial",
    "description": "Beverly Hills properties require premium service and discretion. JJJ Plumbing delivers tankless water heater installations, smart home plumbing integration, and commercial plumbing for local businesses.",
    "geo": {
      "lat": 34.073,
      "lng": -118.4
    }
  },
  {
    "slug": "brentwood",
    "name": "Brentwood",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Slab leak repair, water heaters",
    "description": "Brentwood's slab foundations and hard water demand expert slab leak detection and water heater maintenance. Our non-invasive slab leak repair saves your floors and your budget.",
    "geo": {
      "lat": 34.052,
      "lng": -118.463
    }
  },
  {
    "slug": "pacific-palisades",
    "name": "Pacific Palisades",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Emergency repairs, sewer lines",
    "description": "Pacific Palisades hillside homes face unique plumbing challenges — from earthquake-related pipe damage to sewer lines on steep slopes. Our same-day emergency dispatch team is ready to help.",
    "geo": {
      "lat": 34.047,
      "lng": -118.528
    }
  },
  {
    "slug": "santa-monica",
    "name": "Santa Monica",
    "city": "Santa Monica",
    "region": "Los Angeles",
    "focus": "Drain cleaning, hydro jetting",
    "description": "Santa Monica's coastal properties deal with salt-air corrosion and older plumbing infrastructure. Our hydro jetting and camera inspection services keep drains clear and pipes healthy.",
    "geo": {
      "lat": 34.019,
      "lng": -118.491
    }
  },
  {
    "slug": "west-hollywood",
    "name": "West Hollywood",
    "city": "West Hollywood",
    "region": "Los Angeles",
    "focus": "Emergency plumbing, drain cleaning",
    "description": "West Hollywood's dense urban landscape means plumbing emergencies happen fast. Our same-day dispatch and emergency repair services get you back up and running quickly.",
    "geo": {
      "lat": 34.09,
      "lng": -118.361
    }
  },
  {
    "slug": "bel-air",
    "name": "Bel Air",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Luxury plumbing systems, recirculating hot water pumps & smart shutoffs",
    "description": "Providing discrete, high-specification plumbing maintenance, smart Moen Flo water shutoff installations, and custom recirculation systems for Bel Air luxury estates.",
    "geo": {
      "lat": 34.0837,
      "lng": -118.4468
    }
  },
  {
    "slug": "culver-city",
    "name": "Culver City",
    "city": "Culver City",
    "region": "Los Angeles",
    "focus": "Studio zone commercial plumbing, residential drain cleaning & tankless",
    "description": "Culver City businesses and homeowners trust JJJ Plumbing for rapid commercial plumbing solutions, tankless conversions, and thorough sewer pipe descaling.",
    "geo": {
      "lat": 34.0211,
      "lng": -118.3965
    }
  },
  {
    "slug": "east-los-angeles",
    "name": "East Los Angeles",
    "city": "East Los Angeles",
    "region": "Los Angeles",
    "focus": "Emergency rooter service, pipe repair & tankless water heater flush",
    "description": "Serving East Los Angeles families with honest pricing, Spanish-speaking master plumbers, emergency drain clearing, and fast water heater replacements.",
    "geo": {
      "lat": 34.0224,
      "lng": -118.167
    }
  },
  {
    "slug": "boyle-heights",
    "name": "Boyle Heights",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Older home plumbing restoration, cast iron descaling & gas line repair",
    "description": "Boyle Heights vintage multi-unit buildings and bungalows get expert cast iron pipe descaling, gas line safety repairs, and reliable drain cleaning from our neighborhood technicians.",
    "geo": {
      "lat": 34.0384,
      "lng": -118.2104
    }
  },
  {
    "slug": "lincoln-heights",
    "name": "Lincoln Heights",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Emergency sewer unclogging, water line repairs & fixture installs",
    "description": "One of LA's oldest neighborhoods, Lincoln Heights homes often suffer from degraded galvanized water lines. We install modern PEX-a repipes and clear stubborn main sewer clogs.",
    "geo": {
      "lat": 34.0739,
      "lng": -118.2131
    }
  },
  {
    "slug": "el-sereno",
    "name": "El Sereno",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Hillside drainage, root-choked sewer lines & water heater replacements",
    "description": "Bordering our San Gabriel Valley hub, El Sereno receives ultra-fast dispatch for hillside sewer backups, slab leak repairs, and gas water heater installations.",
    "geo": {
      "lat": 34.0736,
      "lng": -118.1751
    }
  },
  {
    "slug": "glassell-park",
    "name": "Glassell Park",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Trenchless sewer lining, slab leaks & emergency hydro jetting",
    "description": "Glassell Park hillside properties benefit from our trenchless CIPP sewer lining, 4,000 PSI hydro jetting equipment, and electronic slab leak pinpointing.",
    "geo": {
      "lat": 34.1106,
      "lng": -118.2323
    }
  },
  {
    "slug": "mount-washington",
    "name": "Mount Washington",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Steep hillside plumbing lines, high water pressure mitigation & PRVs",
    "description": "Mount Washington's winding elevations require specialized pressure-reducing valves (PRVs) and rooter care for tree-surrounded sewer laterals. We protect your plumbing system from blowouts.",
    "geo": {
      "lat": 34.097,
      "lng": -118.2187
    }
  },
  {
    "slug": "atwater-village",
    "name": "Atwater Village",
    "city": "Los Angeles",
    "region": "Los Angeles",
    "focus": "Tree root sewer intrusion, vintage fixture repair & copper repiping",
    "description": "Atwater Village homeowners rely on JJJ Plumbing for delicate vintage plumbing repairs, main line tree root cutting, and whole-home copper or PEX repiping.",
    "geo": {
      "lat": 34.1164,
      "lng": -118.2562
    }
  },
  {
    "slug": "sherman-oaks",
    "name": "Sherman Oaks",
    "city": "Los Angeles",
    "region": "San Fernando Valley",
    "focus": "Water heaters, sewer lines",
    "description": "Sherman Oaks homeowners trust JJJ Plumbing for water heater repairs and sewer line services. Our licensed technicians handle everything from maintenance to full replacements.",
    "geo": {
      "lat": 34.151,
      "lng": -118.449
    }
  },
  {
    "slug": "studio-city",
    "name": "Studio City",
    "city": "Los Angeles",
    "region": "San Fernando Valley",
    "focus": "Emergency repairs, drain cleaning",
    "description": "Studio City's mix of hillside estates and valley homes needs versatile plumbing expertise. From emergency burst pipe repairs to routine drain cleaning, we're your local plumbing partner.",
    "geo": {
      "lat": 34.149,
      "lng": -118.395
    }
  },
  {
    "slug": "encino",
    "name": "Encino",
    "city": "Los Angeles",
    "region": "San Fernando Valley",
    "focus": "Sewer lines, water heaters",
    "description": "Encino properties often deal with aging sewer lines and water heater issues. Our trenchless repair technology and expert water heater service keep Encino homes running smoothly.",
    "geo": {
      "lat": 34.159,
      "lng": -118.501
    }
  },
  {
    "slug": "burbank",
    "name": "Burbank",
    "city": "Burbank",
    "region": "San Fernando Valley",
    "focus": "Studio zone commercial plumbing, emergency drain fixes & tankless units",
    "description": "Burbank studios, commercial buildings, and single-family homes trust JJJ Plumbing for high-pressure hydro jetting, tankless water heater retrofits, and code-compliant plumbing upgrades.",
    "geo": {
      "lat": 34.1808,
      "lng": -118.309
    }
  },
  {
    "slug": "glendale",
    "name": "Glendale",
    "city": "Glendale",
    "region": "San Fernando Valley",
    "focus": "Hillside water pressure regulators, hydro jetting & sewer camera checks",
    "description": "Glendale properties from the Verdugo Mountains to downtown rely on JJJ Plumbing for water pressure regulators, HD video sewer inspections, and fast emergency plumbing response.",
    "geo": {
      "lat": 34.1425,
      "lng": -118.2551
    }
  },
  {
    "slug": "woodland-hills",
    "name": "Woodland Hills",
    "city": "Los Angeles",
    "region": "San Fernando Valley",
    "focus": "High-heat water heater maintenance, slab leak detection & main rooter",
    "description": "Woodland Hills extreme valley temperatures strain water heaters and underground pipes. We provide prompt tankless replacements, slab leak pinpointing, and sewer repairs.",
    "geo": {
      "lat": 34.1684,
      "lng": -118.6059
    }
  },
  {
    "slug": "anaheim",
    "name": "Anaheim",
    "city": "Anaheim",
    "region": "Orange County",
    "focus": "Emergency commercial plumbing, residential drain unclogging & repipe",
    "description": "Anaheim homeowners and commercial facilities count on JJJ Plumbing for same-day drain snaking, hydro jetting, tankless water heater installations, and comprehensive sewer line repairs.",
    "geo": {
      "lat": 33.8366,
      "lng": -117.9143
    }
  },
  {
    "slug": "irvine",
    "name": "Irvine",
    "city": "Irvine",
    "region": "Orange County",
    "focus": "HOA-approved slab leak repair, water softener installs & tankless",
    "description": "Irvine master-planned communities demand meticulous, HOA-compliant plumbing service. We specialize in epoxy pipe restorations, slab leak re-routes, and high-efficiency water heaters.",
    "geo": {
      "lat": 33.6846,
      "lng": -117.8265
    }
  },
  {
    "slug": "orange",
    "name": "Orange",
    "city": "Orange",
    "region": "Orange County",
    "focus": "Old Towne historic plumbing, cast iron restoration & sewer lining",
    "description": "From Old Towne Orange vintage residences to modern developments, we deliver trenchless sewer lining, copper repiping, and licensed emergency plumbing you can rely on.",
    "geo": {
      "lat": 33.7879,
      "lng": -117.8531
    }
  },
  {
    "slug": "fullerton",
    "name": "Fullerton",
    "city": "Fullerton",
    "region": "Orange County",
    "focus": "Hard water mitigation, tankless water heater flushing & drain repairs",
    "description": "Fullerton's mineral-rich water requires expert water conditioning and regular water heater flushing. We protect your fixtures and pipes from premature failure and stubborn clogs.",
    "geo": {
      "lat": 33.8704,
      "lng": -117.9242
    }
  },
  {
    "slug": "huntington-beach",
    "name": "Huntington Beach",
    "city": "Huntington Beach",
    "region": "Orange County",
    "focus": "Coastal salt air corrosion repair, hydro jetting & PEX repiping",
    "description": "In Surf City, marine air accelerates pipe corrosion. JJJ Plumbing provides corrosion-resistant Uponor PEX repiping, hydro-jetting for sand and grease, and fast emergency repairs.",
    "geo": {
      "lat": 33.6595,
      "lng": -117.9988
    }
  },
  {
    "slug": "costa-mesa",
    "name": "Costa Mesa",
    "city": "Costa Mesa",
    "region": "Orange County",
    "focus": "Restaurant grease interceptors, residential rooter & fixture upgrades",
    "description": "Serving Costa Mesa's thriving culinary scene and coastal neighborhoods with certified backflow testing, commercial grease trap cleaning, and residential plumbing maintenance.",
    "geo": {
      "lat": 33.6411,
      "lng": -117.9187
    }
  },
  {
    "slug": "garden-grove",
    "name": "Garden Grove",
    "city": "Garden Grove",
    "region": "Orange County",
    "focus": "Sewer cleanout installation, emergency leak stoppage & water heaters",
    "description": "Garden Grove homes get honest upfront pricing and fast dispatch for main line sewer backups, toilet replacements, water heater installations, and leak repairs.",
    "geo": {
      "lat": 33.7743,
      "lng": -117.9379
    }
  },
  {
    "slug": "santa-ana",
    "name": "Santa Ana",
    "city": "Santa Ana",
    "region": "Orange County",
    "focus": "Same-day emergency rooter, copper repiping & gas leak repairs",
    "description": "As the historic heart of Orange County, Santa Ana properties receive rapid emergency rooter services, Spanish-bilingual support, and durable whole-house copper repiping.",
    "geo": {
      "lat": 33.7455,
      "lng": -117.8677
    }
  },
  {
    "slug": "newport-beach",
    "name": "Newport Beach",
    "city": "Newport Beach",
    "region": "Orange County",
    "focus": "Luxury waterfront home plumbing, tankless water heaters & smart valves",
    "description": "Delivering luxury plumbing solutions for Newport Beach estates, including smart leak shutoff systems, high-capacity tankless water heaters, and whole-house filtration.",
    "geo": {
      "lat": 33.6189,
      "lng": -117.9298
    }
  },
  {
    "slug": "laguna-beach",
    "name": "Laguna Beach",
    "city": "Laguna Beach",
    "region": "Orange County",
    "focus": "Hillside drainage systems, salt-resistant copper & emergency plumbing",
    "description": "Laguna Beach coastal topography requires master-level plumbing expertise. We install advanced drainage, trenchless sewer repairs, and corrosion-resistant piping along the coast.",
    "geo": {
      "lat": 33.5427,
      "lng": -117.7854
    }
  },
  {
    "slug": "torrance",
    "name": "Torrance",
    "city": "Torrance",
    "region": "South Bay & Gateway Cities",
    "focus": "Commercial plumbing, drain cleaning",
    "description": "Torrance businesses and homeowners rely on JJJ Plumbing for commercial grease trap service, backflow testing, and residential drain cleaning. Serving SoCal since 2001.",
    "geo": {
      "lat": 33.836,
      "lng": -118.341
    }
  },
  {
    "slug": "long-beach",
    "name": "Long Beach",
    "city": "Long Beach",
    "region": "South Bay & Gateway Cities",
    "focus": "Emergency plumbing, water heaters",
    "description": "Long Beach's coastal properties face unique plumbing challenges — from salt corrosion to aging infrastructure. Our emergency repair team and water heater experts are ready to help.",
    "geo": {
      "lat": 33.77,
      "lng": -118.194
    }
  },
  {
    "slug": "downey",
    "name": "Downey",
    "city": "Downey",
    "region": "South Bay & Gateway Cities",
    "focus": "Emergency rooter service, sewer camera inspection & water heater repair",
    "description": "Downey homeowners count on JJJ Plumbing for fast emergency rooter service, video camera sewer diagnostics, and energy-efficient water heater installations.",
    "geo": {
      "lat": 33.9401,
      "lng": -118.1332
    }
  },
  {
    "slug": "norwalk",
    "name": "Norwalk",
    "city": "Norwalk",
    "region": "South Bay & Gateway Cities",
    "focus": "Slab leak repair, main sewer clearing & pressure regulator valves",
    "description": "Norwalk families receive rapid assistance for burst underground pipes, slab leaks, high municipal water pressure, and recurring main sewer blockages.",
    "geo": {
      "lat": 33.9022,
      "lng": -118.0817
    }
  },
  {
    "slug": "cerritos",
    "name": "Cerritos",
    "city": "Cerritos",
    "region": "South Bay & Gateway Cities",
    "focus": "Hydro jetting, tankless conversions & residential plumbing repairs",
    "description": "Cerritos residential communities benefit from our clean, reliable plumbing service, featuring Navien tankless water heaters, hydro jetting, and fixture replacements.",
    "geo": {
      "lat": 33.8583,
      "lng": -118.0648
    }
  },
  {
    "slug": "lakewood",
    "name": "Lakewood",
    "city": "Lakewood",
    "region": "South Bay & Gateway Cities",
    "focus": "Mid-century home repiping, drain snaking & garbage disposal repair",
    "description": "Lakewood mid-century homes often have original galvanized pipes approaching the end of their lifespan. We provide clean, minimally invasive PEX-a repiping and drain clearing.",
    "geo": {
      "lat": 33.8536,
      "lng": -118.1339
    }
  },
  {
    "slug": "manhattan-beach",
    "name": "Manhattan Beach",
    "city": "Manhattan Beach",
    "region": "South Bay & Gateway Cities",
    "focus": "High-end tankless water heaters, coastal repiping & smart plumbing",
    "description": "Manhattan Beach custom coastal homes trust JJJ Plumbing for high-performance tankless water heaters, whole-home water conditioning, and discreet, premium service.",
    "geo": {
      "lat": 33.8847,
      "lng": -118.4109
    }
  },
  {
    "slug": "redondo-beach",
    "name": "Redondo Beach",
    "city": "Redondo Beach",
    "region": "South Bay & Gateway Cities",
    "focus": "Sewer lateral lining, water heater installs & emergency leak repair",
    "description": "Redondo Beach properties face tough root intrusion and salt corrosion. We fix damaged sewer lines with no-dig trenchless lining and restore hot water quickly.",
    "geo": {
      "lat": 33.8492,
      "lng": -118.3884
    }
  },
  {
    "slug": "el-segundo",
    "name": "El Segundo",
    "city": "El Segundo",
    "region": "South Bay & Gateway Cities",
    "focus": "Commercial aerospace zone plumbing, residential drain cleaning",
    "description": "Providing commercial pipe installations, backflow certifications, and residential plumbing emergency services throughout El Segundo and the coastal corridor.",
    "geo": {
      "lat": 33.9192,
      "lng": -118.4165
    }
  },
  {
    "slug": "palos-verdes",
    "name": "Palos Verdes",
    "city": "Palos Verdes",
    "region": "South Bay & Gateway Cities",
    "focus": "Estate plumbing maintenance, hillside sewer systems & copper repipe",
    "description": "Serving Palos Verdes estates with specialized hillside drainage solutions, copper repiping, high-pressure regulator installs, and emergency plumbing care.",
    "geo": {
      "lat": 33.8006,
      "lng": -118.39
    }
  },
  {
    "slug": "rancho-palos-verdes",
    "name": "Rancho Palos Verdes",
    "city": "Rancho Palos Verdes",
    "region": "South Bay & Gateway Cities",
    "focus": "Geological movement pipe inspection, slab leaks & tankless systems",
    "description": "Rancho Palos Verdes properties encounter unique geological soil shifts that affect underground plumbing. Our camera inspections and slab leak re-routes safeguard your home.",
    "geo": {
      "lat": 33.7444,
      "lng": -118.387
    }
  },
  {
    "slug": "rolling-hills",
    "name": "Rolling Hills",
    "city": "Rolling Hills",
    "region": "South Bay & Gateway Cities",
    "focus": "Private estate plumbing, septic-to-sewer connections & high pressure PRVs",
    "description": "Exclusive plumbing services for Rolling Hills equestrian estates, providing discreet master plumber repairs, water treatment systems, and mainline upgrades.",
    "geo": {
      "lat": 33.7592,
      "lng": -118.3587
    }
  },
  {
    "slug": "bell",
    "name": "Bell",
    "city": "Bell",
    "region": "South Bay & Gateway Cities",
    "focus": "Emergency drain unclogging, water heater repair & leak pinpointing",
    "description": "Fast, dependable emergency plumbing in Bell. We arrive with fully stocked trucks to unblock main lines, fix burst pipes, and replace faulty water heaters.",
    "geo": {
      "lat": 33.9775,
      "lng": -118.187
    }
  },
  {
    "slug": "commerce",
    "name": "Commerce",
    "city": "Commerce",
    "region": "South Bay & Gateway Cities",
    "focus": "Commercial and industrial plumbing, high-capacity drain clearing",
    "description": "Supporting Commerce commercial centers, warehouses, and homes with high-capacity hydro jetting, grease interceptor service, and 24/7 emergency pipe repair.",
    "geo": {
      "lat": 34.0006,
      "lng": -118.1598
    }
  },
  {
    "slug": "huntington-park",
    "name": "Huntington Park",
    "city": "Huntington Park",
    "region": "South Bay & Gateway Cities",
    "focus": "Fast emergency drain clearing, sewer repairs & gas leak fixes",
    "description": "Providing Huntington Park residents with affordable, honest plumbing services, bilingual emergency dispatch, water heater repair, and rooter solutions.",
    "geo": {
      "lat": 33.9847,
      "lng": -118.2254
    }
  },
  {
    "slug": "south-gate",
    "name": "South Gate",
    "city": "South Gate",
    "region": "South Bay & Gateway Cities",
    "focus": "Main sewer line repairs, water heater replacements & pipe repairs",
    "description": "South Gate homeowners and businesses trust our team for dependable sewer repairs, gas line safety inspections, and same-day emergency plumbing help.",
    "geo": {
      "lat": 33.9547,
      "lng": -118.212
    }
  },
  {
    "slug": "compton",
    "name": "Compton",
    "city": "Compton",
    "region": "South Bay & Gateway Cities",
    "focus": "Emergency rooter, sewer pipe descaling & water heater repair",
    "description": "Delivering fast rooter solutions, cast iron pipe descaling, and water heater replacements across Compton with transparent pricing and professional service.",
    "geo": {
      "lat": 33.8958,
      "lng": -118.2201
    }
  }
];
