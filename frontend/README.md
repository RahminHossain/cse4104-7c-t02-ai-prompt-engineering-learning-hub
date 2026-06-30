# AI Prompt Engineering Learning Hub - Frontend

This is the frontend application for the **AI Prompt Engineering Learning Hub**, a comprehensive platform designed to teach users the art of prompt engineering through interactive modules, gamified challenges, and an AI-powered evaluation playground.

## 🚀 Tech Stack

- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS (Mobile-first responsive design)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **State Management:** React Context / Redux (Configured for future integration)

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── components/      # Reusable UI components (ProtectedRoute, BookmarksList, etc.)
│   ├── layouts/         # Page layouts (MainLayout, AdminLayout)
│   ├── pages/           # Route-level components
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ModulesPage.jsx
│   │   ├── Playground.jsx
│   │   ├── Marketplace.jsx
│   │   ├── Challenges.jsx
│   │   └── AdminPanel.jsx
│   ├── store/           # Redux slices and store configuration
│   ├── App.jsx          # Root application routing
│   └── main.jsx         # Application entry point
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## ✨ Key Features

1. **Student Learning Environment:** 
   - Interactive dashboard tracking XP, badges, and module progress.
   - Deep-dive learning modules (Zero-Shot, Few-Shot, Chain-of-Thought).
2. **AI Prompt Playground:**
   - Real-time simulated AI evaluation of user prompts.
   - Detailed feedback breakdown (Clarity, Specificity, Constraints).
   - "Optimized Prompt" generation viewer.
3. **Gamification (Reverse Engineering):**
   - Challenges requiring users to write prompts matching specific target JSON outputs.
   - Global leaderboards and XP rewards.
4. **Prompt Marketplace:**
   - Community hub to discover, share, and export enterprise-grade prompts.
5. **Admin Panel:**
   - Secure dashboard for managing users, publishing learning modules, and reviewing marketplace submissions.
   - Platform analytics visualization using Recharts.

## 🛠️ Setup Instructions

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🔐 Environment Variables

Create a `.env` file in the root of the `frontend` directory (if not already present) to configure backend API connections:

```env
VITE_API_URL=http://localhost:5000/api
```
