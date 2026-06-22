# LeadScout Frontend (Vite App) 💻

This directory contains the frontend web application for the **LeadScout** Web Scraping and Lead Generation Platform.

## 🛠️ Built With

- **React 19** — UI framework
- **Vite 8** — build tool & dev server
- **Tailwind CSS v4** — styling
- **Lucide React** — icons

---

## 🎨 UI Enhancements & Page Modules

*   **Global Design System:** Features a stunning "Deep Space" theme (`#04050e`) with vibrant neon accents (orange and brand purple), dynamic particle animations via `UniverseCanvas`, and premium frosted glassmorphism cards (`backdrop-blur`).
*   **Login & Signup:** Fully revamped with a single-frame animated glassy layout, featuring a custom floating line-art illustration, a glowing neon orange divider, and sleek bottom-border form inputs.
*   **Contact Us:** Upgraded with a highly compact, transparent UI, seamless header integration, and an incredible interactive 3D laptop `<model-viewer>` component.
*   **Home:** Interactive modern canvas background with product feature listings.
*   **Console:** Dashboard containing scraper configuration forms and tabular output with rich filter capabilities.
*   **Service & Solution pages:** Informational landing grids showcasing platform features.

---

## ⚡ Scripts Available

Inside this directory, you can run:

### `npm run dev`
Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`
Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`
Locally preview the production build to ensure everything works correctly before deploying.

### `npm run lint`
Run the linter to check for code issues.

---

## 🔌 API Integration

The app connects to a Spring Boot API at `http://localhost:8080` (or the URL specified by `VITE_API_BASE` in your `.env` file).

Make sure the backend is active to support login, registration, and live scraper operations.

---

## 📁 Project Structure

src/
├── assets/          # Images and static files
├── components/      # Shared UI components (Navbar, Footer, icons, ui)
├── context/         # AuthContext — authentication state
├── hooks/           # Custom hooks (useFetch)
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Service.jsx
│   ├── Solution.jsx
│   ├── Company.jsx
│   ├── Contact.jsx
│   ├── Demo.jsx
│   ├── Login.jsx
│   ├── Actors.jsx      # Dashboard (auth required)
│   ├── Console.jsx     # Full-screen console (auth required)
│   └── NotFound.jsx
├── routes/          # AppRoutes — custom client-side routing
├── services/        # api.js — API calls
├── App.jsx
└── main.jsx
