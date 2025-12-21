# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


## 📦 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky)
- [lint-staged](https://github.com/okonet/lint-staged)


## Structure of source FE
```
src/
├── assets/                          # Multimedia resources (Images, Icons, Sounds)
│
├── features/                        # Main feature-based modules
│   ├── auth/                        # Authentication feature
│   │   ├── components/              # Feature-specific components (LoginForm, RegisterForm)
│   │   ├── hooks/                   # Custom hooks for Auth logic (useAuth)
│   │   ├── services/                # API service calls for Auth (authService)
│   │   └── types/                   # Type definitions for the Auth module
│   ├── leaderboard/                 # Leaderboard feature
│   ├── learning/                    # Lessons & Video features
│   ├── profile/                     # User profile feature
│   └── quiz/                        # Interactive quiz/exercise feature
│
├── lib/                             # Third-party library configurations
│   └── axios.ts                     # Axios Instance and Interceptors setup
│
├── pages/                           # Main application views (Pages)
│   ├── LoginPage.tsx                # Login page view
│   └── RegisterPage.tsx             # Registration page view
│
├── routes/                          # Navigation and Routing management
│   └── AppRoutes.tsx                # Main application routing configuration
│
├── shared/                          # Global shared resources
│   ├── components/                  # Common UI Components (Header, Footer)
│   ├── constants/                   # System-wide constants and configurations
│   ├── guards/                      # Route guards (AuthGuard - Access control)
│   ├── hooks/                       # Shared custom hooks
│   ├── layouts/                     # Main layout structures (MainLayout)
│   ├── types/                       # Shared TypeScript interfaces/types
│   └── utils/                       # Helper and utility functions
│
└── store/                           # Global state management (Zustand)
    └── useAuthStore.ts              # Manages login state and user information
```
## Format commit
"[id subtask] | name subtask"
Ex: VLIST-1 | Create front-end folder