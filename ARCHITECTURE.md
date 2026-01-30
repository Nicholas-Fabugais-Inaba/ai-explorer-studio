# AI Academy - Architecture & File Structure

This document provides a comprehensive overview of the AI Academy codebase, explaining the purpose of each directory and file, and how different components work together.

## 📁 Project Structure Overview

```
ai-academy/
├── public/                    # Static assets served directly
├── src/                       # Main application source code
│   ├── assets/               # Media assets (videos, images)
│   ├── components/           # React components
│   │   └── ui/              # shadcn/ui base components
│   ├── data/                 # Static data and content
│   ├── hooks/                # Custom React hooks
│   ├── integrations/         # External service integrations
│   ├── lib/                  # Utility functions
│   ├── pages/                # Page components (routes)
│   └── test/                 # Test configuration and files
├── supabase/                  # Backend configuration
│   └── functions/            # Edge functions (serverless)
└── configuration files       # Vite, TypeScript, Tailwind, etc.
```

---

## 🎯 Core Application Files

### Entry Points

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point, loads the React app |
| `src/main.tsx` | React entry point, renders App component |
| `src/App.tsx` | Root component with routing and providers |
| `src/App.css` | Global CSS animations and styles |
| `src/index.css` | Tailwind CSS directives and design tokens |

### Pages (`src/pages/`)

| File | Purpose |
|------|---------|
| `Index.tsx` | Main landing page with all sections (hero, modules, footer) |
| `NotFound.tsx` | 404 error page |

---

## 🧩 Components (`src/components/`)

### Feature Components

| Component | Purpose | Key Dependencies |
|-----------|---------|------------------|
| `Header.tsx` | Top navigation bar with logo and resource links | `NavLink`, `ResourcesDrawer` |
| `HeroSection.tsx` | Landing hero with intro button and features | `VideoModal` |
| `ModuleGrid.tsx` | Displays learning module cards | `ConceptViewer`, `learningData` |
| `ConceptViewer.tsx` | Modal for viewing module content and lessons | `CodePlayground` |
| `CodePlayground.tsx` | Interactive code editor with simulated execution | `Dialog`, `Textarea` |
| `InteractivePlayground.tsx` | Standalone playground showcase section | - |
| `InfrastructureOverview.tsx` | Visual diagram of AI infrastructure concepts | - |
| `AIChatbot.tsx` | AI tutor assistant (floating chat widget) | Supabase Edge Function |
| `VideoModal.tsx` | Welcome/introduction modal with platform demo | Video asset |
| `ResourcesDrawer.tsx` | Slide-out panel with curated external resources | `Sheet` |
| `NavLink.tsx` | Reusable navigation link component | - |
| `AnalyticsScript.tsx` | Umami analytics integration | - |

### UI Components (`src/components/ui/`)

