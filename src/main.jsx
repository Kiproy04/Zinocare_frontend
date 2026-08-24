import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import * as Sentry from "@sentry/react";
import './index.css'
import App from './App.jsx'


Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,

  integrations: [
    Sentry.browserTracingIntegration(),
  ],

  tracesSampleRate: 1.0,

  sendDefaultPii: false,
});

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

