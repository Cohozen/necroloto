# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

**Necroloto** is a social betting game where users form "circles" (groups) and place bets on celebrities. Points are scored as celebrities die.

### Stack

- **Next.js 16** with App Router and React 19
- **Clerk** (`@clerk/nextjs`) for authentication
- **HeroUI** (`@heroui/react`) for UI components
- **Tailwind CSS v4** — uses the new Rust/oxide engine via `@tailwindcss/postcss`; no `tailwind.config.*` file, configuration lives in CSS
- **Separate NestJS backend** — see `docs/necroloto-api.json` (OpenAPI spec) for all endpoints

### External APIs
- Necroloto API spec: `docs/necroloto-api.json` (OpenAPI 3.0)

### Key domains (from API spec)

- **Users** — Clerk-integrated user profiles
- **Celebrities** — searchable database with birth/death data
- **Bets** — users select celebrities within a circle; points awarded on death
- **Circles** — social groups with membership, rankings, and activity feeds

### UI/UX
Use HeroUI React documentation from https://heroui.com/react/llms.txt

### Code style

Prettier is configured (`.prettierrc`): 4-space indentation, double quotes, 100-char line width. ESLint uses `eslint-config-next` with TypeScript rules. Path alias `@/*` maps to the repo root.
