# KBS Movie Recommender - Frontend

Web app for the **Knowledge-Based System (KBS) Movie Recommender**: browse movies, get personalized recommendations, and manage your preferences. Built with Next.js and React.

---

## Features

- **Auth** — Email/password sign up and login, email verification, and Google sign-in
- **Home** — Featured hero plus rows for Popular, Recommended, and New movies (from the KBS backend)
- **Movies** — Grid of latest releases with infinite scroll; movie detail pages with overview and metadata
- **Recommendations** — Personalized picks with scores and reasons (rule-based KBS)
- **Settings** — Update preferences (genres, languages, year range, etc.) that drive recommendations
- **Onboarding** — Optional flow for new users to set initial preferences

---

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19, TypeScript |
| **Styling** | Tailwind CSS 4 |
| **State** | React Context (auth), hooks for data |

---

## Prerequisites

The frontend talks to the **KBS backend API**. You need the backend running (locally or deployed) and its base URL for the env variable below.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env.local` in the project root (or set these in your host’s dashboard, e.g. Vercel):

| Variable | Description | Example |
|----------|-------------|--------|
| `NEXT_PUBLIC_API_URL` | Base URL of the KBS backend API | `http://localhost:4000` or `https://api.yourdomain.com` |

**Example `.env.local`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

For production (e.g. Vercel), use your deployed backend URL. No trailing slash.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll be redirected to `/auth` if not logged in.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) at [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `npm run build`) |
| `npm run lint` | Run ESLint |

---

## Project structure

```
app/
  auth/           # Login, register, Google OAuth callback, confirm-email
  movies/         # Home rows, grid, movie detail [id]
  onboarding/     # New-user preferences
  settings/       # User preferences form
components/       # AppShell, StickyHeader
context/          # AuthContext (user, login, logout)
hooks/            # useMovies, useInfiniteMovies, usePreferences
lib/              # API clients (moviesApi, preferencesApi, movieDetailsApi), utils
types/            # TypeScript types (auth, movie)
utils/            # apiFetch (base URL, auth header, errors)
```

Protected routes (e.g. home, movies, settings) use `useRequireAuth` and redirect guests to `/auth`. All API requests use `NEXT_PUBLIC_API_URL` and send the JWT in the `Authorization` header when the user is logged in.

---

## Deploy (Vercel)

1. Push the repo to GitHub and import the project in [Vercel](https://vercel.com).
2. Set **Environment Variable**: `NEXT_PUBLIC_API_URL` = your backend URL (e.g. `https://api.idyzer.com`).
3. Deploy. The frontend will call your backend for auth, movies, and recommendations.

For Google sign-in to work in production, the backend must have `FRONTEND_URL` set to your Vercel URL (e.g. `https://your-app.vercel.app`) and the Google OAuth client must list that origin and the backend callback URL as authorized.

---

## Related

- **Backend API** — [kbs-project-backend](https://github.com/andong77/kbs-project-backend): Express, Prisma, PostgreSQL, rule-based movie recommendations and auth.
