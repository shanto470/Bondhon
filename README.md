# Bondhon

A community platform where neighbours create, join and manage social service events: winter clothes drives, blanket distributions, cleanups, plantations and more.

**Live site:** https://bondhon-cs.vercel.app  
**API:** https://bondhon-api.vercel.app  

## Features

- Email and password sign-up with validation (uppercase, lowercase, 6+ characters), plus Google login
- Create events with a type, photo, place and a future-only date, with form validation
- Upcoming Events page that hides past events automatically, with search and type filter
- Join an event with one click, see it under Joined Events (sorted by date) and leave if plans change
- Manage Events page where only the creator can edit or delete an event
- JWT-protected API: Better Auth issues the token, the Express server verifies it against the JWKS
- Light and dark theme toggle, loading skeletons, and a profile page to update your name and photo


Tech: Next.js (App Router), TypeScript, Tailwind + daisyUI, Better Auth (MongoDB adapter, JWT), Express, MongoDB.
