# FDS Enquiries — admin app (PWA)

Separate Next.js app in this repo. Shares only the Supabase database with the public site.
Works as a website (desktop) and as an installable app (phone).

## Setup
1. Create a Supabase project. Run [supabase/schema.sql](./supabase/schema.sql) in the SQL editor.
2. Supabase → Authentication → disable "Allow new users to sign up", then **Add user** for the client (email + password).
3. `cp .env.example .env.local` and fill it in. Generate push keys with `npx web-push generate-vapid-keys`.
4. `npm install && npm run dev` → http://localhost:3001

## Deploy (e.g. Vercel)
- New project, **Root Directory = `admin`**, domain such as `admin.finaldraftstudios.com` (HTTPS is required for install + push).
- Add the env vars from `.env.example`.

## Connect the public website
Add to the **public site's** env (root project):
```
SUPABASE_URL=<same project URL>
SUPABASE_SERVICE_ROLE_KEY=<service role key>
ADMIN_URL=https://admin.finaldraftstudios.com
NOTIFY_SECRET=<same value as the admin app>
```
`/api/enquire` saves the enquiry, then calls the admin `/api/notify` to send push + email.

## Installing on a phone
- **Android (Chrome):** open the URL → menu → *Install app*.
- **iPhone (Safari):** open the URL → Share → *Add to Home Screen*. Open it from the Home Screen, then tap **Enable alerts**.
- **Desktop:** log in at the URL; optionally click the install icon in the address bar.
