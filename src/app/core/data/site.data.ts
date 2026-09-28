export const SITE = {
  name: 'Cross Border Migration',
  tagline: 'A clear path for work, study, and family visas.',
  // Contact details are blank until the desk has them; templates show "-".
  email: '',
  phone: '',
  phoneHref: '',
  whatsapp: '',
  whatsappHref: '',
  address: '',
  hours: '',
};

export const OFFICES: { name: string; address: string }[] = [];

export const PHONES: { label: string; href: string; text: string }[] = [];

export const EMAILS: { label: string; href: string; text: string }[] = [];

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/destinations', label: 'Destinations' },
  { path: '/faq', label: 'FAQ' },
] as const;


export const STATS = [
  { value: '8', label: 'Visa pathways' },
  { value: '10', label: 'Destination countries' },
  { value: '4', label: 'Steps, start to arrival' },
] as const;

export const REASONS = [
  {
    title: 'One consultant on the file',
    text: 'The person who reviews your profile stays with the case through submission.',
  },
  {
    title: 'A written plan first',
    text: 'Pathway, documents, timeline, and fees are set out before you commit.',
  },
  {
    title: 'Honest fit',
    text: 'If a route is closed, we say so and what would need to change.',
  },
  {
    title: 'After the visa',
    text: 'You leave with the conditions of stay and a short checklist for arrival.',
  },
] as const;
