-- Public site content. Visitors can read. Only a signed-in staff user can change rows.
-- Inquiries stay insert-only for visitors (see 0001_inquiries.sql).

create table public.services (
  slug text primary key,
  title text not null,
  summary text not null,
  lead text not null,
  points text[] not null default '{}',
  sort int not null default 0
);

create table public.destinations (
  slug text primary key,
  name text not null,
  region text not null,
  summary text not null,
  pathways text[] not null default '{}',
  sort int not null default 0
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort int not null default 0
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  detail text not null,
  sort int not null default 0
);

create table public.offices (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  sort int not null default 0
);

create table public.phones (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  text text not null,
  sort int not null default 0
);

create table public.emails (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  text text not null,
  sort int not null default 0
);

do $$
declare
  t text;
begin
  foreach t in array array[
    'services', 'destinations', 'faqs', 'testimonials', 'offices', 'phones', 'emails'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on table public.%I from anon, authenticated', t);
    execute format('grant select on table public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on table public.%I to authenticated', t);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true)',
      t || '_read', t
    );
    execute format(
      'create policy %I on public.%I for insert to authenticated with check (true)',
      t || '_insert', t
    );
    execute format(
      'create policy %I on public.%I for update to authenticated using (true) with check (true)',
      t || '_update', t
    );
    execute format(
      'create policy %I on public.%I for delete to authenticated using (true)',
      t || '_delete', t
    );
  end loop;
end $$;

