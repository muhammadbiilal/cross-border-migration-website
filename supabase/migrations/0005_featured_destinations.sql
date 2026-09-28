-- Spain, Serbia, the Czech Republic, and Bulgaria lead the destination list.
insert into public.destinations (slug, name, region, summary, pathways, sort) values
  ('spain', 'Spain', 'Europe', 'Work and residence permits for hired roles, plus the EU Blue Card for highly qualified ones.', array['Employer-sponsored work and residence', 'EU Blue Card where the role qualifies', 'Family reunification after the main grant'], 0),
  ('czech-republic', 'Czech Republic', 'Europe', 'Employee cards for hired roles in manufacturing, logistics, construction, and technology.', array['Employee card', 'EU Blue Card where the role qualifies', 'Family members filed with the worker'], 2),
  ('bulgaria', 'Bulgaria', 'Europe', 'Single work and residence permits for hired roles, with the EU Blue Card for skilled ones.', array['Single permit for work and residence', 'EU Blue Card where the role qualifies', 'Family reunification'], 3)
on conflict (slug) do nothing;

update public.destinations set sort = case slug
  when 'spain' then 0
  when 'serbia' then 1
  when 'czech-republic' then 2
  when 'bulgaria' then 3
  when 'poland' then 4
  when 'croatia' then 5
  when 'germany' then 6
  when 'norway' then 7
  when 'united-kingdom' then 8
  when 'canada' then 9
  when 'united-states' then 10
  when 'australia' then 11
  when 'new-zealand' then 12
  else sort
end;
