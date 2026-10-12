# Claude UI Clone

React + Vite UI clone of the Claude.ai product shell. Full interface behavior is local only — no Anthropic API.

## Features

- **Dark / light / system** theme (Settings → General)
- Sidebar: New, Projects, Artifacts, Code (+ Upgrade), Customize, chats & tasks
- Chat welcome + composer with local replies
- Projects, Artifacts, Code, Customize (Skills / Connectors / Plugins)
- Plans / Upgrade (Individual Free·Pro·Max, Team & Enterprise)
- Settings modal with all panels: General, Account, Privacy, Billing, Capabilities, Memory, Reflect, Time and focus, Claude Code, Skills, Connectors, Plugins
- Responsive layout
- State persisted in `localStorage` (`claude-ai-clone-v1`)

## Setup

```bash
cd claude
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server (`--host`) |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |

## Stack

- React 18
- Vite 5
- lucide-react

## Notes

- No API keys or live model calls
- Chats, projects, artifacts, prefs are user-created and stored locally
