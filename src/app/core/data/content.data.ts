export const PROCESS = [
  {
    step: '01',
    title: 'Free assessment',
    text: 'A short conversation on your background, goal, and timeline. We name the routes that are actually open.',
  },
  {
    step: '02',
    title: 'Written plan',
    text: 'Pathway, document list, expected timing, and fees, in writing, before you decide to proceed.',
  },
  {
    step: '03',
    title: 'Application',
    text: 'We prepare the file, submit it, and follow up with the authority handling the case.',
  },
  {
    step: '04',
    title: 'Arrival',
    text: 'When a visa is granted, you get the conditions of stay and a short arrival checklist.',
  },
] as const;

export const FAQS = [
  {
    question: 'How long does a visa take?',
    answer:
      'It depends on the country and the category. At the assessment we give a range based on current processing, not a promise.',
  },
  {
    question: 'Can I apply for residence without a job offer?',
    answer:
      'Some programmes, including parts of Canada and Australia, do not require a job offer. Many work permits do. We check which group you are in.',
  },
  {
    question: 'What documents will I need?',
    answer:
      'Identity, funds, work or study history, and sometimes health or police checks. After the assessment you get a list for your file only.',
  },
  {
    question: 'Do you help people find work?',
    answer:
      'We prepare work-permit files and tell you what an employer must provide. We do not place you in a job.',
  },
  {
    question: 'What if an application is refused?',
    answer:
      'We read the refusal, say whether a new filing or a review is realistic, and what must change. We do not guarantee an approval.',
  },
  {
    question: 'Can you take over a file that has already started?',
    answer:
      'Yes. We review what was submitted, list the gaps, and continue from there if the route is still open.',
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      'The written plan named the permit, the documents, and the fee before I paid. The file matched that plan.',
    name: 'Sample client',
    detail: 'Work permit, Poland',
  },
  {
    quote:
      'I had already started a study application. They marked what was missing and stayed on the file until the decision.',
    name: 'Sample client',
    detail: 'Student visa, United Kingdom',
  },
  {
    quote:
      'They told me one route was closed and pointed at the one that matched my work history. That saved a refused filing.',
    name: 'Sample client',
    detail: 'Skilled migration, Canada',
  },
] as const;
