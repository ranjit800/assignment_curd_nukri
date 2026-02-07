# Frontend App

React + TypeScript user management interface.

## Quick Start

Install dependencies:
```bash
npm install
```

Create a `.env` file:
```
VITE_API_URL=http://localhost:3001
```

Start dev server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## What's Inside

- **React 19** - UI framework
- **TypeScript** - Type checking
- **Material-UI** - Components and design
- **React Hook Form** - Form handling
- **Zod** - Form validation
- **React Query** - Data fetching
- **Axios** - API calls
- **Vite** - Build tool

---

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared components
│   └── users/           # User-specific stuff
├── config/
│   └── formSchema.ts    # Form config (this is where extensibility happens!)
├── hooks/
│   └── useUsers.ts      # Data fetching hooks
├── services/
│   └── api.ts           # API calls
└── types/
    └── user.types.ts    # TypeScript types
```

---

## Features

- Create, read, update, delete users
- Form validation
- Mobile responsive
- Easy to add new fields (see ADDING_NEW_FIELDS.md)
- Full TypeScript support

---

## Environment Variables

You only need one:

| Variable | What it does | Example |
|----------|--------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3001` |

---

## Deploying to Vercel

1. Push to GitHub
2. Go to Vercel and import your repo
3. Add environment variable:
   - **Name:** `VITE_API_URL`
   - **Value:** Your Render backend URL
4. Deploy

Vercel auto-detects Vite projects, so no extra config needed.

---

## Adding New Fields

Check out `ADDING_NEW_FIELDS.md` in the root folder for step-by-step instructions.

Quick version:
1. Add field to `src/types/user.types.ts`
2. Add config to `src/config/formSchema.ts`
3. Add validation to `src/config/formSchema.ts`
4. Done - form renders automatically!

---

## Available Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

---

## Customization

**Theme:** Edit `src/styles/theme.ts` for colors and styles

**Validation:** Modify rules in `src/config/formSchema.ts`

**API:** Change endpoints in `src/services/api.ts`

---

**Author:** Ranjit Jana  
**Email:** jranjit367@gmail.com
