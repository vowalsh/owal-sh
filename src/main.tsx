import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// System theme detection
const applyTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('light', !prefersDark);
};

// Apply theme on load
applyTheme();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

createRoot(document.getElementById("root")!).render(<App />);
