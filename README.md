React + Vite frontend application with Tailwind CSS v4.

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — build tool & dev server
- **Tailwind CSS v4** — styling
- **Lucide React** — icons

## Project Structure

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



## Pages

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Home | No |
| `/service` | Service | No |
| `/solution` | Solution | No |
| `/company` | Company | No |
| `/contact` | Contact | No |
| `/demo` | Demo | No |
| `/login` | Login | No |
| `/dashboard` | Actors | Yes |
| `/console` | Console | Yes |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
