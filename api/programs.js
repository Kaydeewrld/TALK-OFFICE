// Vercel Serverless Function: /api/programs
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const programs = [
    {
      id: 'hips',
      name: 'High Impact Professionals Seminar (HIPS)',
      acronym: 'HIPS',
      inception: 2023,
      editions: '8 editions',
      frequency: 'Held annually across Abuja and Lagos',
      status: 'Ongoing',
      badge: 'Flagship Seminar',
      tagline: 'Learning, capacity development, leadership, and professional impact.',
      description:
        "HIPS is The Talk Office's premier professional development programme, established in 2023. It convenes corporate executives, burgeoning talent, and institutional leaders for transformative capacity development, leadership immersion, and strategic networking. Held annually across Abuja and Lagos, HIPS has successfully graduated eight distinct cohorts into high-impact career progression.",
      highlights: [
        '8 completed high-impact editions across Nigeria’s commercial and administrative capitals',
        'Direct mentorship from seasoned C-Suite leaders, policy makers, and top consultants',
        'Practical frameworks for strategic thinking, organizational influence, and high performance',
        'Expanding to East Africa (Kigali, Rwanda) in March 2027 under The Talk Office Global'
      ],
      years: ['2023', '2024', '2025', '2026'],
      currentFocus: 'Pre-registration for Kigali 2027 and Lagos/Abuja 2027 cohorts'
    },
    {
      id: 'talk-table',
      name: 'The Talk Table',
      acronym: 'TTT',
      inception: 2026,
      editions: '4 editions',
      frequency: 'Ongoing; frequency under review (bi-monthly / quarterly)',
      status: 'Active & Evolving',
      badge: 'Curated Roundtables',
      tagline: 'Curated intimate conversations for depth, candid exchange, and strategic perspective.',
      description:
        'Launched in May 2026, The Talk Table is an exclusive, small-group salon designed to facilitate meaningful, unscripted discourse and vulnerable leadership reflections. Four editions have been held in Abuja (ABJ 1, ABJ 2, ABJ 3, ABJ 4). To preserve intimacy and deep preparation, the format is transitioning from monthly to a sustainable bi-monthly or quarterly cadence.',
      highlights: [
        'Curated guest lists ensuring diverse, multidisciplinary perspectives',
        'Focus on real-world leadership friction, personal sustainability, and organizational strategy',
        'Four successful Abuja cohorts held between May and October 2026',
        'Chatham House rule environment fostering authentic problem-solving'
      ],
      years: ['ABJ 1', 'ABJ 2', 'ABJ 3', 'ABJ 4'],
      currentFocus: 'Transitioning to an elevated quarterly retreat & dinner model'
    },
    {
      id: 'career-dinner',
      name: 'Career Dinner',
      acronym: 'TCD',
      inception: 2023,
      editions: '3 editions completed; 4th scheduled Dec 2026',
      frequency: 'Annual flagship gala & evening of reflection',
      status: 'Ongoing (4th Edition Dec 2026)',
      badge: 'Annual Gala',
      tagline: 'An elegant evening of meaningful connection, professional celebration, and year-end reflection.',
      description:
        'Initiated in 2023, Career Dinner has blossomed into the premier year-end gathering for professionals seeking meaningful relationship-building away from cold networking formalities. The 4th edition is officially slated for December 2026 in Abuja, bringing together executives, innovators, and thinkers to celebrate milestones and design intentional career roadmaps for the upcoming year.',
      highlights: [
        'Three sold-out editions completed (2023, 2024, 2025)',
        'Upcoming 4th Edition taking place on 11th December 2026 in Abuja',
        'Intimate keynote reflections, high-caliber peer exchanges, and recognition of excellence',
        'Curated seating and guided career prompts powered by The Talk Office Probing Cards'
      ],
      years: ['2023', '2024', '2025', '2026 (Upcoming)'],
      currentFocus: 'Seat reservations open for the 4th Edition in December 2026'
    },
    {
      id: 'ajsaf',
      name: 'Abuja Jobs and Skill Acquisition Fair (AJSAF)',
      acronym: 'AJSAF',
      inception: 2023,
      editions: '1 edition hosted (April 2023)',
      frequency: 'Special impact initiative',
      status: 'On Hold (Potential Revival in 2027)',
      badge: 'Public Sector & Social Impact',
      tagline: 'Bridging the national employability divide through training, private-public partnerships, and talent matchmaking.',
      description:
        'AJSAF was conceived as a national employability and skill-building accelerator to equip ambitious job seekers and transitioning professionals with in-demand 21st-century workplace competencies. Hosted in April 2023 as a completely free public-interest fair in collaboration with government stakeholders and private-sector employers. Given the extensive coordination and resource investment required, it is earmarked for a revitalized, amplified return in 2027.',
      highlights: [
        'Free career diagnostics, CV clinics, and practical mock interviews',
        'Tripartite collaboration between youth talent, enterprise employers, and civic bodies',
        'Strategic restructuring underway to launch a sustainable institutional partnership model in 2027'
      ],
      years: ['April 2023 Inception', '2027 Planned Revival'],
      currentFocus: 'Institutional partnership alignment for 2027 re-launch'
    },
    {
      id: 'global',
      name: 'The Talk Office Global',
      acronym: 'TTO-G',
      inception: 2027,
      editions: 'Inaugural Launch in March 2027',
      frequency: 'Pan-African & International Expeditions',
      status: 'Expanding in 2027',
      badge: 'International Expansion',
      tagline: 'Exporting transformative workforce philosophies across Africa and the global diaspora.',
      description:
        'The Talk Office Global represents the international scaling of our transformative methodologies. International engagements initially slated for Kigali, Rwanda, and Nairobi, Kenya in November 2026 have been strategically calibrated for March 2027 to ensure seamless immersion, bilateral business delegations, and executive study tours.',
      highlights: [
        'HIPS Kigali taking place in March 2027 featuring executive learning and cultural tours',
        'Kenya executive retreat and corporate leadership symposium',
        'Cross-border leadership networks uniting African innovators and diaspora executives'
      ],
      years: ['March 2027 (Kigali & Nairobi)'],
      currentFocus: 'International delegate registrations and travel partner arrangements'
    }
  ];

  return res.status(200).json({
    success: true,
    data: programs,
    summary: {
      activePrograms: 3,
      programsOnHold: 1,
      globalExpansions: 1,
      totalHipsEditions: 8,
      totalTalkTables: 4,
      totalCareerDinners: 3,
      upcomingCareerDinnerDate: '11/12/2026'
    }
  });
}
