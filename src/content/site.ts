export type CapabilityId =
  | 'online-leak-sealing'
  | 'composite-wrapping'
  | 'clamp-wrap'
  | 'valve-services'
  | 'flange-sealing'
  | 'crack-reinforcement'
  | 'pipeline-tank-repairs';

export type ProductSystemId =
  | 'iridium-wrap-carbon'
  | 'titanium-wrap-glass'
  | 'hydrowrap'
  | 'leak-stop-putty'
  | 'metal-plate-ratchet';

export interface Metric {
  label: string;
  value: string;
  helper?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  assetType: string;
  sector: string;
  region: string;
  challenge: string;
  conditions: string;
  solution: string;
  outcome: string;
}

export const site = {
  company: 'Excel Stark',
  tagline: 'The Right Repair — Every Time',
  industry:
    'Industrial piping, pressure systems, leak sealing and composite repair services',

  nav: [
    { href: '#capabilities', label: 'Capabilities' },
    { href: '#products', label: 'Systems' },
    { href: '#process', label: 'How It Works' },
    { href: '#cases', label: 'Case Studies' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' }
  ],

  hero: {
    heroA: {
      eyebrow: 'Online Leak Sealing • Composite Wrapping',
      title: 'Keep your pressure systems online — not in shutdown.',
      subtitle:
        'Excel Stark delivers engineered online leak sealing and composite repairs that keep refineries, pipelines and utilities running safely without unplanned shutdowns.',
      primaryCta: {
        label: 'Request Engineering Support',
        href: '#contact',
        analyticsId: 'heroA_request_support'
      },
      secondaryCta: {
        label: 'Book a Leak Assessment',
        href: '#contact',
        analyticsId: 'heroA_leak_assessment'
      }
    },
    heroB: {
      eyebrow: 'ISO 24817 / ASME PCC-2 • FEA-Verified Designs',
      title: 'The right repair, in the right place, at the right time.',
      subtitle:
        'From on-line clamp and enclosure designs to advanced carbon wrap systems, our engineers deliver qualified repairs backed by independent testing and global standards.',
      primaryCta: {
        label: 'Talk to an Engineer',
        href: '#contact',
        analyticsId: 'heroB_talk_engineer'
      },
      secondaryCta: {
        label: 'Download Product Deck (PDF)',
        href: '/excel-stark-product-deck.pdf',
        analyticsId: 'heroB_download_deck'
      }
    }
  },

  logoCloud: {
    title: 'Trusted on critical assets worldwide',
    items: [
      'Refineries & petrochemicals',
      'Offshore platforms & risers',
      'Fire water networks',
      'Tank farms & terminals',
      'Power & utilities'
    ]
  },

  values: [
    'Continual improvement – pioneering the best repair systems at competitive cost.',
    'Responsive to client needs – the right repair in the right place, every time.',
    'Support based on global standards with accurate and timely engineering.',
    'Do it right the first time, even when no one is watching.'
  ],

  metrics: <Metric[]>[
    { label: 'Leak sites sealed', value: '10,000+', helper: 'On-line & offline' },
    { label: 'Countries supported', value: '30+', helper: 'Across MENA & beyond' },
    { label: 'First-time success', value: '98.9%', helper: 'Engineered repairs' },
    { label: 'Temperature range', value: '-55–550°C', helper: 'Resin systems' }
  ],

  capabilities: [
    {
      id: 'online-leak-sealing' as CapabilityId,
      title: 'Online Leak Sealing',
      description:
        'Design and installation of engineered enclosures and clamps on live systems — without shutdown.',
      bullets: [
        'Piping & pipeline leaks',
        'Bolted flange connections (ring & wire type)',
        'Enclosure design with FEA bolt-stress checks',
        'UK engineering approval prior to fabrication'
      ]
    },
    {
      id: 'composite-wrapping' as CapabilityId,
      title: 'Composite Wrapping (Glass / Carbon)',
      description:
        'Cold-applied glass and carbon fibre systems for process piping, pipelines and tanks.',
      bullets: [
        'Qualified to ISO 24817 & ASME PCC-2 Article 4.1',
        'External corrosion and through-wall weeps',
        'Complex geometries, tees, elbows and nozzles',
        'Tank shell, roof and floor reinforcement (API 653)'
      ]
    },
    {
      id: 'clamp-wrap' as CapabilityId,
      title: 'Clamp + Wrap Engineering',
      description:
        'Hybrid solutions combining mechanical clamps and long-life composite overwrap.',
      bullets: [
        'Pipe-saver clamps for instant containment',
        'Composite overwrap designed for 10–20 year life',
        'MFL inspection-tool detectable sleeves',
        'ASME B31.4 / B31.8s qualified solutions'
      ]
    },
    {
      id: 'valve-services' as CapabilityId,
      title: 'Valve Gland Packing & Killing',
      description:
        'On-line valve gland packing and line killing to stop fugitive emissions and restore tight shutoff.',
      bullets: [
        'Drill & tap for injection adaptors',
        'On-line packing without valve removal',
        'Seat injection for non-seating valves',
        'Alternative to full isolation or shutdown'
      ]
    },
    {
      id: 'flange-sealing' as CapabilityId,
      title: 'Flange Sealing & Ring / Wire Enclosures',
      description:
        'Ring-type and wire-type enclosures for leaking flange gaskets, even with minimal gaps.',
      bullets: [
        'Ring-type enclosures for >7 mm flange gaps',
        'Wire-type sealing for <7 mm flange gaps',
        'Low-emission flange leak mitigation',
        'Adaptors for compound injection and re-entry'
      ]
    },
    {
      id: 'crack-reinforcement' as CapabilityId,
      title: 'Crack & Dent Reinforcement',
      description:
        'High modulus carbon systems to reinforce cracks, dents, wrinkle bends and geotechnical loading.',
      bullets: [
        'High-tensile, low-strain carbon systems',
        'Proven for crack-like flaws and wrinkle bends',
        'Geotechnical movement and dent mitigation',
        'Full-scale testing to ISO 24817 / ASME PCC-2'
      ]
    },
    {
      id: 'pipeline-tank-repairs' as CapabilityId,
      title: 'Pipeline & Tank Repairs',
      description:
        'Permanent composite sleeve and wrap systems for high-pressure pipelines and storage tanks.',
      bullets: [
        'Composite sleeves for high-pressure transmission lines',
        'Tank shell, floor and roof reinforcement',
        'Independent lab testing and calculations in Europe',
        'Local installation teams and mentoring'
      ]
    }
  ],

  productSystems: [
    {
      id: 'iridium-wrap-carbon' as ProductSystemId,
      name: 'Iridium Wrap Carbon',
      type: 'Carbon Fibre Epoxy System',
      description:
        'High-modulus carbon fibre wrap for high-pressure pipelines, cracks, dents and wrinkle bends.',
      keyFeatures: [
        'Tested beyond ISO 24817 / ASME PCC-2 requirements',
        'Ideal where minimum movement of the pipeline is required',
        'Excellent for complex geometries and critical welds',
        'High tensile strength with low strain-to-failure'
      ],
      typicalUse:
        'High-pressure transmission pipelines, crack-like features, dents and geotechnical movement.'
    },
    {
      id: 'titanium-wrap-glass' as ProductSystemId,
      name: 'Titanium Wrap Glass',
      type: 'Glass Fibre Epoxy System',
      description:
        'Cost-effective glass fibre system for process piping, tanks and secondary containment.',
      keyFeatures: [
        'Wide temperature range from -55°C to +550°C (with matching resins)',
        'Conforms easily to any pipe geometry',
        'Suitable for tank shells, roofs and floors (API 653 / PCC-2)',
        'Chemical resistance validated against >149 chemicals'
      ],
      typicalUse:
        'Process piping external corrosion, tank patches and general reinforcement.'
    },
    {
      id: 'hydrowrap' as ProductSystemId,
      name: 'Titanium HydroWrap',
      type: 'Water-Activated System',
      description:
        'Pre-impregnated, water-activated wrap for quick, simple leak repairs where speed is critical.',
      keyFeatures: [
        'Water-activated fabric; minimal mixing',
        'Ideal for emergency leak arrest',
        'Simple installation on small bore piping',
        'Fast cure to restore integrity quickly'
      ],
      typicalUse: 'Rapid leak reduction on small-bore piping and low-to-medium pressure lines.'
    },
    {
      id: 'leak-stop-putty' as ProductSystemId,
      name: 'Leak Stop Epoxy Putty',
      type: 'Epoxy Putty',
      description:
        'Hand-mixable epoxy putty formulated to plug active leaks before overwrapping.',
      keyFeatures: [
        'Pre-weighed for easy mixing',
        'Chemically resistant to produced fluids',
        'Compatible with glass and carbon wraps',
        'Used on tank wall and piping weeps'
      ],
      typicalUse:
        'Localised hole and weep sealing on crude oil lines, tanks and fire water systems.'
    },
    {
      id: 'metal-plate-ratchet' as ProductSystemId,
      name: 'Metal Plate + Ratchet System',
      type: 'Mechanical + Composite Hybrid',
      description:
        'Metal rubber, plates and ratchet straps to divert and contain leaks, combined with composite overwrap.',
      keyFeatures: [
        'Suitable for cooling water and low/medium pressure lines',
        'Designed for 7 barg and 60°C operation (as per reference case)',
        'Provides minimum 10-year life when overwrapped',
        'Non-hot-work solution for in-service lines'
      ],
      typicalUse:
        'Cooling water lines and process lines where metal plates and straps can be safely installed.'
    }
  ],

  howItWorks: {
    leakSealingSteps: [
      'On-site survey & dimension sheet for the leaking pipe, flange or valve.',
      'Engineering design of enclosure or clamp with bolt-stress and shell checks using FEA.',
      'UK engineering approval of calculations and drawings (ISO 24817 / ASME PCC-2 basis).',
      'Fabrication of the enclosure/clamp as per approved drawings.',
      'Inspection of welds, dimensions, bolt holes, lugs, end plate and groove sizes.',
      'Installation of the enclosure on the live line and tightening of bolts.',
      'Controlled injection of sealing compound until the leak is fully contained.'
    ],
    compositeWrapSteps: [
      'Selection of glass, carbon or aqua wrap based on line temperature, pressure, contents and leak condition.',
      'Surface preparation to the specified profile (e.g. 65–85 µm by bristle blaster or blasting).',
      'Application of filler and primer to rebuild profile and promote adhesion.',
      'Wet-out of fibre using the selected epoxy system or activation of water-activated wraps.',
      'Controlled wrapping to the engineered thickness and length, including overlap zones.',
      'Cure, inspection and, where applicable, recommissioning of the system.'
    ]
  },

  caseStudies: <CaseStudy[]>[
    {
      id: 'fire-water-tank-texas',
      title: 'Fire water tank leak sealed without hot work',
      assetType: 'Fire water storage tank',
      sector: 'Fire Protection',
      region: 'Texas, USA',
      challenge:
        'Leaking fire water tank with through-wall corrosion on a tall shell (18 m height).',
      conditions: 'Ambient temperature; fire water duty; in-service condition preferred.',
      solution:
        'Leak sealed with epoxy putty and fibre, followed by glass / carbon overwrap to reinforce the shell.',
      outcome:
        'Leak stopped without hot work and tank integrity restored while avoiding full drainage.'
    },
    {
      id: 'cooling-water-metal-plate',
      title: 'Cooling water line sealed with metal plate and ratchet straps',
      assetType: 'Cooling water line',
      sector: 'Utilities',
      region: 'Process plant',
      challenge: 'Internal corrosion with multiple leaks on cooling water piping.',
      conditions: '7 barg design pressure, 60°C operating temperature.',
      solution:
        'Leaks sealed using metal rubber, metal plates and ratchet straps, then overwrapped with composite.',
      outcome:
        'Delivered a minimum 10-year repair life with no hot work and minimal downtime.'
    },
    {
      id: 'canary-islands-tank',
      title: 'Tank weld defects reinforced with glass fibre',
      assetType: 'Hydrocarbon storage tank',
      sector: 'Terminals & Tank Farms',
      region: 'Canary Islands',
      challenge: 'Lack of fusion in tank welds requiring long-length reinforcement.',
      conditions: 'In-service tank; long weld seams totalling 114 linear meters.',
      solution:
        'Glass fibre repair designed to ISO 24817 / API 653 and installed with local support.',
      outcome:
        '20-year design life achieved with in-service repair, avoiding costly out-of-service work.'
    },
    {
      id: 'saudi-tank-wall',
      title: '36.7 m crude tank wall leak arrest',
      assetType: 'Crude oil storage tank',
      sector: 'Refining',
      region: 'Saudi Arabia',
      challenge:
        'Leak indication from tell-tale hole and localised wall degradation on a 36.7 m diameter tank.',
      conditions: 'Crude oil service, elevated temperature; tank in operation.',
      solution:
        'Approximately 25 m² of tank wall wrapped with composite designed to ASME PCC-2 / API 653.',
      outcome:
        '20-year design life with local installation support and no hot work on the tank wall.'
    },
    {
      id: 'pipeline-corrosion-north-africa',
      title: '20” crude oil pipeline with 66% external corrosion',
      assetType: '20” crude oil pipeline',
      sector: 'Pipelines',
      region: 'North Africa',
      challenge:
        'Severe external corrosion up to 66% through wall on high-pressure crude oil line.',
      conditions: 'Design pressure 210 barg, 60°C operating temperature.',
      solution: 'Three layers of carbon fibre composite wrap installed along the defect zone.',
      outcome:
        'Pipeline integrity restored with a composite repair designed in line with ISO 24817.'
    },
    {
      id: 'flare-drum-wrapped',
      title: 'Flare drum wrapped to avoid pre-shutdown leaks',
      assetType: 'Flare drum vessel',
      sector: 'Refinery',
      region: 'USA',
      challenge:
        'Severe internal corrosion expected to cause leaks before the next planned shutdown.',
      conditions: 'High-temperature, cyclic service with limited outage available.',
      solution:
        'Entire vessel wrapped with four layers of carbon fibre composite to contain internal defects.',
      outcome:
        'Drum kept in reliable service for ≥8 years, aligning with shutdown strategy and avoiding unplanned outage.'
    }
  ],

  differentiators: [
    '24/7 engineering support team covering MENA and global assets.',
    'FEA-verified repair designs and calculation check sheets for every enclosure and clamp.',
    'Full compliance with ISO 24817, ASME PCC-2, API 653 and pipeline design codes.',
    'Independent product testing and chemical resistance validation for >200 chemicals.',
    'Local installation partners with training, mentoring and competency development.',
    'No-hot-work solutions for live systems where shutdown is not an option.'
  ],

  faqs: <FAQItem[]>[
    {
      question: 'What types of leaks can be sealed on-line?',
      answer:
        'Excel Stark seals leaks on process piping, pipelines, bolted flange connections, valves (gland leaks and non-seating valves) and selected tank nozzles. Feasibility depends on pressure, temperature, geometry and access – our engineers assess each case before proposing an on-line solution.'
    },
    {
      question: 'What pressure and temperature ranges can your systems handle?',
      answer:
        'Our resin systems cover a range from approximately -55°C up to +550°C when correctly specified. Design pressure limits depend on the defect and geometry; our composite systems have been qualified for high-pressure transmission pipelines and operate up to 210 barg in reference projects.'
    },
    {
      question: 'Are your repairs compliant with ISO 24817 and ASME PCC-2?',
      answer:
        'Yes. Composite repairs and leak sealing solutions are designed and checked in accordance with ISO 24817 and ASME PCC-2 Article 4.1, with additional testing for cracks, dents and wrinkle bends. For tanks we also follow API 653 requirements.'
    },
    {
      question: 'How quickly can you respond to an emergency leak?',
      answer:
        'For urgent leaks we can provide rapid assessment based on photos, process data and line drawings, followed by dispatch of on-line leak sealing teams. Simple metal-plate and HydroWrap solutions can often be implemented within hours once on site, while engineered enclosures require fast-tracked design and fabrication.'
    },
    {
      question: 'What information do you need to design a repair?',
      answer:
        'We typically require line size and schedule, design and operating pressures and temperatures, fluid service, defect description and dimensions, isometric or P&ID drawings, photos and any inspection data (UT, MFL or visual). Our team uses this to prepare dimension sheets and run FEA and composite calculations.'
    }
  ],

  contact: {
    headline: 'Speak with an on-line leak sealing engineer',
    subcopy:
      'Share your leak details, operating envelope and photos. Our engineering team will review and revert with a safe, standards-based repair concept.',
    regions: ['Middle East & North Africa', 'Europe', 'Asia Pacific', 'Americas']
  }
} as const;
