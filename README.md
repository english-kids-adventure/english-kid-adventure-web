# 📚 English Kid Adventure

A modern web application for an English learning platform for children, built with high performance and a scalable feature-based architecture.

---

## 📝 Commit Format Convention

To maintain a clean and traceable project history, please follow this format for all commits:

```
[id subtask] | name subtask
```

**Example:**
```
VLIST-1 | Create front-end folder
```

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | v19.2.0 | JavaScript library for building component-based user interfaces |
| **Vite** | v7.2.4 | Fast frontend tool with significantly leaner development experience |
| **Tailwind CSS** | v4.1.18 | Utility-first CSS framework with built-in Vite integration |
| **TypeScript** | v5.9.3 | Static typing to improve code quality and developer productivity |
| **Zustand** | v5.0.9 | Small, fast, and scalable state-management solution |
| **TanStack Query** | v5.90.12 | Powerful async state management for data fetching and caching |
| **React Router Dom** | v7.11.0 | Standard routing library for client-side navigation |
| **Axios** | v1.13.2 | Promise-based HTTP client for API requests |
| **Lucide React** | v0.562.0 | Beautiful and consistent icon library |
| **ESLint** | v9.39.2 | Code quality and style consistency tool |
| **Husky & lint-staged** | Latest | Git hooks for pre-commit linting automation |

---

## 📂 Project Structure

The project follows a **Feature-based architecture** for maintainability and scalability as the application grows.

```
src/
├── assets/                  # Static assets (images, fonts, icons)
├── features/                # Business logic modules (Domain-driven)
│   └── auth/                # Authentication feature
│       ├── components/      # Login/Register UI components
│       ├── hooks/           # Auth-specific custom hooks
│       ├── services/        # Auth-related API calls
│       └── types/           # Auth-specific TypeScript definitions
│   ├── leaderboard/         # Leaderboard features
│   ├── learning/            # Learning content and activities
│   ├── profile/             # User profile management
│   └── quiz/                # Quiz and assessment logic
├── lib/                     # Third-party library configurations
│   └── axios.ts             # Axios configuration
├── pages/                   # Page-level components (associated with routes)
├── routes/                  # Route definitions and navigation logic
│   └── AppRoutes.tsx
├── shared/                  # Reusable resources across features
│   ├── components/          # Shared UI components
│   │   ├── Common/          # Common components
│   │   ├── Layouts/         # Layout wrappers
│   │   ├── Header/          # Header component
│   │   └── Sidebar/         # Sidebar component
│   ├── constants/           # Global constants and API endpoints
│   ├── hooks/               # Global custom React hooks
│   ├── services/            # Shared business logic and API services
│   ├── types/               # Global TypeScript interfaces
│   └── utils/               # Utility helper functions
├── store/                   # Global state (Zustand)
│   └── useAuthStore.ts      # Authentication store
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
```

---

## 🚀 Getting Started

### 1️⃣ Installation

Install all project dependencies:

```bash
npm install
```

### 2️⃣ Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3️⃣ Build for Production

Create an optimized production build:

```bash
npm run build
```

### 4️⃣ Linting

Check for code style and quality issues:

```bash
# Check for errors
npm run lint

# Automatically fix errors
npm run lint:fix
```

### 5️⃣ Preview Production Build

Preview the production build locally before deployment:

```bash
npm run preview
```

---

## 🛠 Project Configuration

- **Environment Variables:** Managed via `.env` file
- **Git Hooks:** Pre-commit hooks enabled via Husky to run ESLint on staged files
- **Code Formatting:** ESLint and TypeScript configurations strictly enforced for consistency

---

## 📌 Key Features

✅ Feature-based modular architecture  
✅ Fast development with Vite  
✅ Type-safe with TypeScript  
✅ Powerful state management with Zustand  
✅ Automatic code quality checks with Husky  
✅ Beautiful UI with Tailwind CSS v4  

---