insert into public.services (slug, title, summary, lead, points, sort) values
  ('student-visa', 'Student visa', 'Admissions, funds evidence, and the visa file for study abroad.', 'We line up a course that fits your background, then prepare the financial and study documents the consulate expects.', array['Course and institution shortlist', 'Funds and sponsor evidence', 'Visa forms and interview preparation'], 0),
  ('work-visa', 'Work visa and permit', 'Employment visas and work permits, from offer letter to submission.', 'When an employer is ready to hire you, we prepare the permit file so the contract, qualifications, and application match.', array['Offer and contract review', 'Qualification and experience evidence', 'Permit filing and follow-up'], 1),
  ('family-visa', 'Family and dependent visa', 'Spouse, child, and dependent applications that travel with a main applicant.', 'Family files fail on relationship and dependency evidence. We assemble that record before the main application goes in.', array['Relationship and civil documents', 'Dependent eligibility check', 'Linked filing with the principal applicant'], 2),
  ('european-residency', 'European residency', 'Residence routes through work, long stay, or qualifying investment.', 'Europe is not one visa. We match your profile to a residence route in a specific country and spell out the stay conditions.', array['Country and route comparison', 'Residence and permit paperwork', 'Stay conditions explained in writing'], 3),
  ('tourist-visa', 'Tourist and visit visa', 'Short-stay visas for travel, family visits, and business meetings.', 'Visit visas are refused when the trip, funds, and ties home are unclear. We prepare a file that states all three.', array['Itinerary and invitation letters', 'Funds and ties evidence', 'Application check before submission'], 4),
  ('pr-citizenship', 'PR and citizenship', 'Permanent residence and later citizenship, mapped to the rules that apply now.', 'Points, residence history, and character checks decide these files. We tell you which pathway is open and which is not.', array['Points or eligibility assessment', 'Residence history review', 'Filing plan and document list'], 5),
  ('business-visa', 'Business and investor visa', 'Investor, founder, and business-owner routes for people opening activity abroad.', $cbm$These files rest on a real business plan, source of funds, and the destination's investment threshold. We check those before drafting.$cbm$, array['Route and threshold check', 'Source-of-funds outline', 'Application pack for the consulate'], 6),
  ('skilled-migration', 'Skilled migration', 'Occupation-based migration for people whose trade or profession is in demand.', 'We compare your occupation, years of work, and language level with the programmes that actually invite that profile.', array['Occupation match', 'Skills and language gap list', 'Expression of interest or visa file'], 7);

insert into public.destinations (slug, name, region, summary, pathways, sort) values
  ('poland', 'Poland', 'Europe', 'Work permits for skilled roles in technology, health, engineering, and manufacturing.', array['Temporary and longer-term work permits', 'EU Blue Card where the role qualifies', 'Family members filed with the worker'], 0),
  ('croatia', 'Croatia', 'Europe', 'Permits for hospitality, tourism, and other hired roles, plus self-employed residence where it fits.', array['Employment-based work permits', 'Self-employed residence', 'Family reunification'], 1),
  ('serbia', 'Serbia', 'Europe', 'Work, residence, and business routes for people starting activity in an emerging market.', array['Work and residence permits', 'Business and investment stays', 'Founder setup alongside the permit'], 2),
  ('germany', 'Germany', 'Europe', 'Skilled-worker, job-seeker, and employer-sponsored routes into a large labour market.', array['Skilled worker and EU Blue Card', 'Job-seeker visa where eligible', 'Later residence and citizenship planning'], 3),
  ('norway', 'Norway', 'Europe', 'Skilled permits in energy, technology, and engineering, plus family residence after the main grant.', array['Skilled worker permits', 'Investor and founder routes where available', 'Permanent residence and family reunification'], 4),
  ('canada', 'Canada', 'North America', 'Study, work, and permanent residence programmes, including routes that do not start with a job offer.', array['Study permits', 'Work permits', 'Permanent residence programmes'], 5),
  ('australia', 'Australia', 'Oceania', 'Skilled, student, and employer-sponsored visas, with permanent residence as a later step.', array['Skilled migration', 'Student visas', 'Employer-sponsored work'], 6),
  ('united-kingdom', 'United Kingdom', 'Europe', 'Student, skilled worker, and family visas, with a written list of funds and relationship evidence.', array['Student visas', 'Skilled Worker', 'Family and dependent visas'], 7),
  ('united-states', 'United States', 'North America', 'Visit, study, and employment-based visas. Each category has its own sponsor and evidence rules.', array['Visitor visas', 'Student visas', 'Employment-based petitions'], 8),
  ('new-zealand', 'New Zealand', 'Oceania', 'Work, study, and residence pathways for people whose skills match current settings.', array['Accredited employer work', 'Student visas', 'Residence where the criteria match'], 9);

insert into public.faqs (question, answer, sort) values
  ('How long does a visa take?', 'It depends on the country and the category. At the assessment we give a range based on current processing, not a promise.', 0),
  ('Can I apply for residence without a job offer?', 'Some programmes, including parts of Canada and Australia, do not require a job offer. Many work permits do. We check which group you are in.', 1),
  ('What documents will I need?', 'Identity, funds, work or study history, and sometimes health or police checks. After the assessment you get a list for your file only.', 2),
  ('Do you help people find work?', 'We prepare work-permit files and tell you what an employer must provide. We do not place you in a job.', 3),
  ('What if an application is refused?', 'We read the refusal, say whether a new filing or a review is realistic, and what must change. We do not guarantee an approval.', 4),
  ('Can you take over a file that has already started?', 'Yes. We review what was submitted, list the gaps, and continue from there if the route is still open.', 5);

insert into public.testimonials (quote, name, detail, sort) values
  ('The written plan named the permit, the documents, and the fee before I paid. The file matched that plan.', 'Sample client', 'Work permit, Poland', 0),
  ('I had already started a study application. They marked what was missing and stayed on the file until the decision.', 'Sample client', 'Student visa, United Kingdom', 1),
  ('They told me one route was closed and pointed at the one that matched my work history. That saved a refused filing.', 'Sample client', 'Skilled migration, Canada', 2);

insert into public.offices (name, address, sort) values
  ('Al Sadd', 'Office No. 5, 1st Floor, Al Qamra Holding Group Building (opposite Al Asmakh Mall), Al Difaaf Street, Al Sadd, Doha, Qatar', 0),
  ('Al Manara', 'Office No. 15, Al Manara Building, Building No. 128, 3rd Floor, Doha, Qatar', 1);

insert into public.phones (label, href, text, sort) values
  ('Hotline', 'tel:+97441514801', '+974 4151 4801', 0),
  ('WhatsApp', 'https://wa.me/97471514801', '+974 7151 4801', 1),
  ('Peoples Migration', 'tel:+97431515599', '+974 3151 5599', 2);

insert into public.emails (label, href, text, sort) values
  ('Skyline', 'mailto:hello@skylinemanagementconsultants.com', 'hello@skylinemanagementconsultants.com', 0),
  ('Peoples Migration', 'mailto:info@peoplesmigration.com', 'info@peoplesmigration.com', 1),
  ('Bright Way', 'mailto:info@brightwayfuturemigration.com', 'info@brightwayfuturemigration.com', 2),
  ('Case filing', 'mailto:casefiling@brightwayfuturemigration.com', 'casefiling@brightwayfuturemigration.com', 3);
