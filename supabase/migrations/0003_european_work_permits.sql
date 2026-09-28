update public.services set sort = sort + 1;

insert into public.services (slug, title, summary, lead, points, sort) values
  ('european-work-permits', 'European work permits', 'Work permits for Spain, Serbia, the Czech Republic, Bulgaria, and the rest of the Schengen area.', 'Each European country runs its own permit. We match your job offer or trade to the country that hires for it, then prepare the permit file for that system.', array['Country match for your job or trade', 'Employer, contract, and qualification documents', 'Permit filing, visa appointment, and residence card after arrival'], 0)
on conflict (slug) do nothing;
