export interface ServiceItem {
  slug: string;
  title: string;
  summary: string;
  lead: string;
  points: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    slug: 'european-work-permits',
    title: 'European work permits',
    summary: 'Work permits for Spain, Serbia, the Czech Republic, Bulgaria, and the rest of the Schengen area.',
    lead: 'Each European country runs its own permit. We match your job offer or trade to the country that hires for it, then prepare the permit file for that system.',
    points: [
      'Country match for your job or trade',
      'Employer, contract, and qualification documents',
      'Permit filing, visa appointment, and residence card after arrival',
    ],
  },
  {
    slug: 'student-visa',
    title: 'Student visa',
    summary: 'Admissions, funds evidence, and the visa file for study abroad.',
    lead: 'We line up a course that fits your background, then prepare the financial and study documents the consulate expects.',
    points: [
      'Course and institution shortlist',
      'Funds and sponsor evidence',
      'Visa forms and interview preparation',
    ],
  },
  {
    slug: 'work-visa',
    title: 'Work visa and permit',
    summary: 'Employment visas and work permits, from offer letter to submission.',
    lead: 'When an employer is ready to hire you, we prepare the permit file so the contract, qualifications, and application match.',
    points: [
      'Offer and contract review',
      'Qualification and experience evidence',
      'Permit filing and follow-up',
    ],
  },
  {
    slug: 'family-visa',
    title: 'Family and dependent visa',
    summary: 'Spouse, child, and dependent applications that travel with a main applicant.',
    lead: 'Family files fail on relationship and dependency evidence. We assemble that record before the main application goes in.',
    points: [
      'Relationship and civil documents',
      'Dependent eligibility check',
      'Linked filing with the principal applicant',
    ],
  },
  {
    slug: 'european-residency',
    title: 'European residency',
    summary: 'Residence routes through work, long stay, or qualifying investment.',
    lead: 'Europe is not one visa. We match your profile to a residence route in a specific country and spell out the stay conditions.',
    points: [
      'Country and route comparison',
      'Residence and permit paperwork',
      'Stay conditions explained in writing',
    ],
  },
  {
    slug: 'tourist-visa',
    title: 'Tourist and visit visa',
    summary: 'Short-stay visas for travel, family visits, and business meetings.',
    lead: 'Visit visas are refused when the trip, funds, and ties home are unclear. We prepare a file that states all three.',
    points: [
      'Itinerary and invitation letters',
      'Funds and ties evidence',
      'Application check before submission',
    ],
  },
  {
    slug: 'pr-citizenship',
    title: 'PR and citizenship',
    summary: 'Permanent residence and later citizenship, mapped to the rules that apply now.',
    lead: 'Points, residence history, and character checks decide these files. We tell you which pathway is open and which is not.',
    points: [
      'Points or eligibility assessment',
      'Residence history review',
      'Filing plan and document list',
    ],
  },
  {
    slug: 'business-visa',
    title: 'Business and investor visa',
    summary: 'Investor, founder, and business-owner routes for people opening activity abroad.',
    lead: 'These files rest on a real business plan, source of funds, and the destination’s investment threshold. We check those before drafting.',
    points: [
      'Route and threshold check',
      'Source-of-funds outline',
      'Application pack for the consulate',
    ],
  },
  {
    slug: 'skilled-migration',
    title: 'Skilled migration',
    summary: 'Occupation-based migration for people whose trade or profession is in demand.',
    lead: 'We compare your occupation, years of work, and language level with the programmes that actually invite that profile.',
    points: [
      'Occupation match',
      'Skills and language gap list',
      'Expression of interest or visa file',
    ],
  },
];

export function serviceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
