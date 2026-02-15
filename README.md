# Smart Bookmark App

A small realtime bookmark manager built as part of a fullstack screening challenge.

The goal of this project was to keep the implementation simple while focusing on
authentication, secure data handling, and realtime updates across tabs.

---

## Features

- Google OAuth authentication using Supabase
- Private bookmarks using Row Level Security (RLS)
- Add and delete bookmarks
- Realtime updates between browser tabs
- Minimal dashboard UI with search and filters
- Server Actions for mutations

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Vercel (Deployment)

---

## Architecture Notes

I intentionally kept the architecture server-driven:

- Authentication is validated server-side instead of relying on middleware.
- Bookmarks are fetched on the server to keep data secure.
- Mutations are handled using Server Actions.
- Realtime is implemented with a small client listener that triggers `router.refresh()` rather than managing complex client state.

The idea was to avoid over-engineering and keep things readable.

---

## Database

Table: `bookmarks`

Fields:
- id
- user_id
- title
- url
- created_at

RLS policies ensure that each user can only access their own bookmarks.

---

## Realtime

Supabase Realtime listens to changes on the `bookmarks` table.
When a change happens, the dashboard refreshes automatically so multiple tabs stay in sync.

---

## Challenges Faced

- Configuring OAuth redirects correctly between local and production environments.
- Enabling realtime publication for the bookmarks table.
- Keeping realtime updates simple without moving all data logic to the client.

---

## Running Locally

```bash
npm install
npm run dev
