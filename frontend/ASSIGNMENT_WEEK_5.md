# AI Prompt Engineering Learning Hub - Frontend Documentation

**Assignment: Week  - Frontend Development**

This document provides a comprehensive overview of the frontend application built for the AI Prompt Engineering Learning Hub.

---

## 🚀 Project Overview

The AI Prompt Engineering Learning Hub is an interactive, gamified educational platform designed to teach users how to effectively engineer prompts for Large Language Models (LLMs). The frontend is built as a Single Page Application (SPA) focusing on a rich, responsive, and engaging user experience.

### Key Features Implemented:
1. **Authentication Flow:** Login and Registration pages with protected routing.
2. **Student Dashboard:** Personalized progress tracking, XP points, and active learning modules.
3. **Interactive Playground:** Real-time AI prompt evaluation simulator with multi-tab feedback (Score, Diagnostic Feedback, Optimized Output).
4. **Gamified Challenges:** Reverse-engineering prompt challenges with a community leaderboard.
5. **Prompt Marketplace:** A hub to discover, share, and export community-created enterprise-grade prompts.
6. **Admin Panel:** Comprehensive dashboard for managing users, modules, and marketplace content with data visualization.

---

## 🛠️ Technology Stack

- **Framework:** [React.js](https://react.dev/) (v18) initialized via [Vite](https://vitejs.dev/) for fast compilation and Hot Module Replacement (HMR).
- **Routing:** [React Router v6](https://reactrouter.com/) for declarative client-side routing and protected routes.
- **State Management:** [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) for global state management (specifically Authentication state).
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first, mobile-responsive styling.
- **Icons:** [Lucide React](https://lucide.dev/) for clean, consistent SVG iconography.
- **Data Visualization:** [Recharts](https://recharts.org/) for rendering the Admin Analytics charts.

---

## 📁 Project Structure

The project follows a modular, feature-based directory structure inside `src/`:

```text
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Navbar, ProtectedRoute)
│   ├── layouts/            # Page wrappers (MainLayout, AdminLayout)
│   ├── pages/              # Route-level components
│   │   ├── AdminPanel.jsx      # Phase 5: Admin dashboard
│   │   ├── Challenges.jsx      # Phase 4: Gamified challenges
│   │   ├── Dashboard.jsx       # Phase 3: Student hub
│   │   ├── Marketplace.jsx     # Phase 4: Community prompts
│   │   ├── Playground.jsx      # Phase 4: AI Prompt editor & feedback
│   │   └── ...
│   ├── store/              # Redux setup and slices
│   │   ├── slices/
│   │   │   └── authSlice.js    # JWT Authentication state handling
│   │   └── store.js
│   ├── App.jsx             # Main routing configuration
│   ├── index.css           # Global styles and Tailwind directives
│   └── main.jsx            # Application entry point
├── package.json
├── tailwind.config.js      # Tailwind theme extensions (colors, fonts)
└── vite.config.js          # Vite bundler configuration
```

---

## 🎨 Design System & Styling

The application uses a strict design system defined in `tailwind.config.js` to ensure visual consistency:

- **Primary Color:** `#2563EB` (Blue-600) - Used for primary actions and highlights.
- **Dark Mode/Base:** `#0F172A` (Slate-900) - Used for strong contrast buttons and headers.
- **Success/Warning/Danger:** Semantic colors mapped to Emerald, Amber, and Red respectively.
- **Typography:** Uses standard clean sans-serif stacks optimized for readability.
- **Responsiveness:** Built mobile-first. Uses Tailwind breakpoints (`sm:`, `md:`, `lg:`) to adapt layouts from mobile screens up to wide desktops.

---

## 🚦 Routing & Security

Routing is handled centrally in `App.jsx`. Security is enforced on the client side using wrapper components:

- `<ProtectedRoute />`: Ensures the user has a valid authentication token in Redux state before accessing student pages (Dashboard, Modules, Playground). Redirects to `/login` if unauthorized.
- `<AdminRoute />`: Verifies that the authenticated user possesses the `admin` role before granting access to the `/admin` routes.

---

## 💻 Setup & Installation Instructions

To run this project locally and test all features (including Authentication and Admin panels), you must run both the backend and frontend servers.

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd ../backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ai_prompt_hub
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

Seed the database (this generates the default Admin account) and start the server:
```bash
npm run seed
npm run dev
```

### 2. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

---

## 🔑 Default Admin Credentials

To access the **Admin Panel** (`/admin`), you must use an account with the `admin` role. You can log in using the following credentials generated by the backend seed script:
* **Email:** `admin@teem01.com`
* **Password:** `AdminPass123!`