These are [shadcn/ui](https://ui.shadcn.com/) components - pre-built, accessible React components:

- `button.tsx` - Button with variants (default, hero, ghost, etc.)
- `dialog.tsx` - Modal dialogs
- `drawer.tsx` - Bottom/side drawer panels
- `card.tsx` - Content cards
- `badge.tsx` - Labels and tags
- `tabs.tsx` - Tab navigation
- `accordion.tsx` - Collapsible sections
- `textarea.tsx` - Multi-line text input
- `toast.tsx` / `sonner.tsx` - Notification toasts
- And many more...

---

## 📚 Data Layer (`src/data/`)

| File | Purpose |
|------|---------|
| `learningData.ts` | **Core curriculum content** - Contains all 6 learning modules with their concepts, code examples, and lesson structure |

### Data Structure

```typescript
// Each module contains:
interface Module {
  id: string;           // Unique identifier
  title: string;        // Display title
  description: string;  // Brief description
  icon: string;         // Icon identifier
  duration: string;     // Estimated time
  concepts: Concept[];  // Array of lessons
}

// Each concept contains:
interface Concept {
  id: string;
  title: string;
  content: string;      // Markdown content
  codeExample?: string; // Interactive code
  language?: string;    // Code language
}
```

---

## 🔧 Hooks (`src/hooks/`)

| Hook | Purpose |
|------|---------|
| `use-mobile.tsx` | Detects mobile viewport for responsive design |
| `use-toast.ts` | Toast notification management |

---

## 🔌 Integrations (`src/integrations/`)

### Supabase (`src/integrations/supabase/`)

| File | Purpose |
|------|---------|
| `client.ts` | Supabase client initialization (auto-generated) |
| `types.ts` | TypeScript types for database schema (auto-generated) |

> ⚠️ **Note**: These files are auto-generated. Do not edit manually.

---

## ⚡ Backend (`supabase/`)

### Edge Functions (`supabase/functions/`)

| Function | Purpose |
|----------|---------|
| `ai-assistant/index.ts` | AI tutor chatbot backend - handles conversation with GPT model |

### Configuration

| File | Purpose |
|------|---------|
| `config.toml` | Supabase project configuration (auto-generated) |

---

## 🎨 Styling System

### Design Tokens (`src/index.css`)

The app uses CSS custom properties for theming:

```css
:root {
  --background: 222 47% 11%;      /* Dark background */
  --foreground: 210 40% 98%;      /* Light text */
  --primary: 187 100% 50%;        /* Electric cyan accent */
  --secondary: 217 33% 17%;       /* Muted backgrounds */
  --accent: 262 83% 58%;          /* Purple accent */
  /* ... more tokens */
}
```

### Tailwind Configuration (`tailwind.config.ts`)

Extends Tailwind with:
- Custom colors mapped to CSS variables
- Animation utilities
- Typography scales

---

## 🧪 Testing (`src/test/`)

| File | Purpose |
|------|---------|
| `setup.ts` | Vitest test environment setup |
| `example.test.ts` | Example test file |

Run tests with: `npm run test`

---

## 📦 Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite bundler configuration |
| `vitest.config.ts` | Vitest test runner configuration |
| `tailwind.config.ts` | Tailwind CSS customization |
| `postcss.config.js` | PostCSS plugins (Tailwind) |
| `tsconfig.json` | TypeScript configuration |
| `tsconfig.app.json` | App-specific TypeScript config |
| `tsconfig.node.json` | Node-specific TypeScript config |
| `eslint.config.js` | ESLint linting rules |
| `components.json` | shadcn/ui component configuration |

---

## 🔄 Data Flow

```
User Action → Component → Hook/State → UI Update
                ↓
         Edge Function (if AI chat)
                ↓
         Supabase/External API
                ↓
         Response → State Update → UI
```

### Key Flows

1. **Module Learning Flow**:
   ```
   ModuleGrid → ConceptViewer → CodePlayground
   ```

2. **AI Chat Flow**:
   ```
   AIChatbot → supabase/functions/ai-assistant → GPT API → Response
   ```

3. **Analytics Flow**:
   ```
   User Action → useAnalytics hook → Umami endpoint
   ```

---

## 🚀 Adding New Features

### Adding a New Module

1. Edit `src/data/learningData.ts`
2. Add new module object to `modules` array
3. Include concepts with code examples

### Adding a New Component

1. Create file in `src/components/`
2. Use semantic Tailwind tokens (not raw colors)
3. Import and use in parent component

### Adding a New Edge Function

1. Create folder in `supabase/functions/`
2. Add `index.ts` with Deno syntax
3. Functions auto-deploy on commit

---

## 📝 Code Style Guidelines

- **Components**: PascalCase (`ModuleGrid.tsx`)
- **Hooks**: camelCase with `use` prefix (`use-mobile.tsx`)
- **Utilities**: camelCase (`utils.ts`)
- **Constants**: UPPER_SNAKE_CASE
- **CSS**: Use Tailwind semantic tokens, not raw values
- **Types**: Define interfaces for component props

---

## 🔗 External Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite](https://vitejs.dev/)
