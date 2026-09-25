export const SITE = {
  name: 'Cross Border Migration',
  tagline: 'A clear path for work, study, and family visas.',
  email: 'hello@crossbordermigration.example',
  phone: '+000 000 0000',
  phoneHref: 'tel:+0000000000',
  whatsapp: '+000 000 0000',
  whatsappHref: 'https://wa.me/0000000000',
  address: 'Replace with the office address',
  hours: 'Monday to Friday, 9:00 to 18:00',
};

export const NAV_LINKS = [
  { path: '/services', label: 'Services' },
  { path: '/destinations', label: 'Destinations' },
  { path: '/about', label: 'About' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
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
