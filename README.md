# Sanskriti Pre School — Mobile App

Cross-platform mobile app (iOS, Android, Web) for **Sanskriti Pre School, Vijayapura**. Multi-role client (`admin`, `teacher`, `parent`) consuming the shared backend API.

> **For AI agents:** Read this file, `DESIGN.md`, and `../analysis_and_roadmap.md` before coding. Use branded UI components (`SButton`, `SInput`, etc.) and theme tokens only — never hard-code colors. See [AI Agent Handoff](#ai-agent-handoff).

---

## Vision & Product Context

| Item | Detail |
|------|--------|
| **School** | Sanskriti Pre School (Sanskriti Vidya Samsthe), Vijayapura |
| **App name** | Sanskriti Pre School (`com.sanskritipreschool.app`) |
| **Backend** | `../School-backend` — `http://localhost:3000/api/v1` |
| **Web portal** | `../School-frontend` — same API, cookie auth |
| **Master roadmap** | `../analysis_and_roadmap.md` |
| **Design system** | **Academic Warmth** — see `DESIGN.md` |

One app, three role portals. After login, routing switches entirely based on `user.roles[0]`.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Expo 57 + React Native 0.86 |
| Language | TypeScript |
| Routing | Expo Router 57 (file-based) |
| Auth storage | expo-secure-store (localStorage on web) |
| Animation | react-native-reanimated 4 |
| Images | expo-image |
| Fonts | Hanken Grotesk + Source Sans 3 (`@expo-google-fonts/*`) |
| Docs | [Expo v57](https://docs.expo.dev/versions/v57.0.0/) — read before writing Expo code |

---

## Project Structure

```
src/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root: fonts, auth provider, route guard
│   ├── index.tsx                 # Redirect → role home or login
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (parent)/
│   │   ├── home.tsx              # Parent dashboard (placeholder)
│   │   └── profile.tsx
│   ├── (teacher)/
│   │   ├── home.tsx
│   │   └── profile.tsx
│   └── (admin)/
│       ├── home.tsx
│       └── profile.tsx
├── components/
│   ├── ui/                       # Branded design system components
│   │   ├── SButton.tsx
│   │   ├── SInput.tsx
│   │   ├── SText.tsx
│   │   ├── SCard.tsx
│   │   ├── SChip.tsx
│   │   └── SDivider.tsx
│   └── RoleHomeScreen.tsx        # Shared role dashboard placeholder
├── screens/
│   └── ProfileScreen.tsx         # Profile, password reset, sign out
├── context/
│   └── auth-context.tsx          # Auth state + login/register/logout
├── utils/
│   ├── api.ts                    # API client, token storage, refresh
│   └── auth-routing.ts           # Role → route mapping
├── constants/
│   ├── theme.ts                  # Single source of truth for design tokens
│   └── animations.ts             # Reanimated timings/springs
├── hooks/
│   └── use-theme.ts              # useThemeColors()
└── global.css                    # Web font imports
```

---

## API Configuration

**Base URL** (`src/utils/api.ts`):

| Platform | URL |
|----------|-----|
| iOS Simulator / Web | `http://localhost:3000/api/v1` |
| Android Emulator | `http://10.0.2.2:3000/api/v1` |
| Physical device | Set `DEV_HOST` to your machine's LAN IP |

**Auth:** `Authorization: Bearer <accessToken>` on all protected requests. Tokens stored in SecureStore. Auto-refresh on 401 via `PATCH /users/refresh-token`.

**Key endpoints used:**
```
PATCH  /users/login
POST   /users/register
PATCH  /users/logout
PATCH  /users/refresh-token
PATCH  /users/reset-password
PATCH  /users/update-user
GET    /users/children/:id        # Phase 2
GET    /parents/get-children      # Phase 2
GET    /diary/get-diary           # Phase 2
GET    /notice/                   # Phase 2
GET    /attendance/get-attendances # Phase 2
```

Full API reference: `../School-backend/README.md`

---

## Design System — Academic Warmth

**Read `DESIGN.md` before building any screen.**

| Rule | Detail |
|------|--------|
| Colors | Import via `useThemeColors()` — never hard-code hex |
| Typography | Use `<SText variant="...">` — never raw `<Text>` |
| Inputs | Use `<SInput>` with label above field |
| Buttons | `primary` = cocoa brown, `secondary` = bordered, `ghost` = goldenrod text |
| Spacing | Use `Spacing.*` from `theme.ts` (8px base unit) |
| Cards | Use `<SCard>` — white, 16px radius, warm shadow |
| Chips | Use `<SChip>` for role selectors, grade tags |

Brand constants: `Brand.schoolName`, `LogoPath` in `theme.ts`.

---

## Routing & Auth Flow

```
App launch
  → validateStoredSession() (refresh token check)
  → if no user → /(auth)/login
  → if user    → /(parent|teacher|admin)/home based on roles[0]

Login success → getRoleHomePath(role) → role-specific tab layout
Logout        → clear SecureStore → /(auth)/login
```

Role helpers: `src/utils/auth-routing.ts`
- `getUserPrimaryRole(user)`
- `getRoleHomePath(role)`
- `getRoleGroup(role)`
- `getRoleLabel(role)`

---

## Setup & Run

**Prerequisites:** Backend running on port 3000 (`School-backend`).

```bash
cd School-App
npm install
npx expo start
```

| Target | Command |
|--------|---------|
| Android emulator | Press `a` or `npm run android` |
| iOS simulator | Press `i` or `npm run ios` |
| Web browser | Press `w` or `npm run web` → `http://localhost:8081` |

**Backend CORS** must allow `http://localhost:8081` for web testing (already configured in backend).

**Physical device:** Update `DEV_HOST` in `src/utils/api.ts` to your PC's local IP (e.g. `192.168.1.5`).

---

## Phase Status

### Phase 1 — Core Setup & Authentication ✅ COMPLETE

- [x] Auth client (login, register, logout, token refresh)
- [x] Secure token storage (SecureStore / localStorage)
- [x] Splash screen + loading state on launch
- [x] Session validation via refresh token on startup
- [x] Role-based routing `(parent) / (teacher) / (admin)`
- [x] Tab navigation (Home + Profile) per role
- [x] Login & Register screens (Academic Warmth design)
- [x] Profile screen (view info, edit name/phone, change password)
- [x] Branded UI component library (`SButton`, `SInput`, etc.)
- [x] Native fonts (Hanken Grotesk + Source Sans 3)
- [x] Role home placeholders with upcoming feature list

### Phase 2 — Parent Portal & Communication 🔲 NEXT

- [ ] Child dashboard — linked profiles, grades, birthdates
- [ ] Daily diary/homework reader (categories: homework, notice, event)
- [ ] Notice board reader with attachment download
- [ ] Attendance calendar (monthly present/absent view)

**Suggested file additions:**
```
src/app/(parent)/children.tsx
src/app/(parent)/diary.tsx
src/app/(parent)/notices.tsx
src/app/(parent)/attendance.tsx
src/screens/parent/ChildDashboardScreen.tsx
src/api/parent.ts                    # API wrappers
```

### Phase 3 — Teacher Portal & Operations 🔲

- [ ] Geofenced check-in (expo-location → `POST /attendance/add-attendance`)
- [ ] Class attendance marking by grade/division
- [ ] Diary/homework creator with expiry dates
- [ ] Photo gallery event uploader (expo-image-picker)

### Phase 4 — Admin Portal & System Settings 🔲

- [ ] Pending registration approval queue
- [ ] Student enrollment form (auto `sid` generation)
- [ ] School calendar & academic year config
- [ ] Admin notice board manager with PDF upload

---

## Implementation Guidelines

1. **Design first** — Every new screen uses `SText`, `SInput`, `SButton`, `SCard`, `useThemeColors()`.
2. **API layer** — Add endpoints to `src/utils/api.ts` or create `src/api/<domain>.ts`; never raw fetch in screens.
3. **Auth** — Use `useAuth()` from `auth-context.tsx`; protected screens live inside role groups.
4. **Routing** — New parent screens go under `src/app/(parent)/`; update tab `_layout.tsx`.
5. **Types** — Extend `AuthUser` interface as user fields grow.
6. **Platform** — Test on Android emulator (`10.0.2.2`) and web (`localhost:8081`); handle Platform-specific API URLs.
7. **Minimal diffs** — Match existing patterns; don't refactor unrelated code.
8. **Expo docs** — Check [Expo v57 docs](https://docs.expo.dev/versions/v57.0.0/) before using new APIs.
9. **Shared API** — Backend changes must not break `School-frontend` (web client).

---

## Cross-Client Status

| Feature | Mobile (`School-App`) | Web (`School-frontend`) |
|---------|----------------------|-------------------------|
| Auth | ✅ Phase 1 | ✅ |
| Role routing | ✅ Tab layouts | ✅ Route layouts |
| Profile | ✅ Full screen | ⚠️ Partial |
| Parent diary/children | 🔲 Phase 2 | ⚠️ Scaffolded |
| Teacher attendance | 🔲 Phase 3 | ⚠️ Scaffolded |
| Admin approvals | 🔲 Phase 4 | ⚠️ Scaffolded |

---

## AI Agent Handoff

Copy into a new AI chat:

```
You are working on Sanskriti Pre School MOBILE app (School-App/).

READ FIRST (in order):
1. School-App/README.md
2. School-App/DESIGN.md          ← Academic Warmth design system (mandatory)
3. ../analysis_and_roadmap.md    ← Product roadmap & phasing
4. ../School-backend/README.md   ← API reference

Stack: Expo 57, React Native, TypeScript, Expo Router, Reanimated.
API: http://localhost:3000/api/v1 (see src/utils/api.ts for platform URLs)
Auth: Bearer token in SecureStore; auth-context.tsx for state.

Design rules (NON-NEGOTIABLE):
- Use SButton, SInput, SText, SCard, SChip from @/components/ui
- Use useThemeColors() and Spacing/Radii/Typography from @/constants/theme
- Never hard-code colors, font sizes, or spacing
- Follow Academic Warmth: cocoa brown primary actions, goldenrod accents, alabaster cream surfaces

Routing:
- Auth screens: src/app/(auth)/
- Role screens: src/app/(parent|teacher|admin)/
- Shared screens: src/screens/
- Role helpers: src/utils/auth-routing.ts

Current phase: [1 complete | 2 in progress]
Current focus: [DESCRIBE TASK, e.g. "Build parent children dashboard using GET /parents/get-children"]

Rules:
- Minimal focused diffs
- API calls in utils/api.ts or src/api/*.ts
- Login = PATCH /users/login, Register = POST /users/register
- Test on web (localhost:8081) with backend on port 3000

Before coding: read DESIGN.md and the target role's _layout.tsx.
After coding: npx tsc --noEmit, test login flow still works.
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Failed to fetch` on web | Backend CORS must include `http://localhost:8081`; restart backend |
| Cannot connect on Android | Use `10.0.2.2` in api.ts; ensure backend runs on host machine |
| Cannot connect on physical device | Set `DEV_HOST` to PC LAN IP; same Wi-Fi network |
| `Invalid role provided for login` | Account exists but wrong role selected at login |
| Session lost on restart | Refresh token expired; check backend `REFRESH_TOKEN_EXPIRY` |
| `boxShadow` warning on web | Fixed in theme.ts Elevation — use `Elevation.sm` not raw shadow props |
| MongoDB backend crash | Atlas connection issue — not app-related; see backend README |

---

## Scripts

```bash
npm start          # Expo dev server
npm run android    # Open Android emulator
npm run ios        # Open iOS simulator
npm run web        # Open in browser (port 8081)
npm run lint       # ESLint via Expo
npx tsc --noEmit   # TypeScript check
```

---

## Related Files

| File | Purpose |
|------|---------|
| `DESIGN.md` | Full design system spec (colors, typography, components) |
| `app.json` | Expo config, splash, bundle IDs |
| `AGENTS.md` / `CLAUDE.md` | Points agents to Expo v57 docs |
| `../analysis_and_roadmap.md` | Master product roadmap |
| `../School-backend/README.md` | Backend API docs |
| `../School-frontend/readme.md` | Web frontend docs |

---

**Maintainer note:** Update Phase status checkboxes as features ship. Keep cross-client table in sync with web README.
