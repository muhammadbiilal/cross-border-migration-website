export interface Destination {
  slug: string;
  name: string;
  region: string;
  summary: string;
  pathways: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    slug: 'spain',
    name: 'Spain',
    region: 'Europe',
    summary: 'Work and residence permits for hired roles, plus the EU Blue Card for highly qualified ones.',
    pathways: ['Employer-sponsored work and residence', 'EU Blue Card where the role qualifies', 'Family reunification after the main grant'],
  },
  {
    slug: 'serbia',
    name: 'Serbia',
    region: 'Europe',
    summary: 'Work, residence, and business routes for people starting activity in an emerging market.',
    pathways: ['Work and residence permits', 'Business and investment stays', 'Founder setup alongside the permit'],
  },
  {
    slug: 'czech-republic',
    name: 'Czech Republic',
    region: 'Europe',
    summary: 'Employee cards for hired roles in manufacturing, logistics, construction, and technology.',
    pathways: ['Employee card', 'EU Blue Card where the role qualifies', 'Family members filed with the worker'],
  },
  {
    slug: 'bulgaria',
    name: 'Bulgaria',
    region: 'Europe',
    summary: 'Single work and residence permits for hired roles, with the EU Blue Card for skilled ones.',
    pathways: ['Single permit for work and residence', 'EU Blue Card where the role qualifies', 'Family reunification'],
  },
  {
    slug: 'poland',
    name: 'Poland',
    region: 'Europe',
    summary: 'Work permits for skilled roles in technology, health, engineering, and manufacturing.',
    pathways: ['Temporary and longer-term work permits', 'EU Blue Card where the role qualifies', 'Family members filed with the worker'],
  },
  {
    slug: 'croatia',
    name: 'Croatia',
    region: 'Europe',
    summary: 'Permits for hospitality, tourism, and other hired roles, plus self-employed residence where it fits.',
    pathways: ['Employment-based work permits', 'Self-employed residence', 'Family reunification'],
  },
  {
    slug: 'germany',
    name: 'Germany',
    region: 'Europe',
    summary: 'Skilled-worker, job-seeker, and employer-sponsored routes into a large labour market.',
    pathways: ['Skilled worker and EU Blue Card', 'Job-seeker visa where eligible', 'Later residence and citizenship planning'],
  },
  {
    slug: 'norway',
    name: 'Norway',
    region: 'Europe',
    summary: 'Skilled permits in energy, technology, and engineering, plus family residence after the main grant.',
    pathways: ['Skilled worker permits', 'Investor and founder routes where available', 'Permanent residence and family reunification'],
  },
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    region: 'Europe',
    summary: 'Student, skilled worker, and family visas, with a written list of funds and relationship evidence.',
    pathways: ['Student visas', 'Skilled Worker', 'Family and dependent visas'],
  },
  {
    slug: 'canada',
    name: 'Canada',
    region: 'North America',
    summary: 'Study, work, and permanent residence programmes, including routes that do not start with a job offer.',
    pathways: ['Study permits', 'Work permits', 'Permanent residence programmes'],
  },
  {
    slug: 'united-states',
    name: 'United States',
    region: 'North America',
    summary: 'Visit, study, and employment-based visas. Each category has its own sponsor and evidence rules.',
    pathways: ['Visitor visas', 'Student visas', 'Employment-based petitions'],
  },
  {
    slug: 'australia',
    name: 'Australia',
    region: 'Oceania',
    summary: 'Skilled, student, and employer-sponsored visas, with permanent residence as a later step.',
    pathways: ['Skilled migration', 'Student visas', 'Employer-sponsored work'],
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    region: 'Oceania',
    summary: 'Work, study, and residence pathways for people whose skills match current settings.',
    pathways: ['Accredited employer work', 'Student visas', 'Residence where the criteria match'],
  },
];

export function destinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((destination) => destination.slug === slug);
}
