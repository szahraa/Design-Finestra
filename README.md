# Design Finestra Indonesia

Company profile website for **Design Finestra** — kontraktor civil, interior, dan kusen aluminium. Built with React (Vite), Tailwind CSS, Motion, and Supabase.

## Features

- Responsive hero, services, workflow, and contact sections (WhatsApp, email, Google Maps embed)
- Dynamic project gallery with lightbox preview
- Supabase Storage + `projects` table for live photos
- Admin login (Supabase Auth email/password) to upload/delete projects from any device
- Fallback placeholder projects so the site looks complete before Supabase is connected
- Lightweight scroll/hover/modal animations via `motion`

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Without Supabase credentials, the gallery uses built-in placeholder data.

## Environment variables

Copy `.env.example` to `.env` and fill in your Supabase project values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Find these under **Supabase Dashboard → Project Settings → API**.

## Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor**, paste and run the full contents of [`supabase-setup.sql`](./supabase-setup.sql).
   - Creates `public.projects`
   - Creates public storage bucket `project-photos`
   - Configures RLS: public read; authenticated insert/update/delete
3. Create an admin user: **Authentication → Users → Add user** (email + password).
4. Put the project URL and **anon** key into `.env` (local) and Vercel env vars (production).
5. Restart `npm run dev`. Log in via the **Admin** control in the navbar, then upload project photos.

### Categories used by the UI

- `Civil`
- `Interior`
- `Kusen Aluminium`

## Vercel deployment

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project in [Vercel](https://vercel.com) — framework preset **Vite** is detected automatically.
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. Build command: `npm run build` · Output directory: `dist`.

Verify locally before deploy:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/     # Navbar, Hero, Services, Gallery, Lightbox, Workflow, Contact, Footer, AdminModal
  lib/            # supabase client, fallback projects, company constants
  App.jsx
  index.css       # Tailwind + brand tokens (navy / gold)
supabase-setup.sql
.env.example
```

## Contact (site content)

- WhatsApp: `0878-8227-5560`
- Address: RT.006/RW.002, Pd. Bahar, Kec. Karang Tengah, Kota Tangerang, Banten 15159
- Instagram: [@design.finestra.id](https://www.instagram.com/design.finestra.id)

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Local development server |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
