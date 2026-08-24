import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import * as Sentry from "@sentry/react";
import './index.css'
import App from './App.jsx'


Sentry.init({
  // Use your environment variable or directly paste your Sentry DSN string here
  dsn: import.meta.env.VITE_SENTRY_DSN,

  integrations: [
    Sentry.browserTracingIntegration(),
  ],

  // Set to 1.0 while testing locally so 100% of events/traces are sent
  tracesSampleRate: 1.0,

  dataCollection: {
    // userInfo: false,
    // httpBodies: []
  }
});

// Ensure "app" matches the id in your index.html (Vite defaults to "root")
const container = document.getElementById("app") || document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

