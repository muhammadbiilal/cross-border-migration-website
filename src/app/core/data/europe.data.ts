export interface FeaturedCountry {
  name: string;
  note: string;
}

export const EUROPE_FEATURED: FeaturedCountry[] = [
  { name: 'Spain', note: 'Work and residence authorisation for hired roles, filed with the employer.' },
  { name: 'Serbia', note: 'Single work and residence permit for foreign workers and founders.' },
  { name: 'Czech Republic', note: 'Employee card for hired roles, EU Blue Card for skilled ones.' },
  { name: 'Bulgaria', note: 'Single permit for work and residence, EU Blue Card where the role qualifies.' },
];

export const EUROPE_OTHER: string[] = [
  'Austria',
  'Belgium',
  'Croatia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Italy',
  'Latvia',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Sweden',
  'Switzerland',
];
