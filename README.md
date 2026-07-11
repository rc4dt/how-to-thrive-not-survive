# How to thrive not survive

A Y2K pink personal blog built with Next.js, TinaCMS, and Tailwind CSS.

Posts live in `content/posts/` as MDX files. Edit them visually at `/admin` via [Tina Cloud](https://app.tina.io), which commits changes back to GitHub. The site deploys to Vercel.

## Stack

- **Next.js App Router** — pages, layouts, RSS
- **TinaCMS + Tina Cloud** — visual editor, Git-backed content
- **Tailwind CSS v4** — Y2K pink design system
- **Vercel** — hosting and preview deploys

## Local development

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Start the dev server (runs Tina + Next.js together):

```bash
npm run dev
```

4. Open the site at [http://localhost:3000](http://localhost:3000)

5. Open the CMS at [http://localhost:3000/admin](http://localhost:3000/admin)

The site reads posts from the filesystem locally, so it works even before Tina Cloud is configured. Visual editing and Tina Cloud sync require credentials below.

## Tina Cloud setup

1. Push this repo to GitHub.
2. Create a project at [app.tina.io](https://app.tina.io) and connect your repository.
3. Set the branch to `main`.
4. Ensure `tina/tina-lock.json` is committed — Tina Cloud uses it to index your schema.
5. Copy these values into `.env.local` and Vercel:

```bash
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_read_token
NEXT_PUBLIC_TINA_BRANCH=main
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

6. In Tina Cloud, confirm the branch is indexed after the first push.

## Deploy to Vercel

1. Import the GitHub repository in [Vercel](https://vercel.com).
2. Add the environment variables from `.env.example`.
3. Deploy — the default build command is:

```bash
npm run build
```

4. Optional: add a Tina Cloud deploy webhook in Vercel for faster rebuilds after publishing.

## Project structure

```
app/                 Next.js routes (home, blog, about, RSS)
components/          Y2K UI components
content/posts/       Blog posts (MDX)
content/pages/       Static pages (MDX)
lib/                 Content helpers and site config
public/uploads/      Media uploaded through Tina
tina/                TinaCMS schema and config
```

## Writing posts

Create or edit posts in Tina at `/admin`, or add MDX files manually under `content/posts/`:

```mdx
---
title: My post title
date: 2026-07-11T12:00:00.000Z
excerpt: A short summary for the index page.
tags:
  - personal
draft: false
---

Your post content here in Markdown.
```

Posts with `draft: true` are hidden in production.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Tina dev server + Next.js dev |
| `npm run build` | Tina build + Next.js production build |
| `npm run build:local` | Local Tina build (no cloud checks) + Next.js build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |

## Routes

| Route | Description |
|-------|-------------|
| `/` | Blog index |
| `/blog/[slug]` | Individual post |
| `/about` | About page |
| `/feed.xml` | RSS feed |
| `/admin` | Tina CMS editor |
