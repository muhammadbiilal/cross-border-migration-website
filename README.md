# Cross Border Migration

Immigration consultancy site: public pages plus a staff inbox for assessment requests.

## Run

```bash
npm start
```

Put the Supabase URL and anon key in `src/environments/environment.development.ts` before the contact form or `/admin` can talk to the database.

## Database

Run `supabase/migrations/0001_inquiries.sql` and `supabase/migrations/0002_content.sql` in the Supabase SQL editor. Create the staff user in the Supabase dashboard. Public sign-up stays off.

Until those keys are set, public pages use the copy in `src/app/core/data/`. After the content migration, `/admin` edits services, destinations, FAQs, testimonials, and the office contact lists.
