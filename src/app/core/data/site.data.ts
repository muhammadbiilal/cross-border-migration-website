export const SITE = {
  name: 'Cross Border Migration',
  tagline: 'A clear path for work, study, and family visas.',
  email: 'hello@skylinemanagementconsultants.com',
  phone: '+974 4151 4801',
  phoneHref: 'tel:+97441514801',
  whatsapp: '+974 7151 4801',
  whatsappHref: 'https://wa.me/97471514801',
  address:
    'Office No. 5, 1st Floor, Al Qamra Holding Group Building, Al Difaaf Street, Al Sadd, Doha, Qatar',
  hours: 'Monday to Friday, 9:00 to 18:00',
};

export const OFFICES = [
  {
    name: 'Al Sadd',
    address:
      'Office No. 5, 1st Floor, Al Qamra Holding Group Building (opposite Al Asmakh Mall), Al Difaaf Street, Al Sadd, Doha, Qatar',
  },
  {
    name: 'Al Manara',
    address: 'Office No. 15, Al Manara Building, Building No. 128, 3rd Floor, Doha, Qatar',
  },
] as const;

export const PHONES = [
  { label: 'Hotline', href: 'tel:+97441514801', text: '+974 4151 4801' },
  { label: 'WhatsApp', href: 'https://wa.me/97471514801', text: '+974 7151 4801' },
  { label: 'Peoples Migration', href: 'tel:+97431515599', text: '+974 3151 5599' },
] as const;

export const EMAILS = [
  { label: 'Skyline', href: 'mailto:hello@skylinemanagementconsultants.com', text: 'hello@skylinemanagementconsultants.com' },
  { label: 'Peoples Migration', href: 'mailto:info@peoplesmigration.com', text: 'info@peoplesmigration.com' },
  { label: 'Bright Way', href: 'mailto:info@brightwayfuturemigration.com', text: 'info@brightwayfuturemigration.com' },
  { label: 'Case filing', href: 'mailto:casefiling@brightwayfuturemigration.com', text: 'casefiling@brightwayfuturemigration.com' },
] as const;

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/destinations', label: 'Countries' },
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